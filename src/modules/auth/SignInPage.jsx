import React, { useContext } from 'react';
import { Button, Label, TextInput,Spinner } from 'flowbite-react';
import { replace, useFormik } from 'formik';
import * as yup from 'yup';
import { customAlert } from '../../config/alert/alert';
import { AxiosCliente } from '../../config/htpp-gateway/http-client';
import AuthContext from '../../config/context/auth-context';
import { useNavigate } from 'react-router-dom';



function SignInPage() {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: yup.object().shape({
      username: yup.string().required("Campo obligatorio"),
      password: yup.string().required("Campo obligatorio"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      console.log(values);
      try {
        const response = await AxiosCliente({
          url: '/auth/signin',
          method: 'POST',
          data: values,
        })
        if (!response?.error) {
          dispatch({ type: "SIGNIN", payload: response.data });
          navigate("/admin", { replace: true });
        } else throw Error('Error');
      } catch (error) {
        console.log(error);
        customAlert("iniciar sesión", "Usuario y/o contraseña incorrectos", "error")
      } finally {
        setSubmitting(false);
      }
    }
  });
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col md:flex-row w-full max-w-6xl md:rounded-l-lg shadow" >
        <div className="md:w-1/2 p-6 md:rounded-l-lg" style={{ backgroundColor: "#119DA4" }}>
        <form className="p-8 w-full  lg:w-full  " noValidate
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-4">
                <Label htmlFor="username1" value="username" className="text-white text-lg font-sans"/>
                <TextInput id="username1" type="text" placeholder="username" required name='username'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  helperText={
                    formik.errors.username && formik.touched.username ? (<span className='font-medium text-red-600'>
                      {formik.errors.username}
                    </span>) : null
                  }
                  className="border-b border-black focus:outline-none text-white"
                style={{ backgroundColor: "#119DA4", borderColor: "#119DA4" }}
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="password1" value="Contraseña" className="text-white text-lg font-sans"/>
                <TextInput id="password1" type="password" required name='password' placeholder='*******'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  helperText={
                    formik.errors.password && formik.touched.password ? (<span className='font-medium text-red-600'>
                      {formik.errors.password}
                    </span>) : null
                  }
                  className="border-b border-black focus:outline-none text-white"
                  style={{ backgroundColor: "#119DA4", borderColor: "#119DA4" }}
                />
              </div>
              <Button className='font-sans rounded-lg shadow' type="submit"
              disabled={formik.isSubmitting || !formik.isValid}
              style={{ backgroundColor: "#039A00" }}
              > {
                formik.isSubmitting ? (<Spinner/> ) : (<>Iniciar Sesion</>)
              } 
              </Button>
            </form>
        </div>
        <div className="md:w-1/2 p-6 md:rounded-r-lg" style={{ backgroundColor: "#0C7489" }}>
          <div className="flex flex-col items-center justify-center">
            <img src="../../img/loginLogo.jpeg" alt="" className="rounded-full  mb-4" />
            <h1 className="text-2xl text-white font-sans">SIEGU</h1>
            <h2 className="text-white font-sans">SISTEMA GESTOR DE EXAMENES UNIVERSITARIOS</h2>
          </div>
        </div>
      </div>
    </div>
  );



  /*
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-400 to-green-800 ">
      <div className='w-full md:w-1/2 lg:w-1/2 sm:w-1/2'>
        <Card className=" bg-gradient-to-r from-green-400 to-green-800 rounded">
          <div className='flex justify-center'>
            <img src="../../img/loginLogo.jpeg" alt="" />
          </div>
          <div className='flex justify-center text-center '>
            <form className="p-8 w-full w-full md:1/2 lg:w-1/2  " noValidate
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-4">
                <Label htmlFor="username1" value="username" />
                <TextInput id="username1" type="text" placeholder="username" required name='username'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  helperText={
                    formik.errors.username && formik.touched.username ? (<span className='font-medium text-red-600'>
                      {formik.errors.username}
                    </span>) : null
                  }
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="password1" value="Your password" />
                <TextInput id="password1" type="password" required name='password' placeholder='*******'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  helperText={
                    formik.errors.password && formik.touched.password ? (<span className='font-medium text-red-600'>
                      {formik.errors.password}
                    </span>) : null
                  }
                  
                />
              </div>
              <Button className='rounded-full w-full' type="submit"
              disabled={formik.isSubmitting || !formik.isValid}
              > {
                formik.isSubmitting ? (<Spinner/> ) : (<>Iniciar Sesion</>)
              } 
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
            <div className="flex flex-col">
            <div className="mb-2 mt-4 block">
              <Label htmlFor="username1" value="Username" className="text-white text-lg font-sans" />
            </div>
            <div className="mt-2">
              <TextInput
                id="username1"
                type="text"
                placeholder="********"
                required
                className="border-b border-black focus:outline-none text-white"
                style={{ backgroundColor: "#119DA4", borderColor: "#119DA4" }}
              />
            </div>
            <div className="mb-2  mt-1 block">
              <Label htmlFor="password1" value="Contraseña" className="text-white text-lg font-sans" />
            </div>
            <div className="mt-2">
              <TextInput
                id="password1"
                type="password"
                placeholder="********"
                required
                className="border-b border-black focus:outline-none text-white"
                style={{ backgroundColor: "#119DA4", borderColor: "#119DA4" }}
              />
            </div>
            <div className=" mt-2 ">
              <Button type="submit" className="font-sans rounded-lg shadow" style={{ backgroundColor: "#039A00" }}>
                Iniciar Sesión
              </Button>
            </div>
          </div>
  */
}

export default SignInPage;
