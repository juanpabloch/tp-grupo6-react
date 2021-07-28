import React from 'react'
import './NotFound.css'
import {Link} from 'react-router-dom'
export default function NotFound() {
    return (
<div className="container">
<h1 className='titulo'>404</h1>
<p className='texto'>No pudimos encontrar la página que buscaba. </p>
<div align="center">
  <Link className="btn btn-primary btn-agregar m-3" to={"/"}> Volver a Inicio</Link>
</div>
</div>
    )
}
