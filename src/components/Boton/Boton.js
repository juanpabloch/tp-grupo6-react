import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
export default function Boton({  ruta,name
    }
) {
  return (
     <>
     <Link className="btn btn-primary" to={ruta}>{name}</Link>
     </>
  );
}
