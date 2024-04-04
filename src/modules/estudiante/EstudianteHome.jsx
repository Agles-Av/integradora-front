import React, { useEffect, useState } from 'react';
import { Card, Label, TextInput, Button } from 'flowbite-react';
import { MdClass } from "react-icons/md";
import AxiosCliente from '../../config/htpp-gateway/http-client';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { customAlert } from '../../config/alert/alert';
import { FaSearch } from "react-icons/fa";

function EstudianteHome() {
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
          navigate("/examen", { state: { dataDoExamen } }, { state: { idEstudiante } });
        } else throw Error('Error');
      } catch (error) {
        console.log(error);
        customAlert("No se encontró el examen", "Verifica tu código e introducelo de nuevo", "error")
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

  const userDocente=false;
  const handleCardClick = (examenData, userD) => {
    navigate("/historial", { state: { examenData } });
    setDataHistory(examenData);
  }

  return (
    <div className='flex w-full h-screen'>
      <div className='flex w-1/2 overflow-auto max-h-screen'>
        <div className='flex flex-col w-full items-center '>
          <div className='flex w-full text-lg font-bold'>
          <div className="flex  w-full  ml-3 ">
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
          </div>
          {examenHistory
            .filter((item) => {
              return item.examen.title.toLowerCase().includes(filterText.toLowerCase());
            })
          .map((item, index) => (
            <div key={index} className='flex flex-row w-full '>
              <Card className="mt-4  mr-3 ml-3 p-4 flex w-full h-64 border border-green-500" onClick={() => handleCardClick(item, userDocente)} style={{cursor: 'pointer'}}>
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
            </div>
          ))}
        </div>
      </div>
      <div className='flex w-full p-3 mt-4 '>
        <div className='flex flex-col w-full items-center mt-5'>
          <Card className="flex mt-5 max-w-lg border border-green-500">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-green-700">
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
                  <Button type="submit" disabled={formik.isSubmitting || !formik.isValid}>Acceder</Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default EstudianteHome;
