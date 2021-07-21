import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ListLibros from "./ListLibro";

import { getLibros } from "../../services/libroServices";
import "bootstrap/dist/css/bootstrap.min.css";
export default function Libros() {

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLibros = async () => {
      const respuesta = await getLibros();
      dispatch({ type: "AGREGAR_LISTADO_LIBROS", listadoLibros: respuesta });
    };
    fetchLibros();
  }, [dispatch]);


  return (
    <div className="py-4 px-4">
      <ul className="list-group">
        <ListLibros   />
      </ul>
    </div>
  );
}
