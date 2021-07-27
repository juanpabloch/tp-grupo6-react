import React from "react";
export default function Pagination({  botonAdelante,
  botonAtras,atras,adelante}
) {
  return (
     <>
     <div className="btn btn-group">
        <button className="btn btn-primary btn-anterior" disabled={atras} onClick={() => botonAtras()}>Anterior</button>
        <button className="btn btn-primary btn-siguiente" disabled={adelante}  onClick={() => botonAdelante()}>Siguiente</button>
     </div>
     </>
  );
}
