const estadoInicial = {
  listado: [],
};
function reducerLibro(state = estadoInicial, action) {
  let nuevoState = JSON.parse(JSON.stringify(state));
  let index = 0;
  switch (action.type) {
    case "AGREGAR_LIBRO":
      nuevoState.listado.push(action.payload);
      return nuevoState;
    case "AGREGAR_LISTADO_LIBROS":
      nuevoState.listado = action.listado;
      return nuevoState;
    case "REMOVER_LIBRO":
      nuevoState.listado = nuevoState.listado.filter(
        (unLibro) => unLibro.libro_id !== action.payload
      );
      return nuevoState;
    case "DEVOLVER_LIBRO":
      index = nuevoState.listado.findIndex(
        (obj) => obj.libro_id === action.payload
      );
      nuevoState.listado[index].persona_id = null;
      return nuevoState;
    case "PRESTAR_LIBRO":
      const index2 = nuevoState.listado.findIndex(
        (obj) => obj.libro_id === parseInt(action.payload1)
      );
      nuevoState.listado[index2].persona_id =parseInt(action.payload2);
      return nuevoState;
    case "MODIFICAR_DESCRIPCION":
      index = nuevoState.listado.findIndex(
        (obj) => obj.libro_id === action.payload[0].libro_id
      );
      nuevoState.listado[index] = action.payload[0];
      return nuevoState;
    default:
      return state;
  }
}

export default reducerLibro;
