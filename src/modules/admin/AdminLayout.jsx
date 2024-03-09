import { Navbar } from 'flowbite-react';
import React from 'react'
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards, HiArrowNarrowRight, HiCalendar, } from 'react-icons/hi';
import { FaUserCircle } from "react-icons/fa";
import { Outlet, Link } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <>
            <header>
                <Navbar fluid style={{backgroundColor:'#0C7489'}}>
                    <Navbar.Brand>
                        <FaUserCircle size={24} color='white' className='mr-2'/>
                        <span className="self-center whitespace-nowrap text-xl font-semibold text-white">SIGEU - Administrador</span>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar>
            </header>
            <div className='flex'>
                <main className='w-full'>
                    <section className='px-4 pt-2 pb-6'>
                        <Outlet />
                    </section>
                </main>
            </div>
        </>
    )
}

export default AdminLayout