import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import {store,persistor} from './redux/store.jsx'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import "leaflet/dist/leaflet.css";
import axios from 'axios';

const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
   <Provider store={store} >
   <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
    </BrowserRouter>
)
