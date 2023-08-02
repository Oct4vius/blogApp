import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../img/logo.png"
import { AuthContext } from '../../context/authContext.jsx'

function Navbar() {

  const {currentUser, logout} = useContext(AuthContext)


  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/" >
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className='link' to="/?cat=arte"><h6>ARTE</h6></Link>
        
          <Link className='link' to="/?cat=ciencia"><h6>CIENCIA</h6></Link>
        
          <Link className='link' to="/?cat=tecnologia"><h6>TECNOLOGÍA</h6></Link>
        
          <Link className='link' to="/?cat=cine"><h6>CINE</h6></Link>

          <Link className='link' to="/?cat=diseno"><h6>DISEÑO</h6></Link>

          <Link className='link' to="/?cat=comida"><h6>COMIDA</h6></Link>

          <span>{currentUser?.username}</span>
          { currentUser ? (
          <span onClick={logout}>Salir</span> 
          ) : (
          <Link className='link' to="/login" >Entrar</Link> 
          )}
          <span className='write' >
            <Link className='link' to="/write">Write</Link>
          </span>

        </div>
      </div>
    </div>
  )
}

export default Navbar