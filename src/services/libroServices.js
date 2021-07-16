
import axios from 'axios';
const url ="https://jsonplaceholder.typicode.com";
    

export const getLibros = async () => {

        const respuesta = await axios.get(
          url+"/posts"
        );
       return  [...respuesta.data];

      };