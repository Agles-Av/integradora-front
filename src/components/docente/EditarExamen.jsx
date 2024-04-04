import React, { useState, useEffect } from 'react'
import { Button, FloatingLabel, TextInput, Radio, Textarea, Label } from "flowbite-react";
import { useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import AxiosCliente from '../../config/htpp-gateway/http-client';
import * as yup from 'yup';
import { FaRegCopy, FaSearch, FaPlus } from "react-icons/fa";
import { customAlert, confirmAlert } from '../../config/alert/alert'
import { useNavigate } from 'react-router-dom';
import { getColorsFromServer } from '../../config/colors/colorService';

const EditarExamen = () => {
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
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [examen, setExamen] = useState([]);
    const { examenId } = location.state;
    console.log("data", examenId);
    const [nuevasPreguntas, setNuevasPreguntas] = useState([]);
    const agregarNuevaPregunta = (nuevaPregunta) => {
        setNuevasPreguntas([...nuevasPreguntas, nuevaPregunta]);
    };

    const [examData, setExamData] = useState({
        id: "",
        title: "",
        description: "",
        clase: {
            id: ""
        },
        code:"",
        examen: {
            id: examenId
        },
        preguntas: []
    });
    console.log("examen", examData);

    const [questions, setQuestions] = useState([]);

    const addQuestion = (type) => {
        console.log("La pregunta es ", type);
        const newQuestion = {
            name: '',
            tipo: type === 'closed',
            respuestas: type === 'closed' ? [{ nombre: '', correcta: false }, { nombre: '', correcta: false }] : [{ nombre: '', correcta: true }],
        };
        setExamData(prevData => ({
            ...prevData,
            preguntas: [...prevData.preguntas, newQuestion]
        }));
        console.log(examData);
    };

    const handleTitleChange = (index, event) => {
        const updatedQuestions = [...examData.preguntas];
        updatedQuestions[index].name = event.target.value;
        setExamData(prevData => ({
            ...prevData,
            preguntas: updatedQuestions
        }));
    };

    const handleOptionChange = (questionIndex, optionIndex, event) => {
        const updatedQuestions = [...examData.preguntas];
        updatedQuestions[questionIndex].respuestas[optionIndex].nombre = event.target.value;
        setExamData(prevData => ({
            ...prevData,
            preguntas: updatedQuestions
        }));
    };

    const handleAnswerChange = (index, event) => {
        const updatedQuestions = [...examData.preguntas];
        updatedQuestions[index].respuestas[0].nombre = event.target.value;
        setExamData(prevData => ({
            ...prevData,
            preguntas: updatedQuestions
        }));
    };

    const addOption = (index) => {
        const updatedQuestions = [...examData.preguntas];
        updatedQuestions[index].respuestas.push({ nombre: '', correcta: false });
        setExamData(prevData => ({
            ...prevData,
            preguntas: updatedQuestions
        }));
    };


    const handleSelectOption = (questionIndex, optionIndex) => {
        const updatedQuestions = [...examData.preguntas];
        updatedQuestions[questionIndex].respuestas.forEach((respuesta, index) => {
            respuesta.correcta = index === optionIndex; // Marcar la opción seleccionada como correcta
        });
        setExamData(prevData => ({
            ...prevData,
            preguntas: updatedQuestions
        }));
    };

    // Función para agregar una nueva pregunta
    const addNewQuestion = (type) => {
        console.log("La pregunta es ", type);
        const newQuestion = {
            name: '',
            tipo: type === 'closed',
            respuestas: type === 'closed' ? [{ nombre: '', correcta: false }, { nombre: '', correcta: false }] : [{ nombre: '', correcta: true }],
        };
        agregarNuevaPregunta(newQuestion);
    };

    // Función para manejar el cambio de título de una nueva pregunta
    const handleNewQuestionTitleChange = (index, event) => {
        const updatedQuestions = [...nuevasPreguntas];
        updatedQuestions[index] = {
            ...updatedQuestions[index],
            name: event.target.value
        };
        setNuevasPreguntas(updatedQuestions);
    };

    // Función para manejar el cambio de respuesta de una nueva pregunta
    const handleNewAnswerChange = (index, event) => {
        const updatedQuestions = [...nuevasPreguntas];
        updatedQuestions[index].respuestas[0] = {
            ...updatedQuestions[index].respuestas[0],
            nombre: event.target.value
        };
        setNuevasPreguntas(updatedQuestions);
    };

    // Función para agregar una nueva opción a una nueva pregunta cerrada
const addOptionToNewQuestion = (index) => {
    const updatedQuestions = [...nuevasPreguntas];
    updatedQuestions[index].respuestas.push({ nombre: '', correcta: false });
    setNuevasPreguntas(updatedQuestions);
};

    // Función para eliminar una nueva pregunta
    const removeNewQuestion = (index) => {
        const updatedQuestions = [...nuevasPreguntas];
        updatedQuestions.splice(index, 1);
        setNuevasPreguntas(updatedQuestions);
    };

    
// Función para manejar el cambio de respuesta de una nueva pregunta cerrada
const handleNewOptionChange = (questionIndex, optionIndex, event) => {
    const updatedQuestions = [...nuevasPreguntas];
    updatedQuestions[questionIndex].respuestas[optionIndex].nombre = event.target.value;
    setNuevasPreguntas(updatedQuestions);
};

// Función para seleccionar la opción correcta en una nueva pregunta cerrada
const handleNewSelectOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...nuevasPreguntas];
    updatedQuestions[questionIndex].respuestas.forEach((respuesta, index) => {
        respuesta.correcta = index === optionIndex; // Marcar la opción seleccionada como correcta
    });
    setNuevasPreguntas(updatedQuestions);
};

const changeStatus = async () => {
    try {
        const payload = {
            id: examData.id,
            title: formik.values.title,
            description: formik.values.description,
            clase: {
                id: formik.values.clase.id
            },
            code:examData.code,
            examen: {
                id: 3,
            }
        };
        console.log("payload", payload);
        const response = await AxiosCliente({
            method: 'PUT',
            url: `/examen/${examenId}`,
            data: payload
        });
        console.log(response);
        if (response.status === 'OK') {
            customAlert("Éxito", "Examen terminado correctamente", "success")
            navigate(-1);
        }
        return response;
    } catch (error) {
        customAlert("Error", "Ocurrió un error al terminar el examen", "error")
    }
};

    useEffect(() => {
        const getExam = async () => {
            try {
                const response = await AxiosCliente({
                    url: `/examen/${examenId}`,
                    method: "GET",
                });
                if (!response.error) {
                    setExamData({
                        id: response.data.id,
                        title: response.data.title,
                        description: response.data.description,
                        clase: {
                            id: response.data.clase.id
                        },
                        examen: {
                            id: response.data.examen.id
                        },
                        code:response.data.code,
                        preguntas: response.data.preguntas
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };

        getExam();
    }, [examenId]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: examData.title,
            description: examData.description,
            clase: {
                id: examData.clase.id
            },
            examen: {
                id: examData.examen.id
            },
            preguntas: examData.preguntas
        },
        onSubmit: async (values, { setSubmitting }) => {
            confirmAlert(async () => {
                console.log(examData.id);
                try {
                    // Construir un arreglo de objetos con la información requerida para cada pregunta, incluyendo respuestas
                    const preguntas = nuevasPreguntas.map(question => ({
                        name: question.name,
                        tipo: question.tipo,
                        respuestas: question.respuestas.map(respuesta => ({
                            nombre: respuesta.nombre,
                            correcta: respuesta.correcta
                        })),
                        examen: {
                            id: examData.id
                        }
                    }));
    
                    // Enviar cada pregunta individualmente al servidor
                    for (const pregunta of preguntas) {
                        const response = await AxiosCliente({
                            method: 'POST',
                            url: '/pregunta/',
                            data: pregunta
                        });
    
                        if (response.status !== 'OK') {
                            // Manejar el error si la solicitud no es exitosa
                            console.error("Error al guardar la pregunta:", response);
                        }
                    }
    
                    // Si todas las preguntas se guardaron exitosamente, mostrar un mensaje de éxito
                    customAlert("Éxito", "Examen guardado correctamente", "success");
                    navigate(-1);
                } catch (error) {
                    // Manejar cualquier error que ocurra durante el proceso
                    console.error("Error al guardar el examen:", error);
                    customAlert("Error", "Ocurrió un error al guardar el examen", "error");
                } finally {
                    setSubmitting(false);
                }
            })
        }
    });


    const handleExamTitleChange = (event) => {
        formik.handleChange(event);
    };

    const handleDescriptionChange = (event) => {
        formik.handleChange(event);
    };



    return (
        <div className='flex justify-center grid'>
            <form noValidate onSubmit={formik.handleSubmit} id='saveExam' name='saveExam'>
                <div className='container max-w-6xl'>
                    <div className="p-4 border rounded-md my-5 mx-6 pt-5 w-full" style={{ backgroundColor: '#D9D9D9', borderColor: colors[0] && colors[0].color3 }}>
                        <div className='grid grid-cols-2 gap-4 '>
                            <Label variant="standard" label="Título del exámen" style={{ color: colors[0] && colors[0].color2, fontSize: 24 }}
                                onChange={handleExamTitleChange}
                                name='title'
                                value={examData.title}
                                onBlur={formik.handleBlur}
                                helperText={
                                    formik.touched.title && formik.errors.title ?
                                        (<span className='text-sm text-red-600'>{formik.errors.title}</span>) : null
                                } />
                        </div>
                        <div className='my-3 max-w-2xl'>
                            <Label variant="standard" label="Descripción del exámen" style={{ color: colors[0] && colors[0].color2, fontSize: 20 }}
                                onChange={handleDescriptionChange}
                                name='description'
                                value={examData.description}
                                onBlur={formik.handleBlur}
                                helperText={
                                    formik.touched.description && formik.errors.description ?
                                        (<span className='text-sm text-red-600'>{formik.errors.description}</span>) : null
                                } />
                        </div>
                    </div>
                </div>

                <div className='justify-center my-5 border rounded-md grid' style={{ border: '1px solid #0C7489', background: '#D9D9D9' }}>
                    <div className='m-3 p-4'>

                        {examData.preguntas.map((question, index) => (
                            <div key={index} className='m-3 p-4'>
                                <div className='bg-white rounded-lg p-3 m-3 p-4'>
                                    <Label className="form-control mb-3" placeholder="Ingrese el título de la pregunta" value={question.name} onChange={(event) => handleTitleChange(index, event)} />
                                    {question.tipo === false && (
                                        <div className='mb-3 flex items-center justify-start'>
                                            <Label
                                                className="form-control"
                                                placeholder="Ingrese una posible respuesta"
                                                value={question.respuestas[0] ? question.respuestas[0].nombre : ''}
                                                onChange={(event) => handleAnswerChange(index, event)}
                                            />
                                        </div>
                                    )}
                                    {question.tipo === true && (
                                        <div className='m-3 p-4'>
                                            {question.respuestas.map((option, optionIndex) => (
                                                <div key={optionIndex} className="mb-3 flex items-center justify-start">
                                                    <fieldset>
                                                        <Radio id={`option_${index}_${optionIndex}`} name={`question_${index}`} value={option.nombre} onChange={() => handleSelectOption(index, optionIndex)} checked={option.correcta} />
                                                    </fieldset>
                                                    <Label className="form-control" placeholder={`Opción ${optionIndex + 1}`} value={option.nombre} onChange={(event) => handleOptionChange (index, optionIndex, event)} />
                                                </div>
                                            ))}
                                            <Button pill outline color='success' onClick={() => addOption(index)}> <FaPlus /> </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {nuevasPreguntas.map((question, index) => (
                            <div key={index} className='m-3 p-4'>
                                <div className='bg-white rounded-lg p-3 m-3 p-4'>
                                    <TextInput className="form-control mb-3" placeholder="Ingrese el título de la pregunta" value={question.name} onChange={(event) => handleNewQuestionTitleChange(index, event)} />
                                    {question.tipo === false && (
                                        <div className='mb-3 flex items-center justify-start'>
                                            <Textarea
                                                className="form-control"
                                                placeholder="Ingrese una posible respuesta"
                                                value={question.respuestas[0] ? question.respuestas[0].nombre : ''}
                                                onChange={(event) => handleNewAnswerChange(index, event)}
                                            />
                                        </div>
                                    )}
                                    {question.tipo === true && (
                                        <div className='m-3 p-4'>
                                            {question.respuestas.map((option, optionIndex) => (
                                                <div key={optionIndex} className="mb-3 flex items-center justify-start">
                                                    <fieldset>
                                                        <Radio id={`option_${index}_${optionIndex}`} name={`question_${index}`} value={option.nombre} onChange={() => handleNewSelectOption(index, optionIndex)} checked={option.correcta} />
                                                    </fieldset>
                                                    <TextInput className="form-control" placeholder={`Opción ${optionIndex + 1}`} value={option.nombre} onChange={(event) => handleNewOptionChange(index, optionIndex, event)} />
                                                </div>
                                            ))}
                                            <Button pill outline color='success' onClick={() => addOptionToNewQuestion (index)}> <FaPlus /> </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-end m-3 p-4'>
                        <Button pill outline color='info' onClick={() => addNewQuestion('closed')}>Agregar pregunta opción multiple</Button>
                        <Button pill outline color='info' onClick={() => addNewQuestion('open')}>Agregar pregunta abierta</Button>
                    </div>
                </div>
                <div className='flex justify-end m-3 p-4'>
                    <Button pill outline color='warning' form='saveExam' type="submit" disabled={formik.isSubmitting || !formik.isValid} >Guardar y Salir</Button>
                    <Button pill outline color='info' onClick={changeStatus} type="submit" form='saveExam'>Terminar</Button>
                </div>
            </form>
        </div>
    )
}

export default EditarExamen