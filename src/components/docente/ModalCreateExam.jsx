import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import AxiosCliente from '../../config/htpp-gateway/http-client';
import * as yup from 'yup';
import { customAlert, confirmAlert } from '../../config/alert/alert'
import { Badge, Button, Card, Label, TextInput, Modal, Select } from 'flowbite-react';

const ModalCreateExam = ({ openModal, setOpenModal, getExams}) => {
    const location = useLocation();
    const { data } = location.state;
   // console.log(data);
    const closeModal = () => {
        formik.resetForm();
        setOpenModal(false);
    };


    const formik = useFormik({
        initialValues: {
            title: "",
            description:"",
            clase:{
                id: data.id
            },
            examen:{
                id: 2
            }
        },
        validationSchema: yup.object().shape({
            title: yup.string().required("Campo obligatorio").max(50, "Solo se permiten hasta 50 caractéres").min(3, "Mínimo 3 caractéres"),
            description: yup.string().required("Campo obligatorio").max(150, "Solo se permiten hasta 50 caractéres").min(3, "Mínimo 3 caractéres"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            confirmAlert(async () => {
                try {
                    const payload = {
                        ...values,
                    }
                    console.log(payload);
                    const response = await AxiosCliente({
                        method: 'POST',
                        url: '/examen/',
                        data: payload
                    });
                    if (response.status === 'OK') {
                        setOpenModal(false);
                        customAlert("Éxito", "Examen creado correctamente", "success")
                        getExams();
                        closeModal();
                    }
                    return response;
                } catch (error) {
                    customAlert("Error", "Ocurrió un error al crear el examen", "error")
                } finally {
                    setSubmitting(false)
                    closeModal();
                    getExams();
                }
            })
        }
    })


    return (
        <div><Modal show={openModal} size={'md'} onClose={() => setOpenModal(false)}>
            <Modal.Header>Registrar Exámen</Modal.Header>
            <Modal.Body>
                <form noValidate onSubmit={formik.handleSubmit} id='saveClass' name='saveClass'>
                    <div className='flex flex-col gap-3 py-3'>
                        <Card className='flex flex-col'>
                            <div className='w-full flex space-center'>
                                <div className='w-full p-2'>
                                    <Label htmlFor='description' className='font-bold' value='Nombre' />
                                    <TextInput
                                        htmlFor='title'
                                        name='title'
                                        type='text'
                                        placeholder='Nombre del exámen'
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        helperText={
                                            formik.touched.title && formik.errors.title ?
                                                (<span className='text-sm text-red-600'>{formik.errors.title}</span>) : null
                                        }
                                    />
                                </div>
                            </div>

                                <div className='w-full p-2'>
                                    <Label htmlFor='description' className='font-bold' value='Descripcion' />
                                    <TextInput sizing="lg"
                                        htmlFor='description'
                                        name='description'
                                        type='text'
                                        placeholder='Descripción del exámen'
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        helperText={
                                            formik.touched.description && formik.errors.description ?
                                                (<span className='text-sm text-red-600'>{formik.errors.description}</span>) : null
                                        }
                                    />
                            </div>
                        </Card>

                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer className='justify-between'>
                <Button pill outline color='failure' onClick={() => setOpenModal(false)}>Salir</Button>
                <Button form='saveClass' pill outline color='success' type="submit" disabled={formik.isSubmitting || !formik.isValid} >Registrar</Button>
            </Modal.Footer>

        </Modal>
        </div>
    )
}

export default ModalCreateExam