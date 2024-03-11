import React from 'react'
import { Badge, Button, Card, Label, TextInput, Modal, Select } from 'flowbite-react';


const ModalCreate = ({ openModal, setOpenModal }) =>  {
  return (
    <div>
            <Modal show={openModal} size={'5xl'} onClose={() => setOpenModal(false)}>
                <Modal.Header>Registrar Usuario</Modal.Header>
                <Modal.Body>
                    <form action="create">
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
                                    />
                                </div>
                                <div className='w-1/2 p-2'>
                                    <Label htmlFor='role' className='font-bold' value='Rol' />
                                    <TextInput
                                        htmlFor='role'
                                        name='role'
                                        type='text'
                                        placeholder='Rol'
                                    />
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
                                    />
                                </div>
                                <div className='w-1/2 p-2'>
                                    <Label htmlFor='confirm' className='font-bold' value='Confirmar Contraseña' />
                                    <TextInput
                                        htmlFor='confirm'
                                        name='confirm'
                                        type='password'
                                        placeholder='******'
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
                                    />
                                </div>
                                <div className='w-1/2 p-2'>
                                    <Label htmlFor='surname' className='font-bold' value='Apellido Paterno' />
                                    <TextInput
                                        htmlFor='surname'
                                        name='surname'
                                        type='text'
                                        placeholder='Barrera'
                                    />
                                </div>
                                <div className='w-1/2 p-2'>
                                    <Label htmlFor='lastname' className='font-bold' value='Apellido Materno' />
                                    <TextInput
                                        htmlFor='lastname'
                                        name='lastname'
                                        type='text'
                                        placeholder='Ocampo'
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
                                    />
                                </div>
                                <div className='w-1/2 p-2'>
                                    <Label htmlFor='matricula' className='font-bold' value='Matricula' />
                                    <TextInput
                                        htmlFor='matricula'
                                        name='matricula'
                                        type='text'
                                        placeholder='202xyzw'
                                    />
                                </div>
                            </div>
                        </Card>

                    </div>
                    <div className='flex flex-col gap-3 py-3'>
                        <Button pill outline color='success' type="submit" >Registrar</Button>
                    </div>
                    </form>
                </Modal.Body>
                <Modal.Footer className='justify-between'>
                    <Button pill outline color='failure' onClick={() => setOpenModal(false)}>Salir</Button>
                </Modal.Footer>

            </Modal>
        </div>
  )
}

export default ModalCreate