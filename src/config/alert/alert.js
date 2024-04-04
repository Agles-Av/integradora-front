import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Alertclient = withReactContent(Swal);

//Titulos y mensajaes definidos Succes | error | confirm
//alert error
//alert confirm
//alert succes

//succes info warning
export const customAlert = (title, text, icon) => {
return Alertclient.fire({
    title,
    text,
    icon,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Aceptar"
});
};

export const confirmAlert = (preConfirm) => {
    return Alertclient.fire({
      title:"¿Estás seguro de realizar esta acción?",
      text:"Le solicitamos esperar un momento a que la solicutud termine",
      icon:'info',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0E7490',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      allowOutsideClick:()=> Alertclient.isLoading(),
      reverseButtons: true,
      backdrop: true,
      preConfirm,
    });
  }

  export const confirmAlertExamen = (preConfirm) => {
    return Alertclient.fire({
      title:"¿Estas seguro de enviar tus respuestas?",
      text:"Revisa bien tus respuestas antes de enviarlas",
      icon:'info',
      iconColor:'orange',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0E7490',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      allowOutsideClick:()=> Alertclient.isLoading(),
      reverseButtons: true,
      backdrop: true,
      preConfirm,
    });
  }

  export const confirmAlertLogOut = (preConfirm) => {
    return Alertclient.fire({
      title:"¿Quieres cerrar sesión?",
      text:"Si cierras sesión tendrás que volver a iniciar sesión para acceder a tu cuenta",
      icon:'info',
      iconColor:'orange',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonColor: 'red',
      cancelButtonColor: 'green',
      allowOutsideClick:()=> Alertclient.isLoading(),
      reverseButtons: true,
      backdrop: true,
      preConfirm,
    });
  }

  