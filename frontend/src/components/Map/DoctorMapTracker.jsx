import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import { io } from "socket.io-client";
import axiosClient from "../../utils/axiosClient";
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
  const [isLoading, setIsLoading] = useState(null);

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

  // Socket.IO connection
  useEffect(() => {
    if (!doctorLocation) return;

    const socketConnection = io("http://localhost:5001", {
      transports: ["websocket", "polling"],
      withCredentials: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    setSocket(socketConnection);

    socketConnection.on("connect", () => {
      console.log("Connected to Socket.IO server:", socketConnection.id);
    });

    socketConnection.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
      setError(`Failed to connect to live tracking server: ${err.message}`);
    });

    socketConnection.on("disconnect", (reason) => {
      console.log("Disconnected from Socket.IO server:", reason);
    });

    socketConnection.on("updateLocation", (location) => {
      console.log("Received location update:", location);
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

  // Fetch doctor's coordinates
  useEffect(() => {
    const fetchDoctorCoordinates = async () => {
      try {
        setIsLoading(true);
        const response = await axiosClient.get("http://localhost:5001/geocode", {
          params: {
            q: doctorData.address,
            format: "json",
            limit: 1,
            addressdetails: 1,
          },
        });
        console.log(response);

        if (response.data && response.data.length > 0) {
          const { lat, lon, display_name } = response.data[0];
          console.log(lat, lon);
          setDoctorLocation({
            lat: parseFloat(lat),
            lng: parseFloat(lon),
            name: doctorData.name,
            address: display_name,
          });
        } else {
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctorCoordinates();
  }, []);

  // Update map with patient location and route
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
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
          {doctorLocation && (
            <MapContainer
              center={
                doctorLocation
                  ? [doctorLocation?.lat, doctorLocation?.lng]
                  : [19.0760, 72.8777]
              }
              zoom={doctorLocation ? 13 : 8}
              style={{ height: "100%", width: "100%" }}
              whenCreated={setMapInstance} // Ensure map instance is set
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
    </div>
  );
};

export default DoctorMapTracker;

