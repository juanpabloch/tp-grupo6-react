const estadoInicial = {
  listado: [],
  };
function reducerPersonas(state = estadoInicial, action) {
    const nuevoState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
      case 'AGREGAR_PERSONA':
        nuevoState.listado.push(action.posteo);
        return nuevoState;
      case 'AGREGAR_LISTADO_PERSONA':
        nuevoState.listado = action.listado;
        return nuevoState;
      case 'REMOVER_PERSONA':
        nuevoState.listado = nuevoState.listado.filter((unElemento) => unElemento.id !== action.idElementoARemover);
        return nuevoState;
      default:
        return state;
    }
  }

  export default reducerPersonas;