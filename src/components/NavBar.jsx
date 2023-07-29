import { NavLink } from 'react-router-dom'
const NavBar = () => {
  return (
    <nav className='d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow'>
      <NavLink className='my-0 mr-md-auto font-weight-normal' to='/'>SeriesTV</NavLink>
    </nav>
  )
}

export default NavBar
