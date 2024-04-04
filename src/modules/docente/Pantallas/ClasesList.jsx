import React, { useEffect, useState } from 'react'
import { Card, Button, Banner } from 'flowbite-react'; // Importamos los componentes de Flowbite
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importamos FontAwesome para los iconos
import { faPencil, faArrowRight, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import AxiosCliente from '../../../config/htpp-gateway/http-client';
import ModalCreateClass from '../../../components/docente/ModalCreateClass';
import { customAlert, confirmAlert } from '../../../config/alert/alert'
import ModalUpdateClass from '../../../components/docente/ModalUpdateClass';
import { useNavigate } from 'react-router-dom';
import { HiX } from "react-icons/hi";
import { MdAnnouncement } from "react-icons/md";
import { getColorsFromServer } from '../../../config/colors/colorService';

const ClasesList = () => {
    const [colors, setColors] = useState([]);
  
    useEffect(() => {
      const fetchColors = async () => {
        const colorsData = await getColorsFromServer();
        if (colorsData) {
          setColors(colorsData);
        }
      };
  
      fetchColors();
    }, []);
    
    console.log("colors", colors);
    const navigate = useNavigate();
    const [filterText, setFilterText] = useState("");
    const [idDoc, setIdDoc] = useState(localStorage.getItem('idDocente'));
    const [clases, setClases] = useState([]);
    const [openCreate, setOpenCreate] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [classData, setClassData] = useState(null);
    const [dataClass, setDataClass] = useState([]);
    console.log(idDoc);

    const getClases = async () => {
        try {
            const response = await AxiosCliente({
                method: 'GET',
                url: '/clase/',
            })
            if (!response.error) {
                console.log(response.data);
                setClases(response.data);
            } else throw Error('Error');
        } catch (error) {
            console.log(error);
        }
    }

    const deleteClases = (id) => {
        confirmAlert(async () => {
            console.log("Se va a borrar al", id);
            try {
                const response = await AxiosCliente({
                    method: 'DELETE',
                    url: '/clase/' + id
                });
                console.log("Respuesta del servidor:", response);
                if (!response.error) {
                    customAlert("Éxito", "Clase eliminada", "success")
                    getClases();
                }
                return response;
            } catch (error) {
                customAlert("Error", "Ocurrió un error al eliminar la clase", "error")
            } finally {
            }
        })
    }

    useEffect(() => {
        getClases();
    }, []);


    const goUpdate = (data) => {
        console.log(data);
        setOpenUpdate(true);
        setClassData(data);
    }
    const handleCardClick = (data) => {
        navigate("/examenes", { state: { data } });
        setDataClass(data);
    }

    return (
        <div>
            <div className='my-5 mx-6 pt-5 p-4 rounded p-4 border-b dark:border-gray-600 dark:bg-gray-700 h-full justify-start flex w-full' style={{ backgroundColor: '#D9D9D9' }}>
                <div className='flex w-fit'>
                {clases
                    .filter((clase) => {
                        return clase.name.toLowerCase().includes(filterText.toLowerCase());
                    })
                    .map((clase, index) => {
                        const usuarioId = clase.usuario.id?.toString().toLowerCase();
                        const docenteId = idDoc?.toString().toLowerCase();
                        if (usuarioId === docenteId) {
                            return (
                                <Card key={index} className="mb-5 p-4 flex-grow border w-64 my-5 mx-6 pt-5 " style={{ backgroundColor: colors[0] && colors[0].color3}}>
                                    <div className='d-flex items-center justify-center h-20' style={{ backgroundColor: colors[0] && colors[0].color3, color: 'white', cursor: 'pointer'}} onClick={() => handleCardClick(clase)}>
                                        <h1 style={{ fontSize: '24px' }} >{clase.name}</h1>
                                    </div>
                                    <div className='flex justify-between w-full'>
                                        <Button pill outline color='warning' className="mx-2" onClick={() => goUpdate(clase)}>
                                            <FontAwesomeIcon icon={faPencil}/>
                                        </Button>
                                        <Button pill outline color='failure' className="mx-2" onClick={() => deleteClases(clase.id)}>
                                            <FontAwesomeIcon icon={faTrash}/>
                                        </Button>
                                    </div>
                                    {openUpdate && <ModalUpdateClass data={classData} openModalUp={openUpdate} setOpenModalUp={setOpenUpdate} getClasses={getClases}/>}
                                </Card>

                            );
                        } else {
                            console.log("No eres el docente de esta clase");
                        }
                    })
                }
                </div>

            </div>
            
            <Banner>
                <div className="flex w-full justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
                    <div className="mx-auto flex items-center">
                        <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
                            <MdAnnouncement className="mr-4 h-4 w-4" />
                            <span className="[&_p]:inline">
                                Bienvenido seleccione o haga una nueva clase presionando el botón de "+" para empezar a crear examenes
                            </span>
                        </p>
                    </div>
                    <Banner.CollapseButton color="gray" className="border-0 bg-transparent text-gray-500 dark:text-gray-400">
                        <HiX className="h-4 w-4" />
                    </Banner.CollapseButton>
                </div>
            </Banner>
            
            <div className='flex justify-end'>
                <Button pill outline color='success' onClick={() => setOpenCreate(true)}>
                    <FontAwesomeIcon icon={faPlus} />
                </Button>
                <ModalCreateClass openModal={openCreate} setOpenModal={setOpenCreate} getClasses={getClases} />
            </div>
        </div>

    )
}

export default ClasesList