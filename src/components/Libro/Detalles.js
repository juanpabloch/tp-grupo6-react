import React, { useEffect,  useState } from 'react'
import { useParams, Link } from "react-router-dom";
import axios from 'axios'
import { useSelector } from "react-redux";

const Detalle = ()=>{
    const {id} = useParams()
    const personas = useSelector((state)=>state.personas.listado)
    
    const [libro, setLibro] = useState({})
    const [categoria, setCategoria] = useState('')

    useEffect(()=>{
        const fetchData = async()=>{
            const response = await axios.get(`https://tp-grupo6-api.herokuapp.com/libro/${id}`)
            setLibro(response.data[0])
            const categoria = await axios.get(`https://tp-grupo6-api.herokuapp.com/categoria/${response.data[0].categoria_id}`)
            setCategoria(categoria.data[0].nombre)
        }
        fetchData()
    }, [])

    const personaAmostar = personas.find(persona=>persona.persona_id === libro.persona_id)

    return (
        <div className="container mb-5">
            <div className="card">
                <div className="card-header d-flex justify-content-between">
                    {personaAmostar
                        ? `Libro prestado a: ${personaAmostar.alias}`
                        : 'Libro en biblioteca' 
                    }
                    <a className="link-volver-libro" href="/">Volver</a>
                </div>
                <div className="card-body">
                    <h3 className="card-title">{libro.nombre}</h3>
                    <p className="card-text">{libro.descripcion}</p>
                    <p className="card-text">{`Genero: ${categoria}`}</p>
                    {libro.persona_id === null
                        ?<a class="btn btn-outline-danger" href={`/delete/${libro.libro_id}`} style={{marginRight: '10px'}}>Borrar</a>
                        : ''
                    }
                    
                    <a className="btn btn-outline-dark" href={`/modificar-libro/${libro.libro_id}/${libro.nombre}/${libro.categoria_id}/${libro.persona_id}/${libro.descripcion}`}>Modificar</a>

                </div>
            </div>
        </div>
    ) 
}

export default Detalle