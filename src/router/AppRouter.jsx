/*auxilair que aydua administrar las paths que significan NO ES EL ROUTER
se llama variable de entorno :
es una varible general a la que se puede acceder a todo el protyecto
tiene la configuracion para usar las paths, crea las paths
*/
import React, { useContext, useState, useEffect } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import SignInPage from '../modules/auth/SignInPage';
import AuthContext from '../config/context/auth-context';
import AdminHome from '../modules/admin/AdminHome';
import AdminLayout from '../modules/admin/AdminLayout';
import UsersList from '../modules/admin/UsersList';
import SystemEdit from '../modules/admin/SystemEdit';
import EstudianteLayout from '../modules/estudiante/EstudianteLayout';
import DocenteLayout from '../modules/docente/Pantallas/DocenteLayout';
import EstudianteHome from '../modules/estudiante/EstudianteHome';
import EstudianteExamen from '../modules/estudiante/EstudianteExamen';
import EstudianteHistorialEx from '../modules/estudiante/EstudianteHistorialEx';


function AppRouter() {
  const [role, setRole] = useState(localStorage.getItem('role'));

  const [reload, setReload] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setRole(localStorage.getItem('role'));
    console.log(role);
  }, [reload]);

  const router = createBrowserRouter( // es el diagrama q me enseño const router crea el elemeto grande aun sin usarse 
    createRoutesFromElements( //hacer comparacion con aside
      <>

        {
          //pubico, no tiene paths 
        }
        {
          user.signed && role === "ADMIN_ROLE" ? ( //😱 😱? se llama banderas pq indican el como funciona un booleano cuando no se pone ningun signo 
            <Route path='/' element={<AdminLayout />}>
              <Route path='system' element={<SystemEdit />} />
              <Route path='/' element={<UsersList />} />
              <Route path='users' element={<UsersList />} />
            </Route>
          ) : user.signed && role === "DOCENTE_ROLE" ? (
            <Route path='/' element={<DocenteLayout />}>
              <Route path='homeDocente' element={<>DOCENTEHOME</>} />

            </Route>
          ) : user.signed && role === "ESTUDIANTE_ROLE" ? (
            <Route path='/' element={<EstudianteLayout />}>
              <Route path='homeEstudiante' element={<EstudianteHome/>} />
              <Route path='examen' element={<EstudianteExamen/>} />
              <Route path='historial' element={<EstudianteHistorialEx/>} />

            </Route>
          ) : <Route path='/' element={<SignInPage reload={setReload} />} />
        }

        <Route path='/*' element={<>Error 404</>} />
      </>
    )

  )
  return <RouterProvider router={router} /> //router es un prop 😭 que manda el router <cosnt></cosnt>

}

export default AppRouter