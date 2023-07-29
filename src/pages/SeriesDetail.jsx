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
  const summaryWithoutP = serie.summary.replace(/<\/?p>/g, ' ')

  return (
    <>
      <div className='container mt-3'>
        <div className='card'>
          <div className='card-header'>
            <h3>{serie.name}</h3>
          </div>
          <div className='card-body'>
            <h4>Summary</h4>
            <div dangerouslySetInnerHTML={{ __html: summaryWithoutP }} />
          </div>
          <div className='row'>
            <div className='col-me-4'>
              <img src={serie.image?.medium} alt={`${serie.name} image`} className='img-fluid' />
            </div>
            <div className='col-md-8'>
              <p>Genres:{serie.genres}</p>
              <h4>Seasons</h4>
              <div className='list-group'>
                <ul className='list-group list-group-flush'>
                  <li className='list-group-item'>Season 1</li>
                  <li className='list-group-item'>Season 2</li>
                </ul>
              </div>
              <h4>Cast</h4>
              <div className='card' style={{ width: '18rem' }}>
                <img className='card-img-top' src='' alt='Cast Image' />
                <div className='card-body'>
                  <h5 className='card-title'>Cast Name</h5>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>

  )
}

export default SeriesDetail
