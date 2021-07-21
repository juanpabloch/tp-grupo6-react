
import axios from 'axios';
const url ="https://tp-grupo6-api.herokuapp.com/persona";
    

export const getPersonas = async () => {
    
        const respuesta = await axios.get(
          url
        );
       return  [...respuesta.data];

      };