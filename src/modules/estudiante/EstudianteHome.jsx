import React from 'react'

function EstudianteHome() {
  return (
    <div>
      <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
    <nav style={{ marginBottom: '20px', backgroundColor: '#0C7489', padding: '10px', borderRadius: '5px' }}>
      <div style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }} />
        <span style={{ fontWeight: 'bold' }}>Cristian Roberto Saldaña Ortiz</span>
      </div>
    </nav>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flex: '1', marginRight: '20px' }}>
        <h2 style={{ marginBottom: '20px', color: '#0C7489' }}>Listado de Clases</h2>
        <ul>
          {[
            'Integradora II',
            'Inglés V',
            'Tutoría Grupal',
            'Aplicación de IoT',
            'Desarrollo Móvil Multiplataforma',
            'Aplicaciones Web para 14.0',
            'Base de Datos para Cómputo en la Nube'
          ].map((clase, index) => (
            <li key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', backgroundColor: '#D9D9D9', padding: '10px', borderRadius: '5px' }}>
              <div>
                <strong>{clase.length > 14 ? clase.substring(0, 14) + '...' : clase}</strong> - Fecha del examen: 01/02/2024 - Calificación: 85%
              </div>
              <p style={{ marginBottom: '0', color: '#0C7489', cursor: 'pointer' }}>Ver más</p>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flex: '1' }}>
        <div style={{ border: '1px solid #0C7489', padding: '20px', borderRadius: '10px', backgroundColor: 'white' }}>
          <h2 style={{ marginBottom: '20px', color: '#0C7489' }}>Código del Examen</h2>
          <p style={{ marginBottom: '10px', color: '#666' }}>Pidele a tu profesor el código de examen e introdúcelo:</p>
          <input type="text" placeholder="Código de examen" style={{ marginRight: '10px', padding: '10px', border: '1px solid #0C7489', borderRadius: '5px', width: '70%' }} />
          <button style={{ backgroundColor: '#0C7489', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>Acceder</button>
        </div>
      </div>
    </div>
  </div>
  </div>
  )
}

export default EstudianteHome