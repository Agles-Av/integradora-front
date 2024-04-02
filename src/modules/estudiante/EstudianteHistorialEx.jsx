import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri"; // Cambiado a RiCloseLine
import { Label, Radio, Banner, Button } from 'flowbite-react';
import AxiosCliente from '../../config/htpp-gateway/http-client';

function EstudianteHistorialEx() {
  const location = useLocation();
  const { user } = location.state;
  const [loading, setLoading] = useState(false);
  const [respuestas, setRespuestas] = useState([]);
  console.log(user);

  let examen = {
    title: "Examen de Matemáticas",
    description: "Examen de matemáticas de 5to grado",
  };
  let preguntas = [];

  const { examenData } = location.state;
  console.log("data", examenData);

  if (examenData && examenData.hasOwnProperty('examen')) {
    examen = examenData.examen;

    if (examen && examen.hasOwnProperty('preguntas')) {
      preguntas = examen.preguntas;
    }
  } else {

  }

  const getRespuestaUsuario = async () => {
    console.log(examenData.usuario.id, examenData.examen.id);
    try {
      setLoading(true);
      const response = await AxiosCliente({
        url: `/usuariorespuesta/respuestas/${examenData.usuario.id}`,
        method: "GET",
      });
      console.log("response", response.data);
      if (!response.error) {
        setRespuestas(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRespuestaUsuario();
  }, []);
  console.log("respuestas", respuestas);


  const isWrong = (respuesta) => { 
    console.log("Ahora esta mal");
  }


  const isRigth = (respuesta) => {
    console.log("Ahora está bien");
   }


  return (
    <div className='flex justify-center grid'>
      <div className='container max-w-6xl'>
        <div className="p-4 border rounded-md my-5 mx-6 pt-5 w-full" style={{ backgroundColor: '#D9D9D9', borderColor: '#13505B' }}>
          <div className='grid grid-cols-2 gap-4 '>
            <h1 style={{ color: '#0C7489', fontSize: 24 }}>{examen.title}</h1>
          </div>
          <div className='my-3 max-w-2xl'>
            <h1 style={{ color: '#0C7489', fontSize: 20 }}>{examen.description}</h1>
          </div>
        </div>
      </div>
      <hr style={{ width: "52rem" }} />
      <div className=' my-5 border rounded-md grid w-full' style={{ border: '1px solid #0C7489', background: '#D9D9D9' }}>
        <div className='m-3 p-4'>
          {preguntas.map((pregunta, index) => (
            <div key={index} className='m-3 p-4'>
              <div className='bg-white rounded-lg p-3 m-3 p-4'>
                <h1 className='text-lg font-bold text-green-700'>{pregunta.name}</h1>
                {respuestas.map((respuesta, idx) => {
                  const botones = user ? (
                    <div className='flex justify-end' key={idx}>
                      <Button pill outline color='light' className="mr-2"><FaCheck color='green' onClick={() => isRigth(respuesta)} /></Button>
                      <Button pill outline color='light' className="mr-2"><RiCloseLine color='red' onClick={() => isWrong(respuesta)} /></Button>
                    </div>
                  ) : null;

                  return respuesta.pregunta.id === pregunta.id ? (
                    <div key={idx} className='mt-1 flex flex-row items-center justify-between' style={respuesta.correcta ? { borderBlockColor: "#04D400" } : { borderBlockColor: "red" }}>
                      <div className='flex-grow ml-2 '>
                        <fieldset className="flex max-w-md flex-col gap-4">
                          <div className="flex items-center gap-2">
                            <Radio disabled={true} style={respuesta.correcta ? { backgroundColor: "#04D400" } : { backgroundColor: "red" }} />
                            <Label htmlFor="united-state">{respuesta.respuesta && respuesta.respuesta.nombre ? respuesta.respuesta.nombre : respuesta.description}</Label>
                            {respuesta.correcta ? <FaCheck color='green' /> : <RiCloseLine color='red' />}
                          </div>
                        </fieldset>
                      </div>
                      <div className='ml-2 grid justify-start'>
                      </div>
                      <div className='justify-end'>{botones}</div>
                    </div>
                  ) : null;
                })}
              </div>
              <div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EstudianteHistorialEx;
