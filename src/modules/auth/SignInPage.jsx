import React, { useContext, useEffect, useState } from 'react';
import { Button, Label, TextInput, Spinner } from 'flowbite-react';
import { replace, useFormik } from 'formik';
import * as yup from 'yup';
import { customAlert } from '../../config/alert/alert';
import { AxiosCliente } from '../../config/htpp-gateway/http-client';
import AuthContext from '../../config/context/auth-context';
import { useNavigate } from 'react-router-dom';

function SignInPage(props) {
  const { reload } = props;
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const [colors, setColors] = useState([]);
  const [logo, setLogo] = useState([]);
  useEffect(() => {
    const storedColors = JSON.parse(localStorage.getItem('colors'));
    const storedLogo = JSON.parse(localStorage.getItem('logo'));
    if (storedColors) {
      setColors(storedColors);
    }
    if (storedLogo) {
      setLogo(storedLogo);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: yup.object().shape({
      email: yup.string().required("Campo obligatorio"),
      password: yup.string().required("Campo obligatorio"),
    }),
    onSubmit: async (values, { setSubmitting }) => {

      try {
        const response = await AxiosCliente({
          url: '/auth/signin',
          method: 'POST',
          data: values,
        })
        if (!response?.error) {
          dispatch({ type: "SIGNIN", payload: response.data });
          console.log(response.data.roles.name);
          localStorage.setItem('role', response.data.roles.name);
          localStorage.setItem('idEstudiante', response.data.user.id);
          localStorage.setItem('idDocente', response.data.user.id);
          console.log(response.data.user.id);
          navigate("/", { replace: true });
        } else throw Error('Error');
      } catch (error) {
        console.log(error);
        customAlert("Error al iniciar sesión", "Usuario y/o contraseña incorrectos", "error")
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="h-screen flex items-center justify-center animate-gradient">
      <div className="flex flex-col md:flex-row w-full max-w-6xl md:rounded-l-lg shadow animate-slide-up drop-shadow-md" >
        <div className="md:w-1/2 p-6 md:rounded-l-lg " style={{ backgroundColor: colors.length>0 ? colors[0].color1: "#119DA4" }}>
          <form className="p-8 w-full  lg:w-full  " noValidate
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4">
              <Label htmlFor="email" value="Correo electrónico" className="text-white text-lg font-sans" />
              <TextInput id="email" type="text" placeholder="email" required name='email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                helperText={
                  formik.errors.email && formik.touched.email ? (<span className='font-medium text-red-600'>
                    {formik.errors.email}
                  </span>) : null
                }
                className="border-b border-black focus:outline-none text-white"
                style={{ backgroundColor:  colors.length>0 ? colors[0].color1: "#119DA4", borderColor:  colors.length>0 ? colors[0].color1: "#119DA4" }}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="password" value="Contraseña" className="text-white text-lg font-sans" />
              <TextInput id="password" type="password" required name='password' placeholder='*******'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                helperText={
                  formik.errors.password && formik.touched.password ? (<span className='font-medium text-red-600'>
                    {formik.errors.password}
                  </span>) : null
                }
                className="border-b border-black focus:outline-none text-white"
                style={{ backgroundColor: colors.length>0 ? colors[0].color1:"#119DA4", borderColor:  colors.length>0 ? colors[0].color1: "#119DA4" }}
              />
            </div>
            <Button className='font-sans rounded-lg shadow' type="submit"
              disabled={formik.isSubmitting || !formik.isValid}
              style={{ backgroundColor: "#039A00" }}
            > {
                formik.isSubmitting ? (<Spinner />) : (<>Iniciar Sesión</>)
              }
            </Button>
          </form>
        </div>
        <div className="md:w-1/2 p-6 md:rounded-r-lg" style={{ backgroundColor: colors.length>0 ? colors[0].color2:  "#0C7489" }}>
          <div className="flex flex-col items-center justify-center">
            <div className='jump-infinite'>
            <img src={logo.length>0 ? (logo[0].logo):"../../img/loginLogo.jpeg"} alt="" className="rounded-full  mb-4" />
            </div>
            <h1 className="text-2xl text-white font-sans">SIGEU</h1>
            <h2 className="text-white font-sans">SISTEMA GESTOR DE EXAMENES UNIVERSITARIOS</h2>
          </div>
        </div>
      </div>
    </div>
  );


}

export default SignInPage;
