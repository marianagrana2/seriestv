import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
const SeriesDetail = () => {
  const { idSerie } = useParams()
  const [serie, setSerie] = useState(null)
  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${idSerie}`)
      .then(response => response.json())
      .then(data => setSerie(data))
      .catch(error => console.error(error))
  }, [idSerie]
  )
  if (!serie) {
    return <p>Loading... </p>
  }
  if (!serie.show) {
    return <p> Serie no encontrada.</p>
  }
  return (
    <>
      <div className='container mt-3'>
        <div className='card'>
          <div className='card-header'>
            <h3>{serie.show.name}</h3>
          </div>
          <div className='card-body'>
            <h4>Summary</h4>
            <p>{serie.show.summary}</p>
          </div>
          <div className='row'>
            <div className='col-me-4'>
              <img className='card-img-top' src={serie.show.image?.medium} alt={`${serie.show.name} image`} />
            </div>
            <div className='col-md-8'>
              {serie?.summary}
            </div>
          </div>
        </div>
      </div>

    </>

  )
}

export default SeriesDetail
