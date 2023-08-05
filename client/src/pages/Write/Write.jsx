import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Write = () => {

  const state = useLocation().state
  const [value, setValue] = useState('')
  const [title, setTitle] = useState(state?.title  || "");
  const [desc, setDesc] = useState(state?.description  || '');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat  ||"");

  const navigate = useNavigate()

  const upload = async () =>{
    try {
      const formData = new FormData();
      formData.append("file", file)
      const response = await axios.post('http://localhost:8800/api/uploads', formData)
      console.log(response.data)
      return response.data

    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = async (e) =>{
    e.preventDefault()

    const imgURL = await upload()

    try {
      
      state ? await axios.put(`http://localhost:8800/api/posts/${state.id}`, {
        title, 
        description:desc, 
        cat, 
        img:file ? imgURL : ""
      }, {
        withCredentials: true
      }) : await axios.post(`http://localhost:8800/api/posts/`, {
        title, 
        description:desc, 
        cat, 
        img:file ? imgURL : "",
        date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
      }, {
        withCredentials: true
      })


    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div className="add">
      <div className="content">
        <input type="text" value={title} placeholder='Title' onChange={e=>setTitle(e.target.value)}/>
        <div className="editorContainer">
          <ReactQuill className='editor' theme="snow" value={desc} onChange={setDesc} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Estatus: </b> Borrador
          </span>
          <span>
            <b>Visibilidad: </b> Publico
          </span>

          <input style={{display: 'none'}} type="file" id='file' onChange={e=>setFile(e.target.files[0])}/>
          <label className='file' htmlFor="file">Subir Imagen</label>
          <div className="buttons">
            <button>Guardar como borrador</button>
            <button onClick={handleClick} >Publicar</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input type="radio" checked={cat === 'arte'} name='cat' value="arte" id='arte' onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="arte">Arte</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === 'science'} name='cat' value="science" id='science' onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="science">Ciencia</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === 'technology'} name='cat' value="technology" id='technology' onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="technology">Tecnología</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === 'cinema'} name='cat' value="cinema" id='cinema' onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="cinema">Cine</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === 'design'} name='cat' value="design" id='design' onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="design">Diseño</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === 'food'} name='cat' value="food" id='food' onChange={e=>setCat(e.target.value)}/>
            <label htmlFor="food">Comida</label>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Write
