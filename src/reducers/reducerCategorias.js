const estadoInicial = {
  listado: [],
};
function reducerCategorias(state = estadoInicial,action) {
    const nuevoState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
      case 'AGREGAR_UNA_CATEGORIA':
        nuevoState.listado.push(action.posteo);
        return nuevoState;
      case 'AGREGAR_LISTADO_CATEGORIA':
        nuevoState.listado = action.listado;
        return nuevoState;
      case 'REMOVER_CATEGORIA':
        nuevoState.listado = nuevoState.listado.filter((unElemento) => unElemento.id !== action.idElementoARemover);
        return nuevoState;
      default:
        return state;
    }
  }

  export default reducerCategorias;