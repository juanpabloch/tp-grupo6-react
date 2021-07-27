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

    const personaAmostar = personas.find(persona=>persona.persona_id === libro.persona_id)

    return (
        <div className="container mb-5 mt-4">
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

                    <Devolver disable={libro.persona_id !== null ?false:true} id={libro.libro_id}/>

                    <Link className="btn btn-outline-dark" to={`/modificar-libro/${libro.libro_id}/${libro.nombre}/${libro.categoria_id}/${libro.persona_id}/${libro.descripcion}`}>Modificar</Link>

                </div>
            </div>
        </div>
    ) 
}

export default Detalle