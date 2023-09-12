import React, { useEffect, useState } from 'react';
import '../styles/navbar.css';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { InputGroup, Nav, Dropdown, NavDropdown, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import authService from '../services/AuthService';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';

const MyNavbar = () => {

  const { authState, dispatch } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [icon, setIcon] = useState("fa-solid fa-home");
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [currentMenu, setCurrentMenu] = useState('home');

  const handleLogout = () => {
    authService
      .logout()
      .then(() => {
        toast.success('Logout successful!', {
          autoClose: 1000,
        });
        dispatch({ type: 'LOGOUT_USER' });
        setTimeout(() => {
          if (location.pathname === '/') {
            window.location.reload();
          } else {
            navigate('/');
          }
        }, 1000);

      })
      .catch(error => {
        console.log('Error:', error.response);
      });
  };

  useEffect(() => {
    const pathname = location.pathname;

    if (pathname === '/') {
      setIcon("fa-solid fa-home");
      setCurrentMenu('Home');
    } else if (pathname.includes('/submit')) {
      setIcon("fa-solid fa-pen");
      setCurrentMenu('Create Post');
    } else if (pathname.match(/^\/r\/[^/]+\/comments\/[^/]+/)) {
      setIcon("fa-solid fa-signs-post");
      setCurrentMenu(params.subredditName);
    } else if (pathname.match(/^\/r\/[^/]+/)) {
      setIcon("fa-solid fa-people-roof");
      setCurrentMenu(params.subredditName);
    } else if (pathname.match(/^\/u\/[^/]+/)) {
      setIcon("fa-solid fa-address-card");
      setCurrentMenu(params.username);
    } else if (pathname.includes('/search')) { // Eğer "search" kelimesi URL içinde geçiyorsa
      setIcon("fa-solid fa-search"); // İstenilen ikonu ayarlayabilirsiniz
      setCurrentMenu('Search'); // Menüyü "Search" olarak ayarlayabilirsiniz
    } 
    else {
      setCurrentMenu('default');
    }
  }, [location.pathname, params, icon]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };


  return (

    <div className="navbar-top" >

      <ToastContainer />
      <Navbar className="bg-body-tertiary ">
        <Navbar.Brand href="/" className="d-flex align-items-center logo">
          <img
            alt=""
            src="https://cdn.worldvectorlogo.com/logos/reddit-logo-new.svg"
            width="90"
            height="90"
            className="d-inline-block align-top logo"
            style={{ marginRight: "20px" }}
          />
        </Navbar.Brand>
        <div className="d-flex justify-content-end align-items-center">
          <NavDropdown title={<span className='fw-bold' style={{ fontSize: "14px" }}><FontAwesomeIcon icon={icon} size='lg' />&nbsp;&nbsp;&nbsp;&nbsp;{currentMenu} </span>} id="basic-nav-dropdown" >
            <NavDropdown.Item as={Link} to="/submit" className="post-link">
              <FontAwesomeIcon icon="fa-solid fa-pen" size="m" /> Create Post
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to={`/u/${localStorage.getItem("username")}`} className="post-link">
              <FontAwesomeIcon icon="fa-solid fa-user" size="m" /> Profile
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item >
              <FontAwesomeIcon icon="fa-solid fa-signs-post" size="m" /> Sahibi olunan subredditleler eklenecek
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item >
              <FontAwesomeIcon icon="fa-solid fa-signs-post" size="m" /> Katılınan subredditleler eklenecek
            </NavDropdown.Item>
          </NavDropdown>

          <form onSubmit={handleSearch}>
            <div className="d-flex justify-content-center search-bar">
              <InputGroup>
                <input
                  className="search-input"
                  placeholder="&nbsp;&nbsp;&nbsp;Search Reddit"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                ></input>
              </InputGroup>
            </div>
          </form>


          {/* {localStorage.getItem("token") !== null ? ( */}
          {authState.isAuthenticated ? (
            <Nav className="right-section ">
              <Link to="/login" className="post-link">
                <FontAwesomeIcon title="Messages" icon="fa-solid fa-comment-dots" size="lg" />
              </Link>
              <Link to="/login" className="p-3 post-link">
                <FontAwesomeIcon title="Notifications" icon="fa-solid fa-bell" size="lg" />
              </Link>
              <Link to="/submit" className="post-link" style={{ marginRight: "5px" }}>
                <FontAwesomeIcon title="Create Post" icon="fa-solid fa-plus" size="lg" />
              </Link>
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text style={{ marginLeft: "50px" }}>
                  Signed in as: <Link to={`/u/${localStorage.getItem("username")}`}> {localStorage.getItem("username")} </Link>
                </Navbar.Text>
              </Navbar.Collapse>
              <Dropdown className="user-settings-dropdown">
                <Dropdown.Toggle variant="transparent" id="dropdown-basic">
                  <FontAwesomeIcon title="User Settings" icon="fa-solid fa-gear" size="xl" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to={`/u/${localStorage.getItem("username")}`}>
                    <FontAwesomeIcon icon="fa-solid fa-user" /> Profile
                  </Dropdown.Item>
                  <Dropdown.Item as={Button} onClick={handleLogout}>
                    <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" /> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          ) : (
            <Nav className="right-section">
              <Link as={Link} to="/login" className="login-btn" style={{ backgroundColor: '#D93A00', color: 'white', borderRadius: '50px', padding: '6px', marginLeft: '400px' }}>
                <span style={{ padding: '8px', fontWeight: '500', fontSize: '14px' }}>Log In  </span>
              </Link>
            </Nav>
          )}
        </div>
      </Navbar>
    </div>
  );
};

export default MyNavbar;
