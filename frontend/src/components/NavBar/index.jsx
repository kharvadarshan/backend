import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const NavBar=()=>{
    return (
       <>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark text-white ">
         <div className="container-fluid d-flex flex-row justify-content-evenly">
                 <div className='col-4'>
                 <h1>Logo</h1>
                 </div>
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
                      <li className="nav-item">
                        <a className="nav-link nav-link:hover text-light  fs-4 py-2" href="/admin">Admin</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link nav-link:hover text-light  fs-4 py-2" href="/contact">Contact</a>
                      </li>
                      </ul>
                      <form className="d-flex flex-row align-items-center">
                              <a className="btn btn-outline-primary mx-2" type="submit" href='/login'>Login</a>
                              <a className="btn btn-outline-warning mx-2" type="submit" href='/signup'>Sign Up</a>
                              
                      </form>
                      <div className="dropdown open">
                                     <a
                                       className="text-decoration-none text-white dropdown-toggle p-3"
                                       type="button"
                                       id="triggerId"
                                       data-bs-toggle="dropdown"
                                       aria-expanded="false"
                                     >
                                      <i className="bi bi-person-circle"></i>{" "}
                                      <span className="ms-3 d-none d-lg-inline d-sm-none">Darshan</span>
                                    </a>
                                   <div className="dropdown-menu" aria-labelledby="triggerId">
                                      <a className="dropdown-item" href="#">
                                        <span className="d-sm-inline">1</span>
                                        <span className="d-none d-lg-inline d-sm-inline px-2">
                                         Profile
                                        </span>
                                      </a>
                                      <a className="dropdown-item" href="#">
                                        <span className="d-sm-inline">2</span>
                                        <span className="d-none d-sm-inline d-lg-inline px-2">
                                          My Appointment
                                        </span>
                                      </a>
                                      <a className="dropdown-item" href="#">
                                        <span className="d-sm-inline">2</span>
                                        <span className="d-none d-sm-inline d-lg-inline px-2">
                                          Setting
                                        </span>
                                      </a>
                                    </div>
                                  </div>
                </div>
         </div>
       </nav>
       </>
    )
}
export default NavBar;