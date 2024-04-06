import React, { useContext, useState, useEffect } from 'react';
import { Navbar, Button } from 'flowbite-react';
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { Outlet, useNavigate } from 'react-router-dom';
import AuthContext from '../../config/context/auth-context';
import { GoHomeFill } from "react-icons/go";
import { confirmAlertLogOut } from '../../config/alert/alert';
import { getColorsFromServer, getLogoFromServer } from '../../config/colors/colorService';

const AdminLayout = () => {
    const [colors, setColors] = useState([]);
    const [logo, setLogo] = useState([]);
  
    useEffect(() => {
      const fetchColors = async () => {
        const colorsData = await getColorsFromServer();
        const logoData = await getLogoFromServer();
        if (colorsData) {
            setColors(colorsData);
            localStorage.setItem('colors', JSON.stringify(colorsData));
          }
          if (logoData) {
            setLogo(logoData);
            localStorage.setItem('logo', JSON.stringify(logoData));
          }
      };
  
      fetchColors();
    }, []);
    console.log("colores guardados",colors);
    console.log("logo guardado",logo);

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
                <Navbar fluid style={{ backgroundColor: colors[0] && colors[0].color2 }}>
                    <Navbar.Brand>
                        <FaUserCircle size={24} color='white' className='mr-2' />
                        <span className="self-center whitespace-nowrap text-xl font-semibold text-white">SIGEU - Administrador</span>
                    </Navbar.Brand>
                    <Navbar.Toggle />

                    <Navbar.Collapse >
                        <Navbar.Link href="/users" style={{ color: "white" }}>Usuarios</Navbar.Link>
                        <Navbar.Link href="/system" style={{ color: "white" }}>Sistema</Navbar.Link>
                        <Navbar.Link color="failure" onClick={handleLogout} style={{ color: "white", cursor: 'pointer'}} className='flex items-center'> <FaSignOutAlt className='mr-2'/> Cerrar Sesión </Navbar.Link>

                    </Navbar.Collapse>
                </Navbar>
            </header>
            <div className='flex'>
                <main className='w-full'>
                    <section className='px-4 pt-2 pb-6'>
                        <Outlet />
                    </section>
                </main>
            </div>
        </>
    )
}

export default AdminLayout