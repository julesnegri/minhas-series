import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from  'react-router-dom'


const Series = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    axios
      .get('/api/series')
      .then(res => {
        setData(res.data.data)
      })
  }, [])

const deleteGenero = id => {
  axios
    .delete('/api/genres/' + id)
    .then(res => {
      const filtrado = data.filter(item => item.id !== id)
      setData(filtrado)
    })
} 

const renderizalinha = record => {
  return (
    <tr key={record.id}>
      <th scope='row'>{record.id}</th>
      <td>{record.name}</td>
      <td>
        <button className='btn btn-danger' onClick={() => deleteGenero(record.id)}>Remover</button>
        <Link to={'/generos/' + record.id} className='btn btn-warning'>Editar</Link>
      </td>
    </tr>
  )
}

if (data.length === 0) {
  return (
    <div className='container'>
      <h1>Séries</h1>
      <div className='alert alert-warning' role='alert'>
        Você não possui genêros criados.
      </div>
    </div>
  )
}

//const id = 2
//const filtro = data.filter(item => item.id !== id)

//console.log(filtro)

return (
  <div className='container'>
    <h1>Séries</h1>
    <div><Link to='/generos/novo' className='btn btn-primary'>Nova série</Link></div>
    <table className='table table-dark'>
      <thead>
        <tr>
          <th scope='col'>ID</th>
          <th scope='col'>Nome</th>
          <th scope='col'>Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.map(renderizalinha)}
      </tbody>
    </table>
  </div>
  )
}

export default Series