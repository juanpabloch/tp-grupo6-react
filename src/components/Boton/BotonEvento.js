import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
export default function Boton({  accion,name
    }
) {
  return (
     <>
     <button className="btn btn-primary" onClick={()=>{accion()}}>{name}</button>
     </>
  );
}
