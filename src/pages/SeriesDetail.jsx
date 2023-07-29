import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
const SeriesDetail = () => {
  const { id } = useParams()
  const [serie, setSerie] = useState(null)
  const [seasons, setSeasons] = useState([])
  const [cast, setCast] = useState([])
  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then(response => response.json())
      .then(data => setSerie(data))
      .catch(error => console.error(error))

    fetch(`https://api.tvmaze.com/shows/${id}/seasons`)
      .then(response => response.json())
      .then(data => setSeasons(data))
      .catch(error => console.error(error))

    fetch(`https://api.tvmaze.com/shows/${id}/cast`)
      .then(response => response.json())
      .then(data => setCast(data))
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
              <div className='card-body'>
                <div className='list-group'>
                  <ul className='list-group list-group-flush'>
                    {seasons.map(season => (
                      <li key={season.id} className='list-group-item'>
                        Season {season.number}
                      </li>
                    )
                    )}
                  </ul>
                </div>
              </div>
              <h4>Cast</h4>
              <div className='card'>
                <div className='card-body'>
                  {cast.length > 0
                    ? (
                        cast.map(castItem => (
                          <div key={castItem.person.id}>
                            <img className='card-img-top' src={castItem.person.image?.medium} alt='Cast Image' />
                            <h5 className='card-title'>
                              {castItem.person?.name}
                            </h5>
                          </div>
                        ))
                      )
                    : (<p>No cast information available.</p>)}
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
