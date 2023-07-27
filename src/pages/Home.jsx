import { useState, useEffect } from 'react'

const Home = () => {
  const [series, setSeries] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
      .then(response => response.json())
      .then(data => setSeries(data))
      .catch(error => console.error(error))
  }, [query])

  const handleSearch = (event) => {
    setQuery(event.target.value)
  }

  return (
    <>
      <>
        <h1>Home</h1>
        <div className='input-group mb-3'>
          <input
            className='form-control'
            type='text'
            placeholder='Buscar Serie'
            onChange={handleSearch}
            value={query}
          />
          <div className='input-group-append'>
            <button type='button' className='btn btn-info btn-lg'>Buscar</button>
          </div>
        </div>
        <div className='row'>
          <h3>Resultados</h3>
          {
            series.map((serie) => (
              <div className='col-4' key={serie.show.name}>
                <div className='card'>
                  <div className='card-body'>
                    <img className='card-img-top' alt={`${serie.show.name} image`} src='#' />
                    <li>{serie.show.name}</li>
                  </div>
                </div>
              </div>
            )
            )
          }

        </div>
      </>
    </>
  )
}

export default Home
