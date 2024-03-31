import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faArrowRight, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Sidebar, Badge, Card, Button } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";


const CalificacionesList = () => {
    const calificacion=10;
    const location = useLocation();
    const { examenId } = location.state;
    return (
        <div className='flex'>
            <aside>
                <h1 style={{ color: '#0C7489', fontSize: 24 }}>
                    Calificaciones
                </h1>
                <div className="bg-white p-4 rounded shadow">
                    <div className="my-3 bg-gray-200 p-3 rounded">
                        <p className="text-primary text-center mb-2">Víctor Barrera Ocampo</p>
                    </div>
                    <div className="my-3 bg-primary text-gray-200 p-3 rounded" style={{ background: '#13505B', color: 'white'}}>
                        <p className="text-center mb-0">Calificación : {calificacion}/10</p>
                    </div>
                </div>
            </aside>

            <main className="flex-1">
                <div className='flex flex-wrap mt-4 mx-5 mr-3 p-4 border-b border-gray-700 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 h-full justify-evenly' style={{ backgroundColor: '#D9D9D9' }}>
                    <Card className="mx-auto mb-5 p-4 flex-grow border h-fit">
                    <div className='d-flex align-items-center justify-content-center mb-6'>
                            <h1 style={{ fontSize: '20px' }} >Calificación:{calificacion}</h1>
                            <Button pill outline color='light' className="mx-2" >
                                <FontAwesomeIcon icon={faPencil} style={{ color: '#13505B' }} />
                            </Button>
                        </div>
                        <div className='d-flex align-items-center justify-content-center'>
                            <h1 style={{ fontSize: '20px' }} >Víctor Barrera Ocampo</h1>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    )
}

export default CalificacionesList