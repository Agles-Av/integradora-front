import React, { useContext, useState, useEffect } from 'react';
import { Navbar, Button, NavbarToggle } from 'flowbite-react';
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { Outlet, useNavigate } from 'react-router-dom';
import AuthContext from '../../config/context/auth-context'; 
import { GoHomeFill } from "react-icons/go";
import { confirmAlertLogOut } from '../../config/alert/alert';
import { getColorsFromServer } from '../../config/colors/colorService';

function EstudianteLayout() {
  
  const [colors, setColors] = useState([]);
  
  useEffect(() => {
    const fetchColors = async () => {
      const colorsData = await getColorsFromServer();
      if (colorsData) {
        setColors(colorsData);
      }
    };

    fetchColors();
  }, []);
  const { dispatch } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleLogout = () => {
    confirmAlertLogOut(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('idEstudiante');
      localStorage.removeItem('role');
      
      dispatch({ type: "SIGNOUT" });
      
      navigate('/');
    });
  };

  return (
    <>
      <header>
        <Navbar fluid={true} style={{ backgroundColor: colors[0] && colors[0].color2 }}>
          <Navbar.Brand >
            <FaUserCircle size={32} color="white" className="mr-2" />
            <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
              SIGEU - Estudiante
            </span>
          </Navbar.Brand>
          <Navbar.Toggle/>
          
            <Navbar.Collapse>
            <Navbar.Link onClick={() => navigate('/homeEstudiante',{replace:true})} style={{ color: "white" }}>Inicio</Navbar.Link>
            <Button 
              color="failure" 
              size="xs"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="mr-2" />
              Cerrar Sesión
            </Button>
            </Navbar.Collapse>
        </Navbar>
      </header>
      <div className="flex">
        <main className="w-full">
          <section className="px-4 pt-2 pb-6">
            <Outlet />
          </section>
        </main>
      </div>
    </>
  );
}

export default EstudianteLayout;
