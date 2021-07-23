
import axios from 'axios';
const url ="https://tp-grupo6-api.herokuapp.com/libro";
    

export const getLibros = async () => {
    
        const respuesta = await axios.get(
          url
        );
       return  [...respuesta.data];

      };

export const deleteLibro = async (idBorrar) => {
    
  axios.delete(url+`/${idBorrar}`)  
  .then(res => {  
    return  [...res.data];
  })
  .catch(error => {
    return  [...error.response.data.mensaje]})

      };