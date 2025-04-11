import { ToastContainer } from 'react-toastify';
import  AllRoute from '../src/routes';
import { ToastProvider } from './components/Notification/ToastProvider';

function App() {
    return(
        <>
         <ToastProvider>
         <AllRoute/>
         <ToastContainer/>
         </ToastProvider>
        </>       
    )
}

export default App;
