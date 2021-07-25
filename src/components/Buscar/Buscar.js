import React from "react";
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