const estadoInicial = {
  personas: [],
  };
function reducerPersonas(state = estadoInicial, action) {
    const nuevoState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
      case 'AGREGAR_PERSONA':
        nuevoState.personas.push(action.posteo);
        return nuevoState;
      case 'AGREGAR_LISTADO_PERSONA':
        nuevoState.personas = action.listado;
        return nuevoState;
      case 'REMOVER_PERSONA':
        nuevoState.personas = nuevoState.personas.filter((unElemento) => unElemento.id !== action.idElementoARemover);
        return nuevoState;
      default:
        return state;
    }
  }

  export default reducerPersonas;