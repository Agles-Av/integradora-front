import { Card, TextInput, Label, Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { BiSolidSquareRounded } from "react-icons/bi";
import AxiosCliente from '../../config/htpp-gateway/http-client';
import { SketchPicker, BlockPicker } from 'react-color';
import { customAlert, confirmAlert } from '../../config/alert/alert';
import { useFormik } from 'formik';
import * as yup from 'yup'


const SystemEdit = () => {
    const [loading, setLoading] = useState(false);
    const [colors, setColors] = useState([{ color1: '', color2: '', color3: '' }]);
    const [logo, setLogo] = useState('');

    const getColors = async () => {
        try {
            setLoading(true);
            const response = await AxiosCliente({
                url: "/publico/sistema/",
                method: "GET",
            });
            if (response.status === 'OK') {
                console.log(response);
                setColors(response.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getColors();
        getLogo();
        console.log("colores", colors);
    }, []);
    const color1 = colors[0].color1;
    const color2 = colors[0].color2;
    const color3 = colors[0].color3;

    const handleColorChange = (color, name) => {
        setColors(prevColors => ({
            ...prevColors,
            [0]: {
                ...prevColors[0],
                [name]: color.hex
            }
        }));
    };
    

    const formik = useFormik({
        initialValues: {
            id: 1,
            logo: "",
        },
        onSubmit: async (values, { setSubmitting }) => {
            const payload = {
                id:values.id,
                logo:values.logo
            }
            console.log("Este es el payload",payload);
            confirmAlert(async () => {
                try {
                    //values -> person { user: {}}
                    const response = await AxiosCliente({
                        method: 'PUT',
                        url: '/publico/logo/',
                        data: payload
                    });
            
                        customAlert("Éxito", "Logo actualizado correctamente", "success")
                        getLogo();
              
                    return response;
                } catch (error) {
                    customAlert("Error", "Ocurrió un error al actualizar el usuario", "error")
                } finally {
                    setSubmitting(false)
                }
            })
        }
    });

    const handleChangeAvatar = (event) => {
        const files = event.target.files;
        if (files.length > 0 && files.length < 4)
            for (const file of files) {
                const reader = new FileReader();
                reader.onloadend = (data) => {
                    console.log(data);
                    formik.setFieldValue('logo', data.target.result)
                    formik.setFieldTouched('logo', true)
                }
                reader.readAsDataURL(file);
            }
    }

    const getLogo = async () => {
        try {
            setLoading(true);
            const response = await AxiosCliente({
                url: "/publico/logo/",
                method: "GET",
            });
            if (response.status === 'OK') {
                console.log(response);
                setLogo(response.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const updateColors = async () => {
        try {
            setLoading(true);
            const payload = {
                id: 1,
                color1: colors[0].color1,
                color2: colors[0].color2,
                color3: colors[0].color3
            }
            console.log(payload);
            const response = await AxiosCliente({
                method: 'PUT',
                url: '/publico/sistema/',
                data: payload
            });
            if (response.status === 'OK') {
                console.log(response);
                getColors();
                customAlert("Éxito", "Colores actualizados correctamente", "success");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    const handleAgregarClick = async () => {
        await updateColors();
    }

    console.log("logo",logo);
    const logoO = logo ? logo[0].logo : null;

    return (
        <div className='flex justify-center grid'>
            <section className='container'>
                <div className='flex flex-col gap-3 py-3 h-screen  justify-content-center w-full'>
                    <div className='flex flex-col  justify-center items-center p-4 border rounded-md my-5 mx-6 pt-5 w-full' style={{ backgroundColor: '#DfDfDf' }}
                    >
                        <Card
                            className="max-w-sm"
                            imgAlt="Meaningful alt text for an image that is not purely decorative"
                            imgSrc={logoO ? (logoO):null}
                        ></Card>
                        <div className='w-full flex'>
                            <Label htmlFor='logo' className='font-bold' value='Logo' style={{ fontSize: 18 }} />
                            <div className='flex gap-4 px-4 p-4 my-5 mx-6 pt-5 w-full items-center'>
                                <TextInput
                                    htmlFor='logo'
                                    name='logo'
                                    type='file'
                                    placeholder='******'
                                    onChange={(e) => handleChangeAvatar(e)}
                                />
                                <div>
                                <Button onClick={formik.handleSubmit} pill outline color='info'>Actualizar Logo</Button>

                                </div>
                            </div>
                        </div>

                        <div className='w-full flex justify-center'>
                            <div className=' grid justify-center '>
                                <div>
                                    <Label htmlFor='color' className='font-bold' value='Colores' style={{ fontSize: 18 }} />
                                </div>
                                <div className='flex gap-4 px-4 p-4 border rounded-md my-5 mx-6 pt-5 w-full justify-center' style={{ backgroundColor: 'white' }}>
                                    <SketchPicker
                                        name='color1'
                                        color={colors[0].color1}
                                        onChange={(color) => handleColorChange(color, 'color1')}
                                    />
                                    <SketchPicker
                                        name='color2'
                                        color={colors[0].color2}
                                        onChange={(color) => handleColorChange(color, 'color2')}
                                    />
                                    <SketchPicker
                                        name='color3'
                                        color={colors[0].color3}
                                        onChange={(color) => handleColorChange(color, 'color3')}
                                    />
                                    <Card className='max-w-sm' style={{ background: color2 }}>
                                        <h5 className="mb-4 text-xl font-medium" style={{ color: 'white' }}>Nueva paléta de colores</h5>
                                        <div style={{ background: color1 }}>
                                            a
                                        </div>
                                        <div style={{ background: color3 }}>
                                            b
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                        <Button onClick={handleAgregarClick} pill outline color='info'>Actualizar Colores</Button>
                    </div>

                </div>



            </section>
        </div>
    )
}

export default SystemEdit