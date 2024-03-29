import React,{useState,useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Detalle = () => {
  const { id,nombre,alias,email,apellido } = useParams();
  const libros = useSelector((state) => state.libros.listado);
  const [librosPretados,setLibrosPrestados] = useState();
  const librosArray = libros.filter(
    (libro) => libro.persona_id === parseInt(id)
  );
  const LibrosToMostar = librosArray.map(function (item) {
    return item.nombre;
  });
  useEffect(() => {
    setLibrosPrestados(LibrosToMostar.join());
  }, [LibrosToMostar]);
  return (
    <div className="container p-5">
      <div className="card">
        <div className="card-header d-flex justify-content-between">
          <span
            className="d-inline-block text-truncate"
          >
            {librosPretados
              ? `Libros prestados: ${librosPretados}`
              : `Sin libros`}
          </span>
          <Link className="link-volver-libro" to="/personas">
            Volver
          </Link>
        </div>
        <div className="card-body libros-detalles-btn">
          <h3 className="card-title">{nombre}</h3>
          <p className="card-text">{apellido}</p>
          <p className="card-text">{alias}</p>
          <p className="card-text">{email}</p>
          <Link
            className={!librosPretados?"btn btn-outline-danger":"btn btn-outline-danger disabled"}
            to={`/personas/delete/${id}/persona`}
            style={{marginRight: '10px'}}
            
          >
            Borrar
          </Link>
          <Link
           style={{marginRight: '10px'}}
            className="btn btn-outline-dark"
            to={{
              pathname: `/personas/modificar/${id}/${nombre}/${apellido}/${alias}/${email}`,
            }}
          >
            Modificar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Detalle;
