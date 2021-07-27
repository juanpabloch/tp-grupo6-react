import React, { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router,Route } from "react-router-dom"; 
import axios from 'axios';
import "./App.css";

import NavBar from "./Navbar/Navbar";
import Borrar from "./Borrar/Borrar";
//import libro
import Libros from "./Libro/Libros";
import FormularioNuevoLibro from './Libro/FormularioNuevoLibro'
import ModificarLibro from "./Libro/Modificar";
import DetalleLibro from "./Libro/Detalles";
import FormPrestarLibro from './Libro/FormPrestarLibro';
import Devolver from './Libro/Devolver';
//import personas
import Personas from "./Personas/Personas";
import ModificarPersona from "./Personas/Modificar/Modificar";
import FormularioNuevaPersona from "./Personas/Agregar";
import DetallePersona from "./Personas/Detalles";
//import categorias
import Categorias from "./Categorias/Categorias";
import FormularioNuevaCategoria from './Categorias/FormularioNuevaCategoria'

const App = () => {
  
  const dispatch = useDispatch();

  const [alerta, setAlerta] = useState({mostrar:false,msg:""});

  useEffect(() => {

    const fetchAll = async () => {
      try {
      let respuesta = await axios.get("https://tp-grupo6-api.herokuapp.com/libro");
      dispatch({ type: "AGREGAR_LISTADO_LIBROS", listado: respuesta.data });
       respuesta = await axios.get(
        "https://tp-grupo6-api.herokuapp.com/categoria"
      );
      dispatch({ type: "AGREGAR_LISTADO_CATEGORIA", listado: respuesta.data });
       respuesta = await axios.get("https://tp-grupo6-api.herokuapp.com/persona");
      dispatch({ type: "AGREGAR_LISTADO_PERSONA", listado: respuesta.data });
    } catch (error) {
      const newState = JSON.parse(JSON.stringify(alerta));
      newState.mostrar = true;
      newState.msg = error.response.data.mensaje;
      setAlerta(newState);
    }
    };
    fetchAll();
  }, []);

  const handleCerrar = (e) => {
    const newForm = JSON.parse(JSON.stringify(alerta));
    newForm.mostrar = false;
    setAlerta(newForm);
  };
 
  return (

    <div className="bg">
      <div className="container">
        <div className="row py-3 px-2 flex-container">
          <div className="col-md-10 mx-auto">
            <div className="bg-white shadow rounded overflow-hidden Fondo">
              {/* <div className="px-4 pt-0 pb-4 cover header_principal">
                <div className="media align-items-end profile-head">
                  <div className="media-body mb-2 text-white">
                    <h4 className="mt-0 mb-0">Grupo 6</h4>
                    <p className="small mb-4">
                      <i className="fas fa-map-marker-alt mr-2 "></i>Where is
                      my book
                    </p>
                    <br/>
                  </div>
                </div>
              </div> */}
                 {  alerta.mostrar?<div className="alert alert-danger alert-dismissible fade show" role="alert">
              <strong>Error! </strong>{alerta.msg}
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={handleCerrar}></button>
                </div>:
                  
              <Router >
                <div className="bg-light p-3 text-center navegador">
                  <NavBar/>
                </div>
                <Route exact path="/" component={Libros} />
                <Route exact path="/modificar-libro/:id/:nombre/:categoria/:persona/:descripcion"  component={ModificarLibro} />
                <Route exact path="/delete/:id/:tipo" component={Borrar} />
                <Route exact path="/libro/:id/detalle" component={DetalleLibro} />
                <Route exact path="/libro/nuevo" component={FormularioNuevoLibro} />
                <Route exact path="/libro/devolver/:id" component={Devolver} />
                <Route exact path="/prestarlibro/:id/:nombre" component={FormPrestarLibro}/>
                <Route exact path="/personas" component={Personas} />
                <Route exact path="/personas/modificar/:id/:nombre/:apellido/:alias/:email" component={ModificarPersona} />
                <Route exact path="/personas/delete/:id/:tipo" component={Borrar} />
                <Route exact path="/personas/detalle/:id/:nombre/:apellido/:alias/:email" component={DetallePersona} />
                <Route exact path="/personas/nuevo" component={FormularioNuevaPersona} />

                <Route exact path="/categorias" component={Categorias} />
                <Route exact path="/categoria/nuevo" component={FormularioNuevaCategoria} />
                <Route exact path="/categoria/delete/:id/:tipo" component={Borrar} />
             </Router>
              }
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default App;
