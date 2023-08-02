import React, { useContext, useEffect, useState } from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import Edit from '../../img/edit.png'
import Delete from '../../img/delete.png'
import Menu from '../../Components/Menu/Menu'
import axios from 'axios'
import moment from 'moment'
import { AuthContext } from '../../context/authContext'

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
        const res = await axios.get(`http://localhost:8800/api/posts/${postId}`)
        setPost(res.data)

      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  }, [location]);

  const handleDelete = async () =>{
    try {
      await axios.delete(`${API_URL}${postId}`)
      navigate("/")
    
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="single">
      <div className="content">
        <img src={post?.img}/>
        <div className="user">
          {post.userImage && <img src={post.userImage} />}
        
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.data).fromNow()}</p>
          </div>
          { currentUser?.username === post.username && (<div className="edit">
            <Link to={`/write?edit=2`}>
              <img src={Edit} alt="" />
            </Link>
            <img onClick={handleDelete} src={Delete} />
          </div>)}
        </div>
        <h1>{post.title}</h1>

        <p>{post.description}</p>

        {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem eum beatae debitis voluptatibus, esse cupiditate! Distinctio, voluptatibus? Neque veniam numquam voluptas nesciunt <br /> <br /> earum beatae reiciendis, ut optio necessitatibus minus adipisci. Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis sequi laborum unde non saepe ab nemo voluptate! Autem error quam itaque totam, in harum maiores alias quos amet odio architecto.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem iusto assumenda aliquam sunt illum esse eum, similique adipisci quidem excepturi quia nobis velit reiciendis aspernatur ab temporibus commodi iure. Neque. <br /> <br />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat accusamus delectus, optio quo consectetur impedit quas illum. Neque, itaque tempore dolore accusamus repellendus soluta recusandae dolorem corporis ea, eum facilis.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam provident ipsa quidem, excepturi eaque officiis consequuntur velit impedit omnis voluptas, tempora magnam molestiae neque sapiente quis nostrum? Ullam, sapiente non. <br/> <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero aspernatur explicabo quod dignissimos. Mollitia odio eligendi ullam soluta tempore quidem doloribus iusto voluptate? Eos, officiis quos cumque exercitationem ex alias.
        </p> */}
      </div>
      <Menu/>
    </div>
  )
}

export default Single
