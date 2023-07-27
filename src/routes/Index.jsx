import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import SeriesDetail from '../pages/SeriesDetail'

const RoutesIndex = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/serie/:id' element={<SeriesDetail />} />
    </Routes>
  )
}

export default RoutesIndex
