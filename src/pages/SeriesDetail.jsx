import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
const SeriesDetail = () => {
  const { id } = useParams()
  const [serie, setSerie] = useState(null)
  const [seasons, setSeasons] = useState([])
  const [episodes, setEpisodes] = useState([])
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

    fetch(`https://api.tvmaze.com/seasons/${id}/episodes`)
      .then(response => response.json())
      .then(data => setEpisodes(data))
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
  const episodesBySeason = {}
  episodes.forEach(episode => {
    const seasonNumber = episode?.season
    if (!episodesBySeason[seasonNumber]) {
      episodesBySeason[seasonNumber] = []
    }
    episodesBySeason[seasonNumber].push(episode)
  })
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
              <div id='accordion'>
                {cast.length > 0
                  ? (
                      seasons.map(season => (
                        <div className='card' key={season?.id}>
                          <div className='card-header' id={`heading${season.id}`}>
                            <h5 className='mb-0'> Season {season.number}
                            </h5>
                          </div>
                          <div className='card-body'>
                            {episodesBySeason[season.number]?.length > 0
                              ? (
                                <ul className='list-group list-group-flush'>
                                  {episodesBySeason[season.number]?.map(episode => (
                                    <li key={episode.id} className='list-group-item'>
                                      Episode {episode?.name}
                                    </li>
                                  ))}
                                </ul>
                                )
                              : (
                                <p>No episodes information available.</p>
                                )}
                          </div>
                        </div>

                      ))
                    )
                  : (<p> No seasons information available.</p>)}

              </div>
              <h4>Cast</h4>
              <div className='card'>
                <div className='card-body'>
                  {cast.length > 0
                    ? (
                        cast.map(castItem => (
                          <div key={castItem.person.id}>
                            <img
                              className='card-img-top'
                              src={castItem.person.image?.medium}
                              alt='Cast Image'
                            />
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
