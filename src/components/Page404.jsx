import React from 'react'

const Page404 = () => {

const styles = {
  container2: {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      fontFamily: 'Poppins, sans-serif',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: '#22232e'
  },
  a: {
      textDecoration: 'none'
  },
  ul: {
      listStyle: 'disc',
      color: '#e0ffff'
  },
  section: {
      width: '100%'
  },
  container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      columnGap: '20px'
  },
  image: {
      width: '420px'
  },
  text: {
      display: 'block',
      padding: '40px 40px',
      width: '450px'
  },
  h1: {
      color: '#00c2cb',
      fontSize: '35px',
      fontWeight: 700,
      marginBottom: '15px'
  },
  p: {
      fontSize: '15px',
      color: '#e0ffff',
      marginBottom: '15px',
      lineHeight: '1.5rem',
      marginBottom: '15px'
  },
  menu: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '15px',
      marginLeft: '30px'
  },
  resultBox: {
      width: '85%'
  },
  resultBoxUl: {
      borderTop: '2px solid #42455a',
      padding: '10px 5px',
      background: '#fff'
  },
  resultBoxUlLi: {
      listStyle: 'none',
      borderRadius: '3px',
      padding: '10px 5px',
      cursor: 'pointer',
      color: '#22232e'
  },
  resultBoxUlLiHover: {
      backgroundColor: '#e0ffff'
  },
  resultBox: {
      maxHeight: '100px',
      overflow: 'scroll',
      borderRadius: '0px 0px 5px 5px'
  },
  resultBoxLiA: {
      color: '#22232e'
  },
  resultBoxLiFocusA: {
      color: '#e0ffff'
  }
};
return (
  <body>
      <section style={styles.section}>
          <div style={styles.container2}>
              <div style={styles.container}>
                  <div style={styles.text}>
                      <h1 style={styles.h1}>Pagina no encontrada</h1>
                      <p style={styles.p}>Parece que no podemos encontrar la página que estás buscando. Por favor revise la URL.</p>
                      <ul style={styles.menu}>
                          <li><a style={styles.a} href="#">Ir a la página de inicio</a></li>
                      </ul>
                  </div>
                  <div><img style={styles.image} src="https://omjsblog.files.wordpress.com/2023/07/errorimg.png" alt="" /></div>
              </div>
          </div>
      </section>
  </body>
);
}

export default Page404