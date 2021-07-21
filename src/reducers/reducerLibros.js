const estadoInicial = {
  listado: [],
};
function reducerLibro(state = estadoInicial, action) {
    const nuevoState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
      case 'AGREGAR_LIBRO':
        nuevoState.listado.push(action.libro);
        return nuevoState;
      case 'AGREGAR_LISTADO_LIBROS':
        nuevoState.listado = action.listadoLibros;
        return nuevoState;
      case 'REMOVER_LIBRO':
        nuevoState.listado = nuevoState.listado.filter((unElemento) => unElemento.id !== action.idElementoARemover);
        return nuevoState;
      default:
        return state;
    }
  }

  export default reducerLibro;