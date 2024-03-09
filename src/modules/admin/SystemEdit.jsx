import { Card, TextInput, Label} from 'flowbite-react'
import React from 'react'
import { BiSolidSquareRounded } from "react-icons/bi";

const SystemEdit = () => {

    return (
        <div>
            <section className='flex items-center flex-col gap-3 py-3'>
                <div className='flex justify-center flex-col gap-3 py-3'>
                    <Card className='flex flex-col max-w-6xl items-center' size={'5xl'} style={{ backgroundColor: '#D9D9D9' }}>
                        <img rounded
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY4LmAcV9_WdvlKaOSGCzpVKfnXI8BguKtY6bXrh6Nn8LGMcmKffgotUu9775u__N0-90&usqp=CAU'
                            alt="kirbee" width={300} height={300} style={{borderRadius:150}}/>
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

                        <div className='w-full flex space-between'>
                            <div className=' flex w-full '>
                                <Label htmlFor='color' className='font-bold' value='Colores' style={{fontSize:18}}/>
                                <div className=' flex px-4' style={{backgroundColor:'white'}}>
                                    <input
                                        htmlFor='password'
                                        name='color'
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
                                    <input
                                        htmlFor='password'
                                        name='password'
                                        type='color'
                                        placeholder='******'
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>

                </div>



            </section>
        </div>
    )
}

export default SystemEdit