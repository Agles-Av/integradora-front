import { Card, TextInput, Label, Button} from 'flowbite-react'
import React from 'react'
import { BiSolidSquareRounded } from "react-icons/bi";

const SystemEdit = () => {

    return (
        <div className='flex w-full h-screen'>
            <section className='flex flex-col gap-3 h-screen w-full items-center'>
                <div className='flex flex-col gap-3 py-3 h-screen  justify-content-center w-full'>
                    <Card className='flex flex-col  justify-center items-center w-full justify-center' style={{ backgroundColor: '#D9D9D9' }}
                        imgSrc='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY4LmAcV9_WdvlKaOSGCzpVKfnXI8BguKtY6bXrh6Nn8LGMcmKffgotUu9775u__N0-90&usqp=CAU'
                    >
                        <div className='w-full flex'>
                            <div className='w-full p-2'>
                                <Label htmlFor='logo' className='font-bold' value='Logo' style={{fontSize:18}}/>
                                <TextInput
                                    htmlFor='logo'
                                    name='logo'
                                    type='file'
                                    placeholder='******'
                                />
                            </div>
                        </div>
                        
                        <div className='w-full flex'>
                                <Label htmlFor='color' className='font-bold' value='Colores' style={{fontSize:18}}/>
                            </div>

                        <div className='w-full flex'>
                            <div className=' flex w-full'>
                                <div className=' flex w-full justify-between gap-4 px-4' style={{backgroundColor:'white'}}>
                                    <input
                                        htmlFor='password'
                                        name='color'
                                        type='color'
                                        placeholder='A'
                                    />
                                    <input
                                        htmlFor='password'
                                        name='password'
                                        type='color'
                                        placeholder='******'
                                    />
                                    <input
                                        htmlFor='password'
                                        name='password'
                                        type='color'
                                        placeholder='******'
                                    />
                                    <input
                                        htmlFor='password'
                                        name='password'
                                        type='color'
                                        placeholder='******'
                                    />
                                </div>
                            </div>
                        </div>
                            <Button href='#'>Agregar</Button>
                    </Card>

                </div>



            </section>
        </div>
    )
}

export default SystemEdit