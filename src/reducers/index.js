import libros from './reducerLibros';
import personas from './reducerPersonas';
import categorias from './reducerCategorias';
import {combineReducers} from "redux";


export default combineReducers({
  libros,personas,categorias
})