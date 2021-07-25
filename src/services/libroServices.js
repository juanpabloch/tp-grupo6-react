
import axios from 'axios';
const url ="https://tp-grupo6-api.herokuapp.com/libro";
    

export const getLibros = async () => {
    
        const respuesta = await axios.get(
          url
        );
       return  [...respuesta.data];

      };