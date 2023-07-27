import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
              placeholder='Search Series'
              onChange={handleSearch}
              value={query}
            />
            <div className='input-group-append'>
              <button type='submit' className='btn btn-info btn-lg'>Search</button>
            </div>
          </div>
        </form>
        <div className='row'>
          <h3>Series</h3>
          {
            series.map((serie) => (
              <div className='col-4' key={serie.show.name}>
                <div className='card'>
                  <div className='card-body'>
                    <img className='card-img-top' src={serie.show.image?.medium} alt={`${serie.show.name} image`} />
                    <Link
                      className='card-title'
                      to={`/serie/${serie.show.id}`}
                    >
                      {serie.show.name}
                    </Link>

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
