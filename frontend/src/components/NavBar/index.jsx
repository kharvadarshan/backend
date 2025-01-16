import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const NavBar=()=>{
    return (
       <>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark text-white px-0">
         <div className="container-fluid d-flex flex-row justify-content-between">
                <div className='ms-auto'>
                <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon bg-light"></span>
                </button>
                </div>
                <div className="collapse navbar-collapse mx-lg-3 px-lg-3  " id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                        <a className="nav-link  nav-link:hover active text-light fs-4 py-2" aria-current="page" href="/home">Home</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link  nav-link:hover active text-light fs-4 py-2" aria-current="page" href="/all-doctors">All Doctors</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link nav-link:hover text-light  fs-4 py-2" href="/about">About</a>
                      </li>
                      </ul>
                      <form className="d-flex">
                              <a className="btn btn-outline-primary mx-2" type="submit" href='/login'>Login</a>
                              <a className="btn btn-outline-warning mx-2" type="submit" href='/signup'>Sign Up</a>
                      </form>
                </div>
         </div>
       </nav>
       </>
    )
}
export default NavBar;