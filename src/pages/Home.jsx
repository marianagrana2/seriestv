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
  const handleSubmit = (event) => {
    event.preventDefault()
  }
  return (
    <>
      <>
        <h1>Home</h1>
        <form onSubmit={handleSubmit}>
          <div className='input-group mb-3'>
            <input
              className='form-control'
              type='text'
              placeholder='Buscar Serie'
              onChange={handleSearch}
              value={query}
            />
            <div className='input-group-append'>
              <button type='submit' className='btn btn-info btn-lg'>Buscar</button>
            </div>
          </div>
        </form>
        <div className='row'>
          <h3>Resultados</h3>
          {
            series.map((serie) => (
              <div className='col-4' key={serie.show.name}>
                <div className='card'>
                  <div className='card-body'>
                    <img className='card-img-top' src={serie.show.image.medium} alt={`${serie.show.name} image`} />
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
