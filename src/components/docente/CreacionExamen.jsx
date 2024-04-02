import React, { useState, useEffect } from 'react'
import { Button, FloatingLabel, TextInput, Radio, Textarea, Banner } from "flowbite-react";
import { useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import AxiosCliente from '../../config/htpp-gateway/http-client';
import * as yup from 'yup';
import { FaRegCopy, FaSearch, FaPlus } from "react-icons/fa";
import { customAlert, confirmAlert } from '../../config/alert/alert'
import { useNavigate } from 'react-router-dom';
import { HiX } from "react-icons/hi";
import { MdAnnouncement } from "react-icons/md";

const CreacionExamen = () => {
    const location = useLocation();
    const { dataClass } = location.state;
    const navigate = useNavigate();

    const [examData, setExamData] = useState({
        title: "",
        description: "",
        clase: {
            id: dataClass.id
        },
        examen: {
            id: 2
        },
        preguntas: []
    });

    const handleFinishClick = () => {
        // Actualizar el id del examen a 3 pa decir que se terminó
        setExamData(prevData => ({
            ...prevData,
            examen: {
                id: 3
            }
        }));
    };

    const addQuestion = (type) => {
        console.log("La pregunta es ", type);
        const newQuestion = {
            name: '',
            tipo: type === 'closed',
            respuestas: type === 'closed' ? [{ nombre: '', correcta: true }, { nombre: '', correcta: false }] : [{ nombre: '', correcta: true }],
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

    const formik = useFormik({
        initialValues: {
            title: examData.title,
            description: examData.description,
            clase: {
                id: dataClass.id
            },
            examen: {
                id: 2
            },
            preguntas: examData.preguntas
        },
        validationSchema: yup.object().shape({
            title: yup.string().required("Campo obligatorio").max(50, "Solo se permiten hasta 50 caractéres").min(3, "Mínimo 3 caractéres"),
            description: yup.string().required("Campo obligatorio").max(150, "Solo se permiten hasta 50 caractéres").min(3, "Mínimo 3 caractéres"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            confirmAlert(async () => {
                try {
                    const payload = {
                        title: values.title,
                        description: values.description,
                        clase: {
                            id: values.clase.id
                        },
                        examen: {
                            id: values.examen.id,
                        },
                        preguntas: values.preguntas.map(question => ({
                            name: question.name,
                            tipo: question.tipo,
                            respuestas: question.respuestas
                        }))
                    };
                    console.log("payload", payload);
                    const response = await AxiosCliente({
                        method: 'POST',
                        url: '/examen/',
                        data: payload
                    });
                    console.log(response);
                    if (response.status === 'OK') {
                        customAlert("Éxito", "Examen creado correctamente", "success")
                        navigate(-1);
                    }
                    return response;
                } catch (error) {
                    customAlert("Error", "Ocurrió un error al crear el examen", "error")
                } finally {
                    setSubmitting(false)
                }
            })
        }
    });
    useEffect(() => {
        formik.setValues({
            title: examData.title,
            description: examData.description,
            clase: {
                id: dataClass.id
            },
            examen: {
                id: examData.examen.id
            },
            preguntas: examData.preguntas
        });
    }, [examData]);

    useEffect(() => {
        // Actualizar el id del examen a 3 cuando se haga clic en el botón "Terminar"
        formik.setValues(prevValues => ({
            ...prevValues,
            examen: {
                id: examData.examen.id
            }
        }));
    }, [examData.examen.id]);

    const handleExamTitleChange = (event) => {
        formik.handleChange(event); // Actualizar el valor en el estado de Formik
        setExamData(prevData => ({
            ...prevData,
            title: event.target.value
        }));
    };

    const handleDescriptionChange = (event) => {
        formik.handleChange(event); // Actualizar el valor en el estado de Formik
        setExamData(prevData => ({
            ...prevData,
            description: event.target.value
        }));
    };

    return (
        <div className='flex justify-center grid'>
            <form noValidate onSubmit={formik.handleSubmit} id='saveExam' name='saveExam'>
                <div className='container max-w-6xl'>
                    <div className="p-4 border rounded-md my-5 mx-6 pt-5 w-full" style={{ backgroundColor: '#D9D9D9', borderColor: '#13505B' }}>
                        <div className='grid grid-cols-2 gap-4 '>
                            <FloatingLabel variant="standard" label="Título del exámen" style={{ color: '#0C7489', fontSize: 24 }}
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
                            <FloatingLabel variant="standard" label="Descripción del exámen" style={{ color: '#0C7489', fontSize: 20 }}
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

                <div>
                    <Banner>
                        <div className="flex w-full justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
                            <div className="mx-auto flex items-center">
                                <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
                                    <MdAnnouncement className="mr-4 h-4 w-4" />
                                    <span className="[&_p]:inline">
                                        Para las preguntas de opción múltiple, seleccione la respuesta correcta con el radio button, para las preguntas abiertas solo debe ingresar una posible respuesta correcta
                                    </span>
                                </p>
                            </div>
                            <Banner.CollapseButton color="gray" className="border-0 bg-transparent text-gray-500 dark:text-gray-400">
                                <HiX className="h-4 w-4" />
                            </Banner.CollapseButton>
                        </div>
                    </Banner>
                </div>


                <div className='justify-center my-5 border rounded-md grid' style={{ border: '1px solid #0C7489', background: '#D9D9D9' }}>
                    <div className='m-3 p-4'>

                        {examData.preguntas.map((question, index) => (
                            <div key={index} className='m-3 p-4'>
                                <div className='bg-white rounded-lg p-3 m-3 p-4'>
                                    <TextInput className="form-control mb-3" placeholder="Ingrese el título de la pregunta" value={question.name} onChange={(event) => handleTitleChange(index, event)} />
                                    {question.tipo === false && (
                                        <div className='mb-3 flex items-center justify-start'>
                                            <Textarea
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
                                                    <TextInput className="form-control" placeholder={`Opción ${optionIndex + 1}`} value={option.nombre} onChange={(event) => handleOptionChange(index, optionIndex, event)} />
                                                </div>
                                            ))}
                                            <Button pill outline color='success' onClick={() => addOption(index)}> <FaPlus /> </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-end m-3 p-4'>
                        <Button pill outline color='info' onClick={() => addQuestion('closed')}>Agregar pregunta opción multiple</Button>
                        <Button pill outline color='info' onClick={() => addQuestion('open')}>Agregar pregunta abierta</Button>
                    </div>
                </div>
                <div className='flex justify-end m-3 p-4'>
                    <Button pill outline color='warning' form='saveExam' type="submit" disabled={formik.isSubmitting || !formik.isValid}> Guardar y Salir</Button>
                    <Button pill outline color='info' onClick={handleFinishClick} type="submit" form='saveExam' disabled={formik.isSubmitting || !formik.isValid}>Terminar</Button>
                </div>
            </form>
        </div>
    )
}

export default CreacionExamen