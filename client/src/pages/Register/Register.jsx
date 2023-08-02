import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

  const URL_API = 'http://localhost:8800/api/auth/register'

  const [ inputs, setInputs ] = useState({
    username: "",
    email: "",
    password: "",
  })

  const [err, setError] = useState(null)

  const navigate = useNavigate()

  const handleChange = e =>{
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async e =>{
    e.preventDefault()

    try{

      await axios.post(URL_API, inputs)
      navigate("/login")

    }catch(err){
      setError(err.response.data)
    }

    
  }

  return (
    <div>
      <div className='auth' >
        <h1>Registrate</h1>
        <form>
          <input required type="text" placeholder='Usuario' name='username' onChange={handleChange}/>
          <input required type="email" placeholder='Correo Electronico' name='email' onChange={handleChange}/>
          <input required type="password" placeholder='Contraseña' name='password' onChange={handleChange}/>
          <button onClick={handleSubmit} >Registrate</button>
          { err && <p>{err}</p>}
          <span>¿Ya tienes una cuenta?<Link to="/login"> Entra </Link> </span>
        </form>
      </div>
    </div>
  )
}

export default Register
