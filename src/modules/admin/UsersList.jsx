import React, { useEffect, useMemo } from 'react'
import { Badge, Button, Card, Label, TextInput, Modal } from 'flowbite-react';
import { useState } from 'react';
import AxiosCliente from '../../config/htpp-gateway/http-client';
import TableComponent from '../../components/admin/TableComponent';
import { AiFillEdit, AiFillDelete, AiOutlineDoubleLeft } from "react-icons/ai";
import { FaSearch, FaPlus } from "react-icons/fa";


const UsersList = () => {
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [filterText, setFilterText] = useState("");
    const columns = useMemo(() => [
        {
            name: "#",
            cell: (row, index) => <>{index + 1}</>,
            sortable: true,
            selector: (row, index) => index + 1,
        },
        {
            name: "Nombre",
            cell: (row, index) => <>{row.name}</>,
            sortable: true,
            selector: (row, index) => row.name,
        },
        {
            name: "Primer apellido",
            cell: (row, index) => <>{row.surname}</>,
            sortable: true,
            selector: (row, index) => row.surname,
        },
        {
            name: "Segundo apellido",
            cell: (row, index) => <>{row.lastname}</>,
            sortable: true,
            selector: (row, index) => row.lastname,
        },
        {
            name: "Matricula",
            cell: (row, index) => <>{row.matricula}</>,
            sortable: true,
            selector: (row, index) => row.matricula,
        },
        {
            name: "CURP",
            cell: (row, index) => <>{row.curp}</>,
            sortable: true,
            selector: (row, index) => row.curp,
        },
        {
            name: "Acciones",
            cell: (row) => (
                <>
                    <Button outline size={'sm'} pill color='warning'>
                        {<AiFillEdit />}
                    </Button>
                    <Button outline size={'sm'} pill color={row.status ? 'failure' : 'success'}>
                        {row.status ? <AiFillDelete /> : <AiOutlineDoubleLeft />}
                    </Button>
                </>
            ),
        },
    ])

    const getUsers = async () => {
        try {
            setLoading(true);
            const response = await AxiosCliente({
                url: "/person/",
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
        return users.filter(user => user.name.includes(filterText));
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
                        <Button pill outline color='success' onClick={()=> setOpenModal(true)}> <FaPlus/> </Button>
                    </div>
                </div>
                <Card>
                    <TableComponent columns={columns} data={filter()} progress={loading}/>
                </Card>
            </section>
        </>
    )
}

export default UsersList