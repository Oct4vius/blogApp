import React, { useContext, useEffect, useState } from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import Edit from '../../img/edit.png'
import Delete from '../../img/delete.png'
import Menu from '../../Components/Menu/Menu'
import axios from 'axios'
import moment from 'moment'
import { AuthContext } from '../../context/authContext'
import DOMPurify from "dompurify";

const Single = () => {

  const API_URL = `http://localhost:8800/api/posts/`

  const [post, setPost] = useState([]);

  

  const location = useLocation();

  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2]

  const {currentUser} = useContext(AuthContext);

  console.log(currentUser?.username)

  useEffect(()=>{

    const fetchData = async ()=>{
      try {
        const res = await axios.get(`http://localhost:8800/api/posts/${postId}`,{
          withCredentials: true
        })
        setPost(res.data)

      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  }, [location]);

  const handleDelete = async () =>{
    try {
      await axios.delete(`${API_URL}${postId}`,{
        withCredentials: true
      })
      navigate("/")
    
    } catch (err) {
      console.log(err)
    }
  }

  console.log(post)

  return (
    <div className="single">
      <div className="content">
        <img src={`../public/uploads/${post?.img}`} alt="" />
        <div className="user">
          {post.userImg && <img
            src={post.userImg}
            alt=""
          />}
          <div className="info">
            <span>{post?.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser?.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.description),
          }}
        ></p>      </div>
      <Menu cat={post.cat}/>
    </div>
  );
};
export default Single
