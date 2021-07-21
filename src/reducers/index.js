import libros from './reducerLibros';
import personas from './reducerPersonas';
import categorias from './reducerCategorias';
import {combineReducers} from "redux";

const reducer = combineReducers({
    libros,personas,categorias
})

  export default reducer;