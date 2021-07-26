import React from "react";
import {Link} from "react-router-dom";
export default function ListPersonas({ personas }) {
  return (
    <div className="row">
      {personas.map((persona) => (
        <li key={persona.persona_id} className="list-group-item d-flex justify-content-between align-items-center">
          {persona.nombre}
          <div className="btn btn-group">
              <Link className="btn btn-outline-danger" to={`/personas/delete/${persona.persona_id}`}>
                Borrar
              </Link>

              <Link
                className="btn btn-outline-dark"
                to={{
                  pathname: `/personas/modificar/${persona.persona_id}/${persona.nombre}/${persona.apellido}/${persona.alias}/${persona.email}`,
                }}>
                  Modificar
                </Link>

                <Link className="btn btn-outline-info mr-10" to={`/libro/${persona.persona_id}/detalle`}>
                  VER
                </Link>
            </div>
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
