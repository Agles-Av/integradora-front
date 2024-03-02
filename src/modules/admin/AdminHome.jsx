import React from 'react'
import { HiUsers } from 'react-icons/hi';
import { Card, Button } from 'flowbite-react';
import { FaGear, FaUsers } from "react-icons/fa6";

function AdminHome() {
  return (
    <div>
      <div className='flex flex-col px-6 pt-4'>
          <p className='text-2xl' style={{ color: '#0C7489' }}>¿Qué vas a gestionar hoy?</p>
      </div>
      <section className="flex flex-col p-8 ">
        <div className='flex border-b border-gray-700 bg-gray-50 dark:border-gray-600 dark:bg-gray-700' style={{ backgroundColor: '#D9D9D9' }}>
          <div className="mx-auto flex items-center">

            <div className='p-6'>
              <Card
                className="max-w-sm"
                href="#"
                style={{ borderColor: '#0C7489'}}
              >
              <div className='flex justify-center items-center'>
                <FaUsers size={350} style={{ color: '0C7489' }} />
              </div>
                <div className='flex justify-between items-center'>
                  <h5 className='text-xl' style={{ color: '#0C7489' }}>Usuarios</h5>
                  <svg className="-mr-1 ml-2 h-4 w-4" fill="#0C7489" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </Card>
            </div>

            <div className='p-6'>
              <Card
                className="max-w-sm"
                href="#"
                style={{ borderColor: '#0C7489'}}
              >
                <div className='flex justify-center items-center'>
                  <FaGear size={350} style={{ color: '0C7489' }}  />
                </div>
                <div className='flex justify-between items-center'>
                  <h5 className='text-xl' style={{ color: '#0C7489' }}>Sistema</h5>
                  <svg className="-mr-1 ml-2 h-4 w-4" fill="#0C7489" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </Card>
            </div>


          </div>
        </div>
      </section>
    </div>
  )
}

export default AdminHome
