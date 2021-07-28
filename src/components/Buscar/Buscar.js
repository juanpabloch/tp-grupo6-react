import React from "react";
export default function Buscar({  buscarPor,
    enCambioBuscador,de}
) {
  return (
     <>
        <input
          type="search"
          className="form-control"
          aria-label="Amount (to the nearest dollar)"
          placeholder={`Escriba el nombre de ${de} que desea buscar...`}
          value={buscarPor}
          onChange={enCambioBuscador}
        />
     </>
  );
}