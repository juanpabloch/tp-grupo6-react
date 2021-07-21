import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
export default function Buscar({  buscarPor,
    enCambioBuscador}
) {
  return (
     <>
        <input
          type="text"
          className="form-control"
          aria-label="Amount (to the nearest dollar)"
          value={buscarPor}
          onChange={enCambioBuscador}
        />
     </>
  );
}
