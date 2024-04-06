import React, { useContext, useState, useEffect } from 'react';
import { Navbar, Button } from 'flowbite-react';
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { Outlet, useNavigate } from 'react-router-dom';
import AuthContext from '../../config/context/auth-context';
import { GoHomeFill } from "react-icons/go";
import AxiosCliente from '../../config/htpp-gateway/http-client';
import { confirmAlertLogOut } from '../../config/alert/alert';
import ModalUpdate from '../../components/admin/ModalUpdate'
import { getColorsFromServer, getLogoFromServer } from '../../config/colors/colorService';

const DocenteLayout = () => {
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

    const [loading, setLoading] = useState(false);
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const [openModalUp, setOpenModalUp] = useState(false);
    const [users, setUsers] = useState([]);
    const [idDoc, setIdDoc] = useState(localStorage.getItem('idDocente'));
    const [userData, setUserData] = useState([]);
    

    const handleLogout = () => {
        confirmAlertLogOut(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('idEstudiante');
            localStorage.removeItem('role');

            dispatch({ type: "SIGNOUT" });

            navigate('/');
        });
    };
    const goUpdate = () => {
        console.log(users);
        setOpenModalUp(true);
        setUserData(users);
    }

    const getUser = async (id) =>{
        try{
        setLoading(true);
            const response = await AxiosCliente({
                url: "/usuario/"+idDoc,
                method: "GET",
            });
            console.log("profe",response);
            if (!response.error) {
                setUsers(response.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            <header>
                <Navbar fluid style={{ backgroundColor: colors[0] && colors[0].color2 }}>
                    <Navbar.Brand>
                        <FaUserCircle size={24} color='white' className='mr-2' />
                        <span className="self-center whitespace-nowrap text-xl font-semibold text-white">SIGEU - Docente</span>
                    </Navbar.Brand>
                    <Navbar.Toggle />

                    <Navbar.Collapse >
                        <Navbar.Link href="homeDocente" style={{ color: "white" }}>Clases</Navbar.Link>
                        <Navbar.Link onClick={() => goUpdate()} style={{ color: "white", cursor:'pointer'}}>Perfil</Navbar.Link>
                        <Navbar.Link color="failure" onClick={handleLogout} style={{ color: "white", cursor: 'pointer'}} className='flex items-center'> <FaSignOutAlt className='mr-2'/> Cerrar Sesión </Navbar.Link>

                    </Navbar.Collapse>
                </Navbar>
            </header>
            {openModalUp && <ModalUpdate data={userData} openModalUp={openModalUp} setOpenModalUp={setOpenModalUp} getAllUsers={getUser}/>}

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

export default DocenteLayout