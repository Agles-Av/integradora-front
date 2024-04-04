/*auxilair que aydua administrar las paths que significan NO ES EL ROUTER
se llama variable de entorno :
es una varible general a la que se puede acceder a todo el protyecto
tiene la configuracion para usar las paths, crea las paths
*/
import React, { useContext, useState, useEffect } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import SignInPage from '../modules/auth/SignInPage';
import AuthContext from '../config/context/auth-context';
import AdminLayout from '../modules/admin/AdminLayout';
import UsersList from '../modules/admin/UsersList';
import SystemEdit from '../modules/admin/SystemEdit';
import EstudianteLayout from '../modules/estudiante/EstudianteLayout';
import DocenteLayout from '../modules/docente/DocenteLayout';
import EstudianteHome from '../modules/estudiante/EstudianteHome';
import EstudianteExamen from '../modules/estudiante/EstudianteExamen';
import EstudianteHistorialEx from '../modules/estudiante/EstudianteHistorialEx';
import ClasesList from '../modules/docente/Pantallas/ClasesList';
import ExamenesList from '../modules/docente/Pantallas/ExamenesList';
import CreacionExamen from '../components/docente/CreacionExamen';
import EditarExamen from '../components/docente/EditarExamen';
import CalificacionesList from '../modules/docente/Pantallas/CalificacionesList';
import AxiosCliente from '../config/htpp-gateway/http-client';


function AppRouter() {
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [loading, setLoading] = useState(false);
  const [colorsAA, setColorsAA] = useState([{ color1: '', color2: '', color3: '' }]);
  const [reload, setReload] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setRole(localStorage.getItem('role'));
    console.log(role);
    getColors();
  }, [reload]);
  const getColors = async () => {
    try {
      setLoading(true);
      const response = await AxiosCliente({
        url: "/sistema/",
        method: "GET",
      });
      if (response.status === 'OK') {
        console.log(response);
        setColorsAA(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  console.log("colorAA", colorsAA);

  const paths = (role) => {
    switch (role) {
      case "ADMIN_ROLE":
        return (<Route path='/' element={<AdminLayout />}>
          <Route path='system' element={<SystemEdit />} />
          <Route path='/' element={<UsersList />} />
          <Route path='users' element={<UsersList />} />
          <Route path='homeAdmin' element={<UsersList />} />
        </Route>);
      case "DOCENTE_ROLE":
        return (<Route path='/' element={<DocenteLayout />}>
          <Route path='/' element={<ClasesList />} />
          <Route path='homeDocente' element={<ClasesList />} />
          <Route path='examenes' element={<ExamenesList />} />
          <Route path='crearExamen' element={<CreacionExamen />} />
          <Route path='editarExamen' element={<EditarExamen />} />
          <Route path='calificaciones' element={<CalificacionesList />} />
        </Route>);
      case "ESTUDIANTE_ROLE":
        return (<Route path='/' element={<EstudianteLayout />}>
          <Route path='/' element={<EstudianteHome />} />
          <Route path='homeEstudiante' element={<EstudianteHome />} />
          <Route path='examen' element={<EstudianteExamen />} />
          <Route path='historial' element={<EstudianteHistorialEx />} />
        </Route>);
      default:
        return (<Route path='/' element={<SignInPage reload={setReload} />} />)
    }
  }

  const router = createBrowserRouter( // es el diagrama q me enseño const router crea el elemeto grande aun sin usarse 
    createRoutesFromElements( //hacer comparacion con aside
       <>

        {
          user.signed ? paths(user.user.role.name) : <Route path='/' element={<SignInPage reload={setReload} />} />
        }

        <Route path='/*' element={<>ErrorR 404</>} />
      </>
    )

  )
  return <RouterProvider router={router} /> //router es un prop 😭 que manda el router <cosnt></cosnt>

}

export default AppRouter