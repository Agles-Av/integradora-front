import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri"; // Cambiado a RiCloseLine
import { Label, Radio } from 'flowbite-react';
function EstudianteHistorialEx() {
  const location = useLocation();

  const { examenData } = location.state;
  const { examen } = examenData;
  const { preguntas } = examen;

  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col border border-green-700 mt-4 max-w-md bg-gray-100 shadow w-full'>
        <div className='flex ml-2'>
          <h1 className='text-lg font-bold text-green-700'>{examen.title}</h1>
        </div>
        <div className='flex ml-3'>
          <h1 className='text-md' style={{ color: "#0C748" }}>{examen.description}</h1>
        </div>
      </div>
      <div className='flex flex-col justify-center border border-green-700 mt-4 max-w-md shadow bg-gray-100'>
        {preguntas.map((pregunta, index) => (
          <div key={index} className='flex-col w-full'>
            <div className='flex ml-2'>
              <h1 className='text-lg font-bold text-green-700'>{pregunta.name}</h1>
            </div>
            <div>
              {pregunta.respuestas.map((respuesta, idx) => (
                <div key={idx} className='mt-1 flex flex-row items-center space-between' style={respuesta.correcta ? {borderBlockColor:"#04D400"} : {borderBlockColor:"red"}}>
                  <div className='flex-grow ml-2 '>
                  <fieldset className="flex max-w-md flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <Radio disabled={true} style={respuesta.correcta? {backgroundColor:"#04D400"} : {backgroundColor:"red"}}/>
                      <Label htmlFor="united-state">{respuesta.nombre}</Label>
                    </div>
                  </fieldset>
                  </div>
                  <div className='ml-2 '>
                    {respuesta.correcta ? <FaCheck color='green' /> : <RiCloseLine color='red' />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EstudianteHistorialEx;
