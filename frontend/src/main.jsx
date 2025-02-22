// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
<<<<<<< HEAD
=======
import {  } from 'react-router-dom'
>>>>>>> 12a40bb40651788042d3d115ef10c2f87fa0c8b8
import './index.css'
import App from './App.jsx'
import store from './redux/store.jsx'
import {Provider} from 'react-redux'
createRoot(document.getElementById('root')).render(
<<<<<<< HEAD
  // <StrictMode>
   <Provider store={store}>
    <App />
    </Provider>      
  // </StrictMode>,
=======
  
  
   <Provider store={store}>
    <App />
    </Provider>
  
    
>>>>>>> 12a40bb40651788042d3d115ef10c2f87fa0c8b8
)
