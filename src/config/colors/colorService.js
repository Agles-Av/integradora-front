import AxiosCliente from '../htpp-gateway/http-client';

export const getColorsFromServer = async () => {
  try {
    const response = await AxiosCliente({
      url: "/sistema/",
      method: "GET",
    });
    if (response.status === 'OK') {
        console.log(response);
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};