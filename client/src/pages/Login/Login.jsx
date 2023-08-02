import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext.jsx'
const Login = () => {

  const URL_API = 'http://localhost:8800/api/auth/login'

  const [ inputs, setInputs ] = useState({
    username: "",
    password: "",
  })

  const [err, setError] = useState(null)

  const navigate = useNavigate();

  

  const {login} = useContext(AuthContext);


  const handleChange = e =>{
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async e =>{
    e.preventDefault()

    try{
      await login(inputs)
      await axios.post(URL_API, inputs)
      navigate("/")

    }catch(err){
      setError(err.response.data)
    }

    
  }

  return (
    <div className='auth' >
      <h1>Iniciar Sesión</h1>
      <form>
        <input type="text" placeholder='Usuario' name='username' onChange={handleChange}/>
        <input type="password" placeholder='Contraseña' name='password' onChange={handleChange}/>
        <button onClick={handleSubmit} >Entrar</button>
        {err && <p>{{err}}</p>}
        <span>¿No tienes una cuenta? <Link to="/register"> Registrate! </Link> </span>
      </form>
    </div>
  )
}

export default Login
