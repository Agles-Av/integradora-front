import React from 'react'
import { useFormik } from 'formik';
import AxiosCliente from '../../config/htpp-gateway/http-client';
import * as yup from 'yup';
import { customAlert, confirmAlert } from '../../config/alert/alert'
import { Badge, Button, Card, Label, TextInput, Modal, Select } from 'flowbite-react';


const ModalCreate = ({ openModal, setOpenModal, getAllUsers }) => {
    const closeModal = () => {
        formik.resetForm();
        setOpenModal(false);
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirm: "",
            role: [],
            status: true,
            name: "",
            surname: "",
            lastname: "",
            curp: "",
            matricula: "",
        },
        validationSchema: yup.object().shape({
            email: yup.string().required('El correo es requerido').email('El correo no es valido'),
            password: yup.string().required("Campo obligatorio").max(50, "Solo se permiten hasta 50 caractéres").min(8, "Mínimo 8 caractéres"),
            confirm: yup.string().test("confirm password", "las contraseñaas no coinciden", function (value) { return this.parent.password === value; }),
            role: yup.string().required("Campo obligatorio").test("Selecciona un rol", "Debes escoger un rol", function (value) { return !!value }),
            name: yup.string().required("Campo obligatorio").max(50, "Solo se permiten hasta 50 caractéres").min(3, "Mínimo 3 caractéres"),
            surname: yup.string().required("Campo obligatorio").max(50, "Solo se permiten hasta 50 caractéres").min(3, "Mínimo 3 caractéres"),
            lastname: yup.string().required("Campo obligatorio").max(50, "Solo se permiten hasta 50 caractéres").min(3, "Mínimo 3 caractéres"),
            curp: yup.string().required("Campo obligatorio").max(18, "Solo se permiten hasta 18 caractéres").min(18, "Mínimo 18 caractéres"),
            matricula: yup.string().required("Campo obligatorio").max(50, "Solo se permiten hasta 50 caractéres").min(3, "Mínimo 3 caractéres"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            confirmAlert(async () => {
                try {
                    const payload = {
                        ...values,
                        status: true,
                        role: {
                            id: values.role,
                        },
                        person: {
                            name: values.name,
                            surname: values.surname,
                            lastname: values.lastname,
                            curp: values.curp,
                            matricula: values.matricula,
                        }
                    }
                    console.log(payload);
                    const response = await AxiosCliente({
                        method: 'POST',
                        url: '/usuario/',
                        data: payload
                    });
                    if (response.status === 'OK') {
                        setOpenModal(false);
                        customAlert("Éxito", "Usuario registrado correctamente", "success")
                        getAllUsers();
                        closeModal();
                    }
                    return response;
                } catch (error) {
                    customAlert("Error", "Ocurrió un error al registrar el usuario", "error")
                } finally {
                    setSubmitting(false)
                    closeModal();
                    getAllUsers();
                }
            })
        }
    })

    return (
        <div>
            <Modal show={openModal} size={'5xl'} onClose={() => setOpenModal(false)}>
                <Modal.Header>Registrar Usuario</Modal.Header>
                <Modal.Body>
                    <form noValidate onSubmit={formik.handleSubmit} id='saveUserForm' name='saveUserForm'>
                        <div className='flex flex-col gap-3 py-3'>
                            <Card className='flex flex-col'>
                                <h3 className='font-bold'>Datos de usuario</h3>

                                <div className='w-full flex'>
                                    <div className='w-1/2 p-2'>
                                        <Label htmlFor='email' className='font-bold' value='Correo electrónico' />
                                        <TextInput
                                            htmlFor='email'
                                            name='email'
                                            type='email'
                                            placeholder='correo@Ejemplo.com'
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            helperText={
                                                formik.touched.email && formik.errors.email ?
                                                    (<span className='text-sm text-red-600'>{formik.errors.email}</span>) : null
                                            }
                                        />
                                    </div>
                                    <div className='w-1/2 p-2'>
                                        <Label htmlFor='role' className='font-bold' value='Rol' />
                                        <Select id="role" htmlFor='role' name='role' required placeholder="Selecciona un rol"
                                            value={formik.values.role}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            helperText={
                                                formik.touched.role && formik.errors.role ?
                                                    (<span className='text-sm text-red-600'>{formik.errors.role}</span>) : null
                                            }
                                        >
                                            <option value={""} disabled selected>Selecciona un rol</option>
                                            <option value={"1"}>Administrador</option>
                                            <option value={"2"}>Docente</option>
                                            <option value={"3"}>Estudiante</option>
                                        </Select>
                                    </div>
                                </div>
                                <div className='w-full flex'>
                                    <div className='w-1/2 p-2'>
                                        <Label htmlFor='password' className='font-bold' value='Contraseña' />
                                        <TextInput
                                            htmlFor='password'
                                            name='password'
                                            type='password'
                                            placeholder='******'
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            helperText={
                                                formik.touched.password && formik.errors.password ?
                                                    (<span className='text-sm text-red-600'>{formik.errors.password}</span>) : null
                                            }
                                        />
                                    </div>
                                    <div className='w-1/2 p-2'>
                                        <Label htmlFor='confirm' className='font-bold' value='Confirmar Contraseña' />
                                        <TextInput
                                            htmlFor='confirm'
                                            name='confirm'
                                            type='password'
                                            placeholder='******'
                                            value={formik.values.confirm}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            helperText={
                                                formik.touched.confirm && formik.errors.confirm ?
                                                    (<span className='text-sm text-red-600'>{formik.errors.confirm}</span>) : null
                                            }
                                        />
                                    </div>
                                </div>
                            </Card>

                        </div>
                        <div className='flex flex-col gap-3 py-3'>
                            <Card className='flex flex-col'>
                                <h3 className='font-bold'>Datos Personales</h3>

                                <div className='w-full flex space-center'>
                                    <div className='w-1/2 p-2'>
                                        <Label htmlFor='name' className='font-bold' value='Nombre' />
                                        <TextInput
                                            htmlFor='name'
                                            name='name'
                                            type='text'
                                            placeholder='Víctor'
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            helperText={
                                                formik.touched.name && formik.errors.name ?
                                                    (<span className='text-sm text-red-600'>{formik.errors.name}</span>) : null
                                            }
                                        />
                                    </div>
                                    <div className='w-1/2 p-2'>
                                        <Label htmlFor='surname' className='font-bold' value='Apellido Paterno' />
                                        <TextInput
                                            htmlFor='surname'
                                            name='surname'
                                            type='text'
                                            placeholder='Barrera'
                                            value={formik.values.surname}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            helperText={
                                                formik.touched.surname && formik.errors.surname ?
                                                    (<span className='text-sm text-red-600'>{formik.errors.surname}</span>) : null
                                            }
                                        />
                                    </div>
                                    <div className='w-1/2 p-2'>
                                        <Label htmlFor='lastname' className='font-bold' value='Apellido Materno' />
                                        <TextInput
                                            htmlFor='lastname'
                                            name='lastname'
                                            type='text'
                                            placeholder='Ocampo'
                                            value={formik.values.lastname}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            helperText={
                                                formik.touched.lastname && formik.errors.lastname ?
                                                    (<span className='text-sm text-red-600'>{formik.errors.lastname}</span>) : null
                                            }
                                        />
                                    </div>
                                </div>
                                <div className='w-full flex'>
                                    <div className='w-1/2 p-2'>
                                        <Label htmlFor='curp' className='font-bold' value='CURP' />
                                        <TextInput
                                            htmlFor='curp'
                                            name='curp'
                                            type='text'
                                            placeholder='BAUH060225HMSRCC6C'
                                            value={formik.values.curp}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            helperText={
                                                formik.touched.curp && formik.errors.curp ?
                                                    (<span className='text-sm text-red-600'>{formik.errors.curp}</span>) : null
                                            }
                                        />
                                    </div>
                                    <div className='w-1/2 p-2'>
                                        <Label htmlFor='matricula' className='font-bold' value='Matricula' />
                                        <TextInput
                                            htmlFor='matricula'
                                            name='matricula'
                                            type='text'
                                            placeholder='202xyzw'
                                            value={formik.values.matricula}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            helperText={
                                                formik.touched.matricula && formik.errors.matricula ?
                                                    (<span className='text-sm text-red-600'>{formik.errors.matricula}</span>) : null
                                            }
                                        />
                                    </div>
                                </div>
                            </Card>

                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer className='justify-between'>
                    <Button pill outline color='failure' onClick={() => setOpenModal(false)}>Salir</Button>
                    <Button form='saveUserForm' pill outline color='success' type="submit" disabled={formik.isSubmitting || !formik.isValid} >Registrar</Button>
                </Modal.Footer>

            </Modal>
        </div>
    )
}

export default ModalCreate