import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faArrowRight, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Sidebar, Badge, Card, Button, TextInput } from "flowbite-react";
import AxiosCliente from '../../../config/htpp-gateway/http-client';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";


const CalificacionesList = () => {
    const navigate = useNavigate();
    const calificacion = 10;
    const location = useLocation();
    const { examenId } = location.state;
    const [calificaciones, setCalificaciones] = useState([]);
    const [loading, setLoading] = useState(false);

    const getCalificaciones = async () => {
        try {
            setLoading(true);
            const response = await AxiosCliente({
                url: "/usuarioexamen/",
                method: "GET",
            });
            if (!response.error) {
                setCalificaciones(response.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCalificaciones();
        console.log(calificaciones);
    }, []);

    const handleInputChange = (e, cali) => {
        const newCali = e.target.value;
        updateCalificacion(cali, newCali);
    }

    const verExamen = (examenData, user) => {
        navigate("/verexamen", { state: { examenData, user } });
    }
    const userD = true;

    const updateCalificacion = async (cali, newCali) => {
        try {
            const response = await AxiosCliente({
                url: `/usuarioexamen/`,
                method: "PUT",
                data: {
                    id:cali.id,
                    respondido: cali.respondido,
                    calificacion: newCali,
                    usuario:{id: cali.usuario.id},
                    examen: {id: cali.examen.id}
                },
            });
            console.log("response",response);
            if (response.status === 'OK') {
                // Actualizar el estado calificaciones después de la solicitud PUT
                setCalificaciones(prevCalificaciones => {
                    const updatedCalificaciones = prevCalificaciones.map(item => {
                        if (item.id === cali.id) {
                            return { ...item, calificacion: newCali };
                        }
                        return item;
                    });
                    return updatedCalificaciones;
                });
                getCalificaciones();
            }
        } catch (error) {
            console.log(error);
        }
     }
    return (
        <div className='flex'>
            <aside>
                <h1 style={{ color: '#0C7489', fontSize: 24 }}>
                    Calificaciones
                </h1>
                {calificaciones
                    .filter((cali) => {
                        return cali;
                    })
                    .map((cali, index) => {
                        console.log(cali);
                        const examenAId = cali.examen.id.toString().toLowerCase();
                        const esta = examenId.toString().toLowerCase();;
                        console.log(examenAId);
                        console.log(esta);
                        if (examenAId === esta) {
                            return (
                                <div className="bg-white p-4 rounded shadow">
                                    <div className="my-3 bg-gray-200 p-3 rounded">
                                        <p className="text-primary text-center mb-2">{cali.usuario.person.name} {cali.usuario.person.surname} {cali.usuario.person.lastname}</p>
                                    </div>
                                    <div className="my-3 bg-primary text-gray-200 p-3 rounded" style={{ background: '#13505B', color: 'white' }}>
                                        <p className="text-center mb-0">Calificación :
                                            <input
                                                type="number"
                                                min={0} max={10}
                                                placeholder={cali.calificacion}
                                                onChange={(e) => handleInputChange(e, cali)}
                                                className='w-16'
                                                style={{color: 'black'}}
                                            />
                                            /10
                                        </p>                                    </div>
                                </div>

                            );
                        } else {
                            console.log("No es de esta examen");
                        }
                    })
                }
            </aside>

            <main className="flex-1">
                <h1 style={{ color: '#0C7489', fontSize: 24 }}>
                    Exámenes
                </h1>
                <div className='flex flex-wrap mt-4 mx-5 mr-3 p-4 border-b border-gray-700 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 h-full justify-evenly' style={{ backgroundColor: '#D9D9D9' }}>
                    {calificaciones
                        .filter((cali) => {
                            return cali;
                        })
                        .map((cali, index) => {
                            console.log(cali);
                            const examenAId = cali.examen.id.toString().toLowerCase();
                            const esta = examenId.toString().toLowerCase();;
                            console.log(examenAId);
                            console.log(esta);
                            if (examenAId === esta) {
                                return (

                                    <Card className="mx-auto mb-5 p-4 flex-grow border h-fit">
                                        <div className='d-flex align-items-center justify-content-center mb-6'>
                                            <h1 style={{ fontSize: '20px' }} >Calificación : {cali.calificacion}</h1>
                                            <Button pill outline color='light' className="mx-2" onClick={() => verExamen(cali, userD)}>
                                                <FontAwesomeIcon icon={faPencil} style={{ color: '#13505B' }} />
                                            </Button>
                                        </div>
                                        <div className='d-flex align-items-center justify-content-center'>
                                            <h1 style={{ fontSize: '20px' }} >{cali.usuario.person.name} {cali.usuario.person.surname} {cali.usuario.person.lastname}</h1>
                                        </div>
                                    </Card>

                                );
                            } else {
                                console.log("No es de esta examen");
                            }
                        })
                    }
                </div>
            </main>
        </div>
    )
}

export default CalificacionesList