import React from "react";
export default function Pagination({  botonAdelante,
  botonAtras,atras,adelante}
) {
  return (
     <>
     <div className="btn btn-group">
     <button className="btn btn-primary" disabled={atras} onClick={() => botonAtras()}>Anterior</button>
       <button className="btn btn-primary " disabled={adelante}  onClick={() => botonAdelante()}>Siguiente</button>
     </div>
     </>
  );
}
