import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
const SeriesDetail = () => {
  const { id } = useParams()
  const [serie, setSerie] = useState(null)
  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then(response => response.json())
      .then(data => setSerie(data))
      .catch(error => console.error(error))
  }, [id]
  )
  if (!serie) {
    return <p>Loading... </p>
  }
  if (!serie.name || !serie.summary || !serie.image?.medium) {
    return <p>Datos de serie no válidos.</p> // Verificar si la serie existe y sus propiedades estén definidas.
  }
  return (
    <>
      <div className='container mt-3'>
        <div className='card'>
          <div className='card-header'>
            <h3>{serie.name}</h3>
          </div>
          <div className='card-body'>
            <h4>Summary</h4>
            <p>{serie.summary}</p>
          </div>
          <div className='row'>
            <div className='col-me-4'>
              <img src={serie.image?.medium} alt={`${serie.name} image`} className='img-fluid' />
            </div>
            <div className='col-md-8'>
              <p>Genres:{serie.genres}</p>
              <h4>Seasons</h4>
              <h4>Cast</h4>
            </div>
          </div>
        </div>
      </div>

    </>

  )
}

export default SeriesDetail
