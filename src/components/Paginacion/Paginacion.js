import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
export default function Pagination({  botonAdelante,
  botonAtras,atras,adelante}
) {
  return (
     <>
     <div className="container">
     <button className="btn btn-primary" disabled={atras} onClick={() => botonAtras()}>Anterios</button>
       <button className="btn btn-primary " disabled={adelante}  onClick={() => botonAdelante()}>Siguiente</button>
     </div>
     </>
  );
}
