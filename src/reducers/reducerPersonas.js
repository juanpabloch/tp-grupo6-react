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
        nuevoState.listado = nuevoState.listado.filter((unElemento) => unElemento.persona_id !== action.payload);
        return nuevoState;
        case 'MODIFICAR_PERSONA':
          const  index = nuevoState.listado.findIndex(
            (obj) => obj.persona_id === action.payload[0].persona_id
          );
           nuevoState.listado[index] = action.payload[0];
           return nuevoState;
      default:
        return state;
    }
  }

  export default reducerPersonas;