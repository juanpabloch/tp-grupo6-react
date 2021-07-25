import React from "react";
export default function ListPersonas({ personas, cargando }) {
  return (
    <div className="row">
      {personas.map((persona) => (
        <li key={persona.persona_id} className="list-group-item">
          {persona.nombre}
        </li>
      ))}
      {personas.length === 0 ? (
        <div className="alert alert-primary" role="alert">
          <h4 className="alert-heading">Perdona</h4>
          <p>La persona que estas tratando de buscar no se encuentra.</p>
        </div>
      ) : null}
    </div>
  );
}
