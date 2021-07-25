import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Libros from "./Libro/Libros";
import Formulario from "./Libro/Formulario";
import Personas from "./Personas/Personas";
import Categorias from "./Categorias/Categorias";
import NavBar from "./Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { getLibros } from "../services/libroServices";
import { getCategorias } from "../services/categoriaServices";
import { getPersonas } from "../services/personaServices";
import { BrowserRouter as Router,Route } from "react-router-dom"; 

import "./App.css";
const App = () => {


  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAll = async () => {
      let respuesta = await getLibros();
      dispatch({ type: "AGREGAR_LISTADO_LIBROS", listado: respuesta });
       respuesta = await getCategorias();
      dispatch({ type: "AGREGAR_LISTADO_CATEGORIA", listado: respuesta });
       respuesta = await getPersonas();
      dispatch({ type: "AGREGAR_LISTADO_PERSONA", listado: respuesta });
    };
    fetchAll();
  }, [dispatch]);

  return (

    <div className="bg">
      <div className="container">
        <div className="row py-3 px-2">
          <div className="col-md-10 mx-auto">
            <div className="bg-white shadow rounded overflow-hidden">
              <div className="px-4 pt-0 pb-4 cover">
                <div className="media align-items-end profile-head">
                  <div className="profile mr-3">
                    <img
                      src="https://scontent-eze1-1.xx.fbcdn.net/v/t31.18172-8/25439906_1503219936382396_943558040200916294_o.jpg?_nc_cat=108&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeHHfRdla1dqSNqyLPmDMhCltNCdXd3LB5m00J1d3csHmW0zi2ujsNs1D8ddnIA7RAU&_nc_ohc=w6e3d51_hZsAX8WDi_o&_nc_ht=scontent-eze1-1.xx&oh=c60e1cffedf2b35e66cb2c73e2cdbf8f&oe=60F771EB"
                      alt="..."
                      width="130"
                      className="rounded mb-4 img-thumbnail"
                    />
                    <div className="media-body mb-2 text-white">
                      <h4 className="mt-0 mb-0">Grupo 6</h4>
                      <p className="small mb-4">
                        <i className="fas fa-map-marker-alt mr-2 "></i>Where is
                        my books
                      </p>
                      <br/>
                    </div>
                  </div>
                </div>
              </div>
              <Router>
              <div className="bg-light p-4 d-flex justify-content-end text-center">
                <NavBar/>
              </div>
              <div className="px-4 py-3"></div>
              <div className="col mt-3"></div>
              <Route exact path="/" component={Libros} />
               <Route exact path="/personas" component={Personas} />
               <Route exact path="/categorias" component={Categorias} />
               <Route exact path="/formulario" component={Formulario} />
             </Router>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default App;
