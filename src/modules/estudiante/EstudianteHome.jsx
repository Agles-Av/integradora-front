import React, { useEffect, useState } from 'react';
import { Card, Label, TextInput, Button } from 'flowbite-react';
import { MdClass } from "react-icons/md";
import AxiosCliente from '../../config/htpp-gateway/http-client';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { customAlert } from '../../config/alert/alert';
import { FaSearch } from "react-icons/fa";
import { getColorsFromServer } from '../../config/colors/colorService';
import { VscHistory } from "react-icons/vsc";

function EstudianteHome() {

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
  const navigate = useNavigate();

  const [examenHistory, setExamenHistory] = useState([]);
  const [dataHistory, setDataHistory] = useState([]);
  const [filterText, setFilterText] = useState("");

  const idEstudiante = localStorage.getItem('idEstudiante');

  const formik = useFormik({
    initialValues: {
      codigo: ''
    },
    validationSchema: yup.object().shape({
      codigo: yup.string().min(6, "El código debe tener al menos 6 caracteres").max(6, "El código debe tener 6 caracteres")
    }),

    //Este es simplemente 
    onSubmit: async (values, { setSubmitting }) => {
      console.log(values);
      console.log(values.codigo);
      localStorage.setItem('codigoExamen', values.codigo);
      try {
        const response = await AxiosCliente({
          url: '/examen/' + values.codigo,
          method: 'POST',
          data: values,
        })
        if (!response.error) {
          const dataDoExamen = response.data;
          if (dataDoExamen.examen.name === 'Activo') {
            navigate("/examen", { state: { dataDoExamen } }, { state: { idEstudiante } });
          }
        } else throw Error('Error');
      } catch (error) {
        customAlert("No se encontró el examen", "Verifica tu código e introducelo de nuevo", "error")
        console.log(error);
        formik.resetForm();
      } finally {
        setSubmitting(false);
      }
    }
  });



  const getExamHistory = async () => {
    try {
      const response = await AxiosCliente({
        method: 'GET',
        url: '/usuarioexamen/examen/' + idEstudiante,
      })
      if (!response.error) {
        console.log(response.data);
        setExamenHistory(response.data);
      } else throw Error('Error');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getExamHistory();
  }, []);

  const userDocente = false;
  const handleCardClick = (examenData, userD) => {
    navigate("/historial", { state: { examenData } });
    setDataHistory(examenData);
  }


  return (
    <div className='flex flex-col lg:flex-row w-full h-screen p-4'>
      {/* Formulario de código de examen alineado a la izquierda y más pequeño */}
      <div className='flex justify-between items-center'>
        <Card className="flex mt-5 max-w-lg border " style={{ borderColor: colors[0] && colors[0].color2 }}>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white" style={{ color: colors[0] && colors[0].color2 }}>
            Código de examen
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Pidele a tu profesor el codigo de examen e indrodúcelo aquí
          </p>
          <div className='flex flex-row '>
            <form className="flex flex-row justify-between gap-4" onSubmit={formik.handleSubmit}>
              <div>
                <TextInput id="codigo" type="codigo" placeholder="Código de examen"
                  value={formik.values.codigo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.errors.codigo && formik.touched.codigo ? (<span className='font-medium text-red-600'>
                      {formik.errors.codigo}
                    </span>) : null
                  }
                />
              </div>
              <div>
                <Button type="submit" pill color='success' outline disabled={formik.isSubmitting || !formik.isValid}>Acceder</Button>
              </div>
            </form>
          </div>
        </Card>
      </div>

      {/* Historial centrado en la pantalla */}
      <div className='flex-grow mt-4 lg:mt-0 lg:ml-1/4'>
        <div className='flex flex-row justify-between'>
          <div className=''>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white" style={{ color: colors[0] && colors[0].color2 }}>
              Historial
            </h5>
          </div>
          <div className=''>
            <VscHistory size={30} color={colors[0] && colors[0].color2} />
          </div>
        </div>
        <div className='w-full h-full '>
          <div className='flex flex-col items-center justify-center'>
            {/* ... Barra de Búsqueda ... */}
            <div className='w-full'>
              <TextInput
                id="search"
                type="text"
                rightIcon={FaSearch}
                placeholder="Buscar en el historial..."
                required
                onChange={(e) => setFilterText(e.target.value)}
                value={filterText}
              />
            </div>
            {/* ... Contenido del Historial ... */}
            <div className='w-full'>
              {examenHistory
                .filter((item) => item.examen.title.toLowerCase().includes(filterText.toLowerCase()))
                .map((item, index) => (
                  <Card className="mt-4  mr-3  p-4 flex w-full h-64 border border-green-500 animate-slide-up" onClick={() => handleCardClick(item, userDocente)} style={{ cursor: 'pointer', borderColor: colors[0] && colors[0].color2 }}>
                    <div className='flex flex-row justify-between'>
                      <div>
                        <MdClass size={24} />
                      </div>
                      <div>
                        <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                          {item.examen.title}
                        </h5>
                      </div>
                      <div>
                        <h2 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                          Calificación: {item.calificacion}
                        </h2>
                      </div>
                    </div>
                    <p className="font-normal text-gray-700 dark:text-gray-400 mt-2 ">
                      Realizado el: {item.examen.createdAt} A las {item.hr}
                    </p>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EstudianteHome;
