import { BrowserRouter } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import RoutesIndex from './routes/Index'
function App () {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <RoutesIndex />
      </BrowserRouter>

    </>
  )
}

export default App
