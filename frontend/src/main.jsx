import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import {store,persistor} from './redux/store.jsx'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import "leaflet/dist/leaflet.css";
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
   <Provider store={store} >
   <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
    </BrowserRouter>
)
