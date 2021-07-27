import React, { useEffect,  useState } from 'react'
import { useParams, Link } from "react-router-dom";
import axios from 'axios'
import { useSelector } from "react-redux";
import Devolver from "./Devolver"
const Detalle = ()=>{
    const {id} = useParams()
    const personas = useSelector((state)=>state.personas.listado)
    
    const [libro, setLibro] = useState({})
    const [categoria, setCategoria] = useState('')
    const [alerta, setAlerta] = useState({msg:"",mostrar:false,tipo:0})
    useEffect(()=>{
        const fetchData = async()=>{
            try{
            const response = await axios.get(`https://tp-grupo6-api.herokuapp.com/libro/${id}`)
            setLibro(response.data[0])
            const categoria = await axios.get(`https://tp-grupo6-api.herokuapp.com/categoria/${response.data[0].categoria_id}`)
            setCategoria(categoria.data[0].nombre)
        } catch (error) {
            console.log(error.response.data);
          }
        };
        fetchData()
    }, [])

    const handleCerrar = (e) => {
        const newForm = JSON.parse(JSON.stringify(alerta));
        newForm.mostrar = false;
        setAlerta(newForm);
      };
    const personaAmostar = personas.find(persona=>persona.persona_id === libro.persona_id)

    return (
        <div className="container mb-5 mt-4">
            {alerta.mostrar? <div className={alerta.tipo===0?"alert alert-success alert-dismissible fade show":"alert alert-danger alert-dismissible fade show"}  role="alert">
            <strong>{alerta.tipo===0?"Excelente!":"Error!"}</strong> {alerta.msg}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={handleCerrar}></button>
        </div>:null}
            <div className="card">
                <div className="card-header d-flex justify-content-between">
                    {personaAmostar
                        ? `Libro prestado a: ${personaAmostar.alias}`
                        : 'Libro en biblioteca' 
                    }
                    <Link className="link-volver-libro" to="/">Volver</Link>
                </div>
                <div className="card-body">
                    <h3 className="card-title">{libro.nombre}</h3>
                    <p className="card-text">{libro.descripcion}</p>
                    <p className="card-text">{`Genero: ${categoria}`}</p>
                   <Link className={libro.persona_id === null?"btn btn-outline-danger ":"btn btn-outline-danger disabled"}  to={`/delete/${libro.libro_id}/libro/`} style={{marginRight: '10px'}}>Borrar</Link>
                   <Devolver alerta={alerta} setAlerta={setAlerta} disable={libro.persona_id !== null ?false:true} id={libro.libro_id}/>
                   <Link className={libro.persona_id === null?"btn btn-outline-danger ":"btn btn-outline-danger disabled"}  to={`/prestarlibro/${libro.libro_id}/${libro.nombre}`} style={{marginRight: '10px'}}>Prestar</Link>
                   <Link className="btn btn-outline-dark" to={`/modificar-libro/${libro.libro_id}/${libro.nombre}/${libro.categoria_id}/${libro.persona_id}/${libro.descripcion}`}>Modificar</Link>

                </div>
            </div>
        </div>
    ) 
}

export default Detalle