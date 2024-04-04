import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Badge, Banner } from 'flowbite-react';
import { faPencil, faArrowRight, faPaperPlane, faBriefcaseClock, faLocationArrow, faUsers } from '@fortawesome/free-solid-svg-icons';
import { HiMiniClipboardDocumentList } from "react-icons/hi2";
import { FaRegCopy, FaSearch, FaPlus } from "react-icons/fa";
import ModalCreateExam from '../../../components/docente/ModalCreateExam';
import AxiosCliente from '../../../config/htpp-gateway/http-client';
import { useNavigate } from 'react-router-dom';
import { HiX } from "react-icons/hi";
import { MdAnnouncement } from "react-icons/md";
import { customAlert, confirmAlert } from '../../../config/alert/alert';

const ExamenesList = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [copiedText, setCopiedText] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [dataClass, setDataClass] = useState(null);
    const [examenes, setExamenes] = useState([]);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopiedText(text);
                console.log(`"${text}" ha sido copiado al portapapeles.`);
            })
            .catch((error) => {
                console.error('Error al copiar al portapapeles:', error);
            });
    };
    const [filterText, setFilterText] = useState("");

    const location = useLocation();
    const { data } = location.state;

    const dataExamenPrueba = [
        {
            title: "ReactJs U1",
            description: "MAndar datos en forma de props a otro componente",
            clase: {
                id: 1
            },
            examen: {
                id: 1
            },
            codigo: "POIU",
        },
        {
            title: "ReactJs U2",
            description: "MAndar datos en forma de props a otro componente",
            clase: {
                id: 1
            },
            examen: {
                id: 2
            },
            codigo: "KSJS",
        },
        {
            title: "ReactJs U3",
            description: "MAndar datos en forma de props a otro componente",
            clase: {
                id: 1
            },
            examen: {
                id: 3
            },
            codigo: "ABVC",
        },
        {
            title: "Física U1",
            description: "MAndar datos en forma de props a otro componente",
            clase: {
                id: 1
            },
            examen: {
                id: 4
            },
            codigo: "SHGF",
        },
    ]

    const getExams = async () => {
        try {
            setLoading(true);
            const response = await AxiosCliente({
                url: "/examen/",
                method: "GET",
            });
            if (!response.error) {
                setExamenes(response.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getExams();
    }, []);
    
    const handleCardClick = (dataClass) => {
        navigate("/crearExamen", { state: { dataClass } });
      }

      const irAEditar = (examenId) =>{
        navigate("/editarExamen", { state: { examenId } });
      }

      

const changeStatus = async (examData,statusData) => {
    try {
        const response = await AxiosCliente({
            method: 'PUT',
            url: `/estadoE/changeStatus/${examData}/${statusData}`,
        });
        if (response.status === 'OK') {
            customAlert("Éxito", "Estado cambiado", "success");
            getExams();
        }
        return response;
    } catch (error) {
        console.log(error);
        customAlert("Error", "Ocurrió un error al activar el exámen", "error")
        getExams();
    }
};
const goCalificar = (examenId) => {
    navigate("/calificaciones", { state: { examenId } });
};

    return (
        <div className='flex justify-center'>
            <div className='container max-w-6xl'>
                <div className="py-4 border rounded-md my-5 mx-6 pt-5 w-full" style={{ backgroundColor: '#D9D9D9', borderColor: '#13505B' }}>
                    <div className="grid grid-cols-2 gap-4 ">
                        <div className="flex justify-stretch items-end w-full h-36 pt-5 px-6 " style={{ color: "#13505B" }}>
                            <h1 className="text-xl text-center" style={{ fontSize: '28px' }}>{data.name}</h1>
                        </div>
                    </div>
                </div>
                    <div className='flex justify-end py-2'>
                        <Button pill outline color='success' onClick={() => handleCardClick(data)}> <FaPlus /> </Button>
                    </div>
                    <div>
                        
            <Banner>
                <div className="flex w-full justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
                    <div className="mx-auto flex items-center">
                        <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
                            <MdAnnouncement className="mr-4 h-4 w-4" />
                            <span className="[&_p]:inline">
                                Puede seleccionar un examen para editarlo o ver los resultados según sea su estado. Presione el botón "+" para crear un nuevo examen.
                            </span>
                        </p>
                    </div>
                    <Banner.CollapseButton color="gray" className="border-0 bg-transparent text-gray-500 dark:text-gray-400">
                        <HiX className="h-4 w-4" />
                    </Banner.CollapseButton>
                </div>
            </Banner>
                    </div>

                {examenes
                    .filter((examen) => {
                        return examen.title.toLowerCase().includes(filterText.toLowerCase());
                    })
                    .map((examen, index) => {
                        console.log(examen);
                        const claseId = examen.clase.id.toString().toLowerCase();
                        const esta = data.id.toString().toLowerCase();
                        if (claseId === esta) {
                            const badge = examen.examen.id === 1 ? (
                                <div className="flex justify-around gap-2 items-center">
                                    <Badge className="bg-blue-600 text-blue-600 rounded-full">&nbsp;</Badge>
                                    <p className="text-lg text-white">Listo para verificar</p>
                                </div>
                            ) : examen.examen.id === 2 ? (
                                <div className="flex justify-around gap-2 items-center">
                                    <Badge className="bg-yellow-400 rounded-full">&nbsp;</Badge>
                                    <p className="text-lg text-white">Pendiente</p>
                                </div>
                            ) : examen.examen.id === 3 ? (
                                <div className="flex justify-around gap-2 items-center">
                                    <Badge className="bg-red-600 text-red-600 rounded-full">&nbsp;</Badge>
                                    <p className="text-lg text-white">No publicado</p>
                                </div>
                            ) : examen.examen.id === 4 ? (
                                <div className="flex justify-around gap-2 items-center">
                                    <Badge className="bg-green-600 rounded-full">&nbsp;</Badge>
                                    <p className="text-lg text-white">Activo</p>
                                </div>
                            ) : null;


                            const code = examen.examen.id === 4 ? (
                                <Card className="py-4 h-20 flex justify-center tems-center" style={{ backgroundColor: '#119DA4' }}>
                                    <div className="flex gap-4 items-center" onClick={() => copyToClipboard(examen.codigo)}>
                                        <FaRegCopy size={28} style={{ color: 'black', cursor: 'pointer'  }} />
                                        <p className="text-xl text-white">{examen.code}</p>
                                    </div>
                                </Card>
                            ) : null;

                            const options = examen.examen.id === 1 ? (
                                <div className="flex justify-around items-center">
                                    <Button pill outline color='light' className="mr-2">
                                        <FontAwesomeIcon icon={faUsers} onClick={() => goCalificar(examen.id)} className="text-3xl text-blue-600" />
                                    </Button>
                                    <div className="flex justify-around items-center">
                                <Button pill outline color='light' className="mr-2">
                                    {/*Activar Examen*/}
                                    <FontAwesomeIcon icon={faPaperPlane} onClick={() => changeStatus(examen.id,4)} className="text-3xl text-blue-600" />
                                </Button>
                                </div>
                                </div>
                            ): examen.examen.id === 2 ? (
                                <div className="flex justify-around items-center">
                                    <Button pill outline color='light' className="mr-2">
                                        <FontAwesomeIcon icon={faPencil} onClick={() => irAEditar(examen.id)} className="text-3xl text-blue-600" />
                                    </Button>
                                </div>
                            ): examen.examen.id === 3 ? (
                                <div className="flex justify-around items-center">
                                <Button pill outline color='light' className="mr-2">
                                    {/*Activar Examen*/}
                                    <FontAwesomeIcon icon={faPaperPlane} onClick={() => changeStatus(examen.id,4)} className="text-3xl text-blue-600" />
                                </Button>
                                    <Button pill outline color='light' className="mr-2">
                                        <FontAwesomeIcon icon={faPencil} onClick={() => irAEditar(examen.id)} className="text-3xl text-blue-600" />
                                    </Button>
                                </div>
                            ): examen.examen.id === 4 ? (
                                <div className="flex justify-around items-center">
                                <Button pill outline color='light' className="mr-2">
                                    {/*Desactivar Examen*/}
                                    <FontAwesomeIcon icon={faPaperPlane} onClick={() => changeStatus(examen.id,1)} className="text-3xl text-blue-600" />
                                </Button>
                                </div>
                            ): null;

                            return (
                                <div className='flex'>
                                    <Card className="py-4 h-20 w-full" style={{ backgroundColor: '#119DA4' }}>
                                        <div className="flex justify-between w-full">
                                            <div className="flex gap-4 items-center">
                                                <HiMiniClipboardDocumentList size={28} />
                                                <p className="text-xl text-white">{examen.title}</p>
                                            </div>
                                            {badge}
                                            {options}
                                        </div>
                                    </Card>
                                    {code}
                                </div>

                            );
                        } else {
                            console.log("No es de esta clase");
                        }
                    })
                }
            </div>

        </div>
    )
}

export default ExamenesList