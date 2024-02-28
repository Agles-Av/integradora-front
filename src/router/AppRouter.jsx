/*auxilair que aydua administrar las paths que significan NO ES EL ROUTER
se llama variable de entorno :
es una varible general a la que se puede acceder a todo el protyecto
tiene la configuracion para usar las paths, crea las paths
*/
import React, { useContext } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import SignInPage from '../modules/auth/SignInPage';
import AuthContext from '../config/context/auth-context';

function AppRouter() {
  
  const { user } = useContext(AuthContext);
  const router = createBrowserRouter( // es el diagrama q me enseño const router crea el elemeto grande aun sin usarse 
    createRoutesFromElements( //hacer comparacion con aside
      <>

        {
          //pubico, no tiene paths 
        }
        {
          user.signed ? ( //😱 😱? se llama banderas pq indican el como funciona un booleano cuando no se pone ningun signo 
            <>
              <Route path='/' element={<>Admin layout</>}>
                <Route path='admin' element={<> ADMIN HOME</>} />
                <Route path='docente' element={<> DOCENTE</>} />
                <Route path='user' element={<>USUARIOS</>} />
              </Route>
            </>
          ) : <Route path='/' element={<SignInPage/>} />
        }
        <Route path='/*' element={<>Error 404</>} />
      </>
    )

  )
  return <RouterProvider router={router} /> //router es un prop 😭 que manda el router <cosnt></cosnt>
  
}

export default AppRouter