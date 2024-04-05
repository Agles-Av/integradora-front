import React, { useContext, useState, useEffect } from 'react';
import { Navbar, Button, NavbarToggle } from 'flowbite-react';
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { Outlet, useNavigate } from 'react-router-dom';
import AuthContext from '../../config/context/auth-context';
import { GoHomeFill } from "react-icons/go";
import { confirmAlertLogOut } from '../../config/alert/alert';
import { getColorsFromServer } from '../../config/colors/colorService';
import ModalUpdate from '../../components/admin/ModalUpdate';
import AxiosCliente from '../../config/htpp-gateway/http-client';

function EstudianteLayout() {
  const [loading, setLoading] = useState(false);
  const [colors, setColors] = useState([]);
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState([]);
  const [openModalUp, setOpenModalUp] = useState(false);
  const [idDoc, setIdDoc] = useState(localStorage.getItem('idEstudiante'));

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

  const goUpdate = () => {
    console.log("usuario", users);
    setOpenModalUp(true);
    setUserData(users);
  }
  const getUser = async (id) => {
    try {
      setLoading(true);
      const response = await AxiosCliente({
        url: "/usuario/" + idDoc,
        method: "GET",
      });
      console.log("estudiante", response);
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
        <Navbar fluid={true} style={{ backgroundColor: colors[0] && colors[0].color2 }} >
          <Navbar.Brand >
            <FaUserCircle size={32} color="white" className="mr-2" />
            <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
              SIGEU - Estudiante
            </span>
          </Navbar.Brand>
            <Navbar.Toggle />
          <Navbar.Collapse >
            <Navbar.Link onClick={() => navigate('/homeEstudiante', { replace: true })} style={{ color: "white" }}>Inicio</Navbar.Link>
            <Navbar.Link onClick={() => goUpdate()} style={{ color: "white", cursor: 'pointer' }}>Perfil</Navbar.Link>
            <Navbar.Link color="failure" onClick={handleLogout} style={{ color: "white", cursor: 'pointer'}} className='flex items-center'> <FaSignOutAlt className='mr-2'/> Cerrar Sesión </Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      </header>
      {openModalUp && <ModalUpdate data={userData} openModalUp={openModalUp} setOpenModalUp={setOpenModalUp} getAllUsers={getUser} />}

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
