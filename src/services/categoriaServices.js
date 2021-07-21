
import axios from 'axios';
const url ="https://tp-grupo6-api.herokuapp.com/categoria";
    

export const getCategorias = async () => {
    
        const respuesta = await axios.get(
          url
        );
       return  [...respuesta.data];

      };