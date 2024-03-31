import React, { useEffect, useMemo } from 'react'
import { Badge, Button, Card, Label, TextInput, Modal } from 'flowbite-react';
import { useState } from 'react';
import AxiosCliente from '../../config/htpp-gateway/http-client';
import TableComponent from '../../components/admin/TableComponent';
import { AiFillEdit, AiFillDelete, AiOutlineDoubleLeft } from "react-icons/ai";
import { FaSearch, FaPlus } from "react-icons/fa";
import ModalCreate from '../../components/admin/ModalCreate';
import ModalUpdate from '../../components/admin/ModalUpdate';
import { customAlert, confirmAlert } from '../../config/alert/alert'


const UsersList = () => {
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalUp, setOpenModalUp] = useState(false);
    const [users, setUsers] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [userData, setUserData] = useState(null);
    const columns = useMemo(() => [
        {
            name: "#",
            cell: (row, index) => <>{index + 1}</>,
            sortable: true,
            selector: (row, index) => index + 1,
        },
        {
            name: "Rol",
            cell: (row, index) => <>{row.role.name}</>,
            sortable: true,
            selector: (row, index) => row.role.name,
        },
        {
            name: "Nombre",
            cell: (row, index) => <>{row.person.name}</>,
            sortable: true,
            selector: (row, index) => row.person.name,
        },
        {
            name: "Apellido",
            cell: (row, index) => <>{row.person.surname}</>,
            sortable: true,
            selector: (row, index) => row.person.surname,
        },
        {
            name: "Correo electrónico",
            cell: (row, index) => <>{row.email}</>,
            sortable: true,
            selector: (row, index) => row.email,
        },
        {
            name: "Matricula",
            cell: (row, index) => <>{row.person.matricula}</>,
            sortable: true,
            selector: (row, index) => row.person.matricula,
        },
        {
            name: "CURP",
            cell: (row, index) => <>{row.person.curp}</>,
            sortable: true,
            selector: (row, index) => row.person.curp,
        },
        {
            name: "Acciones",
            cell: (row) => (
                <>
                    <Button outline size={'sm'} pill color='warning' onClick={() => goUpdate(row)}>
                        {<AiFillEdit />}
                    </Button>
                    <Button outline size={'sm'} pill color={row.status ? 'failure' : 'success'} onClick={() => deleteUsers(row.id)}>
                        {row.status ? <AiFillDelete /> : <AiOutlineDoubleLeft />}
                    </Button>
                </>
            ),
        },
    ]);

    const goUpdate = (data) => {
        console.log(data);
        setOpenModalUp(true);
        setUserData(data);
    }

    const deleteUsers = (id) => {
        confirmAlert(async () => {
            console.log(id);
            try {
                const response = await AxiosCliente({
                    method: 'DELETE',
                    url: '/usuario/deleteUser/' + id
                });
                console.log("Respuesta del servidor:", response);
                if (response.status === 'OK') {
                    customAlert("Éxito", "Usuario eliminado", "success")
                    getUsers();
                }
                return response;
            } catch (error) {
                customAlert("Error", "Ocurrió un error al eliminar al usuario", "error")
            } finally {
                getUsers();
            }
        })
    }

    const getUsers = async () => {
        try {
            setLoading(true);
            const response = await AxiosCliente({
                url: "/usuario/",
                method: "GET",
            });
            console.log(response);
            if (!response.error) {
                setUsers(response.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const filter = () => {
        return users.filter(user => user.person.name.includes(filterText));
    }

    return (
        <>
            <section className='flex flex-col pt-4 px-3 gap-4'>
                <p className='text-2xl'>Usuarios</p>
                <div className='flex w-full justify-between'>
                    <div className='max-w-md'>
                        <Label htmlFor='search' value="Buscador" />
                        <TextInput id="search" type="text" rightIcon={FaSearch}
                            placeholder="Buscar..." required onChange={(e) => setFilterText(e.target.value)} value={filterText} />

                    </div>
                    <div className='justify-center'>
                        <Button pill outline color='success' onClick={() => setOpenModal(true)}> <FaPlus /> </Button>
                        <ModalCreate openModal={openModal} getAllUsers={getUsers} setOpenModal={setOpenModal} />
                    </div>
                </div>
                <Card>
                    <TableComponent columns={columns} data={filter()} progress={loading} />
                </Card>
            </section>
            {openModalUp && <ModalUpdate data={userData} openModalUp={openModalUp} setOpenModalUp={setOpenModalUp} getAllUsers={getUsers}/>}
        </>
    )
}

export default UsersList