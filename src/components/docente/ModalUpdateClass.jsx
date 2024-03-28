import React, { useEffect, useMemo } from 'react'
import { useFormik } from 'formik';
import AxiosCliente from '../../config/htpp-gateway/http-client';
import * as yup from 'yup';
import { customAlert, confirmAlert } from '../../config/alert/alert'
import { Badge, Button, Card, Label, TextInput, Modal, Select } from 'flowbite-react';

const ModalUpdateClass = ({ openModalUp, setOpenModalUp, getClasses, data }) => {
    const closeModal = () => {
        formik.resetForm();
        setOpenModalUp(false);
    };


    const formik = useFormik({
        initialValues: {
            id: data.id,
            name: data.name,
        },
        validationSchema: yup.object().shape({
            name: yup.string().required("Campo obligatorio").max(50, "Solo se permiten hasta 50 caractéres").min(3, "Mínimo 3 caractéres"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            confirmAlert(async () => {
                try {
                    const payload = {
                        ...values,
                        usuario: {
                            id: idDoc
                        }
                    }
                    console.log(payload);
                    const response = await AxiosCliente({
                        method: 'POST',
                        url: '/clase/',
                        data: payload
                    });
                    if (!response) {
                        setOpenModalUp(false);
                        customAlert("Éxito", "Clase editada correctamente", "success")
                       // getClasses();
                        closeModal();
                    }
                    return response;
                } catch (error) {
                    customAlert("Error", "Ocurrió un error al editar la clase", "error")
                } finally {
                    setSubmitting(false)
                    closeModal();
                   // getClasses();
                }
            })
        }
    });

    useEffect(() => {
      formik.setValues({
        id: data.id,
        name: data.name,
      });
    }, [data]);

    return (
        <div>
            <Modal show={openModalUp} size={'5xl'} onClose={() => setOpenModalUp(false)}>
                <Modal.Header>Actualizar Clase</Modal.Header>
                <Modal.Body>
                    <form noValidate onSubmit={formik.handleSubmit} id='updateClaseForm' name='updateClaseForm'>
                        <div className='flex flex-col gap-3 py-3'>
                            <Card className='flex flex-col'>

                                <div className='w-full flex space-center'>
                                    <div className='w-full p-2'>
                                        <Label htmlFor='name' className='font-bold' value='Nombre' />
                                        <TextInput
                                            htmlFor='name'
                                            name='name'
                                            type='text'
                                            placeholder={formik.values.name}
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            helperText={
                                                formik.touched.name && formik.errors.name ?
                                                    (<span className='text-sm text-red-600'>{formik.errors.name}</span>) : null
                                            }
                                        />
                                    </div>
                                </div>
                            </Card>

                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer className='justify-between'>
                    <Button pill outline color='failure' onClick={() => setOpenModalUp(false)}>Salir</Button>
                    <Button form='updateClaseForm' pill outline color='success' type="submit" disabled={formik.isSubmitting || !formik.isValid} >Actualizar</Button>
                </Modal.Footer>

            </Modal>
        </div>
    )
}

export default ModalUpdateClass