
import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup,Polyline } from "react-leaflet";
import L from "leaflet";
import { io } from "socket.io-client";
import axios from "axios";
import "leaflet/dist/leaflet.css";
delete L.Icon.Default.prototype._getIconUrl;



L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// const doctorLocation = {
//   lat: 22.3039,
//   lng: 70.8022,
//   name: "Dr. Smith's Clinic",
// };

const doctorData = {
  _id: { $oid: "67a8ddf7f417c09f242f0e42" },
  name: "Dr. Ayesha Khan",
  specialty: "Cardiologist",
  address: "Amadavad",
};

const DoctorMapTracker = () => {
  const [doctorLocation, setDoctorLocation] = useState(null);
  const [patientLocation, setPatientLocation] = useState(null);
  const [patientRoute, setPatientRoute] = useState([]);
  const [socket, setSocket] = useState(null);
const [mapInstance, setMapInstance] = useState(null);
  const [pathLine, setPathLine] = useState(null);
  const [connectionLine, setConnectionLine] = useState(null);
  const [accuracyCircle, setAccuracyCircle] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState(null);
  const watchIdRef = useRef(null);
  const [isLoading,setIsLoading]=useState(null);
  const doctorIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const patientIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  useEffect(() => {
   
    const fetchDoctorCoordinates = async () => {
      try {
        setIsLoading(true);
        const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
        const response = await axios.get(
          "https://api.opencagedata.com/geocode/v1/json",
          {
            params: {
              q: doctorData.address,
              key: apiKey,
              limit: 1,
              no_annotations: 1,
            },
          }
        );

        if (response.data.results && response.data.results.length > 0) {
          const { lat, lng } = response.data.results[0].geometry;
          const { formatted } = response.data.results[0];
          console.log(lat,lng);
          setDoctorLocation({
            lat: lat,
            lng: lng,
            name: doctorData.name,
            address: formatted,
          });
        }
        else {
          setDoctorLocation({
            lat: 19.0760,
            lng: 72.8777,
            name: doctorData.name,
            address: "Mumbai, India (default)",
          });
          setError("No results found for doctor's address. Using default location.");
         
        }
      } catch (err) {
        console.error("Geocoding error:", err);
        setError("Failed to fetch doctor's location.");
        setDoctorLocation({
          lat: 19.0760,
          lng: 72.8777,
          name: doctorData.name,
          address: "Mumbai, India (default)",
        });
      }finally {
        setIsLoading(false);
      }
    };

    fetchDoctorCoordinates();
  }, []);
  
  useEffect(() => {
    if (!mapInstance || !doctorLocation) return;

    if (patientLocation) {
      if (!connectionLine) {
        const line = L.polyline(
          [
            [doctorLocation.lat, doctorLocation.lng],
            [patientLocation.lat, patientLocation.lng],
          ],
          { color: "purple", dashArray: "5, 5", weight: 3 }
        ).addTo(mapInstance);
        setConnectionLine(line);
      } else {
        connectionLine.setLatLngs([
          [doctorLocation.lat, doctorLocation.lng],
          [patientLocation.lat, patientLocation.lng],
        ]);
      }
    }

    if (patientRoute.length > 0) {
      const routeLatLngs = patientRoute.map((loc) => [loc.lat, loc.lng]);
      if (!pathLine) {
        const newPathLine = L.polyline(routeLatLngs, {
          color: "blue",
          weight: 4,
          opacity: 1.0,
          smoothFactor: 1,
        }).addTo(mapInstance);
        setPathLine(newPathLine);
      } else {
        pathLine.setLatLngs(routeLatLngs);
      }
    }

    if (patientLocation) {
      mapInstance.setView([patientLocation.lat, patientLocation.lng], 15);
    }
  }, [patientLocation, patientRoute, doctorLocation, mapInstance]);



  useEffect(() => {
    if (!doctorLocation) return;
    const socketConnection = io("http://localhost:5000", {
      transports: ["websocket"],
      withCredentials: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    setSocket(socketConnection);
    socketConnection.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
      setError("Failed to connect to live tracking server");
    });
    socketConnection.on("updateLocation", (location) => {
      setPatientLocation(location);
      setPatientRoute((prev) => [...prev, location]);
    });

    return () => {
      socketConnection.disconnect();
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [doctorLocation]);


  

  const handleStartTracking = () => {
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setIsTracking(true);

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const newLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        };
        
        if (accuracyCircle) {
          accuracyCircle.setLatLng([newLocation.lat, newLocation.lng]);
          accuracyCircle.setRadius(newLocation.accuracy);
        } else if (mapInstance) {
          const circle = L.circle([newLocation.lat, newLocation.lng], {
            radius: newLocation.accuracy,
            color: "red",
            fillColor: "#f03",
            fillOpacity: 0.2,
          }).addTo(mapInstance);
          setAccuracyCircle(circle);
        }

        if (socket) {
          socket.emit("sendLocation", newLocation);
        }

        setPatientLocation(newLocation);
        setPatientRoute((prev) => [...prev, newLocation]);
      },
      (err) => {
        setError(`Failed to access location: ${err.message}`);
        setIsTracking(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  const handleStopTracking = () => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsTracking(false);
    setError(null);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };
  if (isLoading) {
    return <div className="p-6 text-center">Loading doctors location...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
          Live Doctor Tracker
        </h2>
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}
          <div className="flex justify-between mb-4">
          <div>
            {doctorLocation && (
              <>
                <p>
                  <strong>Doctor:</strong> {doctorLocation?.name}
                </p>
                <p>
                  <strong>Address:</strong> {doctorLocation?.address}
                </p>
              </>
            )}
            {patientLocation && doctorLocation && (
              <>
                <p>
                  <strong>Your Location:</strong>{" "}
                  {patientLocation?.lat.toFixed(5)},{" "}
                  {patientLocation?.lng.toFixed(5)}
                </p>
                <p>
                  <strong>Distance to Doctor:</strong>{" "}
                  {calculateDistance(
                    patientLocation?.lat,
                    patientLocation?.lng,
                    doctorLocation?.lat,
                    doctorLocation?.lng
                  ).toFixed(2)}{" "}
                  km
                </p>
              </>
            )}
          </div>
        </div>

         
        </div>

        <div className="flex gap-2 relative mb-4">
            {!isTracking ? (
              <button
                onClick={handleStartTracking}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                disabled={!doctorLocation}
              >
                Start Tracking
              </button>
            ) : (
              <button
                onClick={handleStopTracking}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Stop Tracking
              </button>
            )}
          </div>

        <div className="h-[500px] border rounded-lg overflow-hidden">
        { doctorLocation && (
        <MapContainer
            center={doctorLocation ? [doctorLocation?.lat, doctorLocation?.lng] : [19.0760, 72.8777]} // Fallback to Mumbai
            zoom={doctorLocation ? 13 : 8}
            style={{ height: "100%", width: "100%" }}
            // whenCreated={setMapInstance}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />

            <Marker
              position={[doctorLocation?.lat, doctorLocation?.lng]}
              icon={doctorIcon}
            >
              <Popup>{doctorLocation?.name}</Popup>
            </Marker>

            {patientLocation && (
              <Marker
                position={[patientLocation?.lat, patientLocation?.lng]}
                icon={patientIcon}
              >
                <Popup>Your Location</Popup>
              </Marker>
            )}
            {patientLocation && doctorLocation && (
              <Polyline
                positions={[
                  [doctorLocation?.lat, doctorLocation?.lng],
                  [patientLocation?.lat, patientLocation?.lng],
                ]}
                color="purple"
                dashArray="5, 5"
                weight={3}
              />
            )}
            {patientRoute?.length > 0 && (
              <Polyline
                positions={patientRoute?.map((loc) => [loc?.lat, loc?.lng])}
                color="blue"
                weight={4}
                opacity={1.0}
                smoothFactor={1}
              />
            )}
          </MapContainer>
        )}
        </div>
      </div>
    
  );
};

export default DoctorMapTracker;









// import { useEffect, useState, useRef } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import { io } from "socket.io-client";
// import "leaflet/dist/leaflet.css";

// // Fix for default marker icons in Leaflet
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// const doctorLocation = {
//   lat: 22.3039, // Example: Ahmedabad
//   lng: 70.8022,
//   name: "Dr. Smith's Clinic",
// };

// const DoctorMapTracker = () => {
//   const [patientLocation, setPatientLocation] = useState(null);
//   const [patientRoute, setPatientRoute] = useState([]);
//   const [socket, setSocket] = useState(null);
//   const [mapInstance, setMapInstance] = useState(null);
//   const [pathLine, setPathLine] = useState(null);
//   const [connectionLine, setConnectionLine] = useState(null);
//   const [accuracyCircle, setAccuracyCircle] = useState(null);
//   const [isTracking, setIsTracking] = useState(false);
//   const [error, setError] = useState(null);
//   const watchIdRef = useRef(null);

//   // Custom icons
//   const doctorIcon = new L.Icon({
//     iconUrl:
//       "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
//     shadowUrl:
//       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41],
//   });

//   const patientIcon = new L.Icon({
//     iconUrl:
//       "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
//     shadowUrl:
//       "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41],
//   });

//   useEffect(() => {
//     const socketConnection = io("http://localhost:5173", {
//       reconnectionAttempts: 5,
//       reconnectionDelay: 1000,
//     });

//     setSocket(socketConnection);

//     socketConnection.on("updateLocation", (location) => {
//       setPatientLocation(location);
//       setPatientRoute((prevRoute) => [...prevRoute, location]);
//     });

//     // socketConnection.on('connect_error', () => {
//     //   setError('Connection to server failed. Trying to reconnect...');
//     // });

//     return () => {
//       socketConnection.disconnect();
//       if (watchIdRef.current) {
//         navigator.geolocation.clearWatch(watchIdRef.current);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (!mapInstance) return;

//     // Update connection line between doctor and patient
//     if (patientLocation) {
//       if (!connectionLine) {
//         const line = L.polyline(
//           [
//             [doctorLocation.lat, doctorLocation.lng],
//             [patientLocation.lat, patientLocation.lng],
//           ],
//           { color: "purple", dashArray: "5, 5", weight: 3 }
//         ).addTo(mapInstance);
//         setConnectionLine(line);
//       } else {
//         connectionLine.setLatLngs([
//           [doctorLocation.lat, doctorLocation.lng],
//           [patientLocation.lat, patientLocation.lng],
//         ]);
//       }
//     }

//     // Update patient route path
//     if (patientRoute.length > 0) {
//       const routeLatLngs = patientRoute.map((loc) => [loc.lat, loc.lng]);
        
//       if (!pathLine) {
//         const newPathLine = L.polyline(routeLatLngs, {
//           color: "blue",
//           weight: 4,
//           opacity: 0.7,
//           smoothFactor: 1,
//         }).addTo(mapInstance);
//         setPathLine(newPathLine);
//       } else {
//         pathLine.setLatLngs(routeLatLngs);
//       }
//     }

//     // Center map on patient location when available
//     if (patientLocation) {
//       mapInstance.setView([patientLocation.lat, patientLocation.lng], 15);
//     }
//   }, [patientLocation, patientRoute, mapInstance]);

//   const handleStartTracking = () => {
//     setError(null);

//     if (!navigator.geolocation) {
//       setError("Geolocation is not supported by your browser.");
//       return;
//     }

//     setIsTracking(true);

//     watchIdRef.current = navigator.geolocation.watchPosition(
//       (pos) => {
//         const newLocation = {
//           lat: pos.coords.latitude,
//           lng: pos.coords.longitude,
//           accuracy: pos.coords.accuracy,
//         };

//         // Update accuracy circle
//         if (accuracyCircle) {
//           accuracyCircle.setLatLng([newLocation.lat, newLocation.lng]);
//           accuracyCircle.setRadius(newLocation.accuracy);
//         } else if (mapInstance) {
//           const circle = L.circle([newLocation.lat, newLocation.lng], {
//             radius: newLocation.accuracy,
//             color: "red",
//             fillColor: "#f03",
//             fillOpacity: 0.2,
//           }).addTo(mapInstance);
//           setAccuracyCircle(circle);
//         }

//         // Emit the new location to the server
//         if (socket) {
//           socket.emit("sendLocation", newLocation);
//         }

//         // Update patient location and path
//         setPatientLocation(newLocation);
//         // In handleStartTracking:
//         setPatientRoute((prevRoute) => [
//           ...prevRoute,
//           [newLocation.lat, newLocation.lng],
//         ]);
//       },
//       (err) => {
//         console.error("Error getting location:", err);
//         setError(`Failed to access location: ${err.message}`);
//         setIsTracking(false);
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 5000,
//         maximumAge: 0,
//         distanceFilter: 5, // Only update if moved at least 5 meters
//       }
//     );
//   };

//   const handleStopTracking = () => {
//     if (watchIdRef.current) {
//       navigator.geolocation.clearWatch(watchIdRef.current);
//       watchIdRef.current = null;
//     }
//     setIsTracking(false);
//     setError(null);
//   };

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371; // Radius of the earth in km
//     const dLat = ((lat2 - lat1) * Math.PI) / 180;
//     const dLon = ((lon2 - lon1) * Math.PI) / 180;
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos((lat1 * Math.PI) / 180) *
//         Math.cos((lat2 * Math.PI) / 180) *
//         Math.sin(dLon / 2) *
//         Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c; // Distance in km
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
//       <div className="w-full max-w-4xl bg-white rounded-xl shadow-md overflow-hidden p-6">
//         <h2 className="text-3xl font-bold mb-4 text-blue-800 text-center">
//           Live Doctor Tracker
//         </h2>

//         {error && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
//             {error}
//           </div>
//         )}

//         <div className="flex flex-col md:flex-row gap-6 mb-6">
//           <div className="flex-1">
//             <h3 className="text-xl font-semibold mb-2">Information</h3>
//             <div className="space-y-2">
//               <p>
//                 <span className="font-medium">Doctor:</span>{" "}
//                 {doctorLocation.name}
//               </p>
//               {patientLocation && (
//                 <>
//                   <p>
//                     <span className="font-medium">Your Location:</span>
//                     {` ${patientLocation.lat.toFixed(
//                       5
//                     )}, ${patientLocation.lng.toFixed(5)}`}
//                   </p>
//                   <p>
//                     <span className="font-medium">Accuracy:</span>
//                     {` ${
//                       patientLocation.accuracy
//                         ? Math.round(patientLocation.accuracy)
//                         : "Unknown"
//                     } meters`}
//                   </p>
//                   <p>
//                     <span className="font-medium">Distance to Doctor:</span>
//                     {` ${calculateDistance(
//                       patientLocation.lat,
//                       patientLocation.lng,
//                       doctorLocation.lat,
//                       doctorLocation.lng
//                     ).toFixed(2)} km`}
//                   </p>
//                 </>
//               )}
//             </div>

//             <div className="mt-4 flex gap-3">
//               {!isTracking ? (
//                 <button
//                   onClick={handleStartTracking}
//                   className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition flex items-center gap-2"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                   Start Live Tracking
//                 </button>
//               ) : (
//                 <button
//                   onClick={handleStopTracking}
//                   className="px-5 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition flex items-center gap-2"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                   Stop Tracking
//                 </button>
//               )}
//             </div>
//           </div>

//           <div className="flex-1">
//             <h3 className="text-xl font-semibold mb-2">Instructions</h3>
//             <ul className="list-disc pl-5 space-y-1 text-gray-700">
//               <li>Click Start Live Tracking to share your location</li>
//               <li>The red circle shows your location accuracy</li>
//               <li>The blue line shows your movement path</li>
//               <li>The dotted purple line connects you to the doctor</li>
//               <li>For best accuracy, enable GPS and use outdoors</li>
//             </ul>
//           </div>
//         </div>

//         <div className="h-[500px] w-full rounded-lg overflow-hidden border border-gray-200">
//           <MapContainer
//             center={patientLocation || [doctorLocation.lat, doctorLocation.lng]}
//             zoom={8}
//             style={{ height: "100%", width: "100%" }}
//             whenCreated={setMapInstance}
//           >
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution="BookMyDoctor"
//             />

//             {/* Doctor's Location Marker */}
//             <Marker
//               position={[doctorLocation.lat, doctorLocation.lng]}
//               icon={doctorIcon}
//             >
//               <Popup>
//                 <div className="font-semibold">{doctorLocation.name}</div>
//                 <div>Lat: {doctorLocation.lat.toFixed(5)}</div>
//                 <div>Lng: {doctorLocation.lng.toFixed(5)}</div>
//               </Popup>
//             </Marker>

//             {/* Patient's Location Marker */}
//             {patientLocation && (
//               <Marker
//                 position={[patientLocation.lat, patientLocation.lng]}
//                 icon={patientIcon}
//               >
//                 <Popup>
//                   <div className="font-semibold">Your Location</div>
//                   <div>Lat: {patientLocation.lat.toFixed(5)}</div>
//                   <div>Lng: {patientLocation.lng.toFixed(5)}</div>
//                   {patientLocation.accuracy && (
//                     <div>
//                       Accuracy: ~{Math.round(patientLocation.accuracy)} meters
//                     </div>
//                   )}
//                 </Popup>
//               </Marker>
//             )}
//           </MapContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorMapTracker;

// src/components/DoctorMapTracker.jsx

