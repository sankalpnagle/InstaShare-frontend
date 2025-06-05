import React, { useState,useContext } from 'react'
import { UserContext } from '../../App'
import { Link , useNavigate} from 'react-router-dom'
import M from 'materialize-css'


const Login = () => {
  const {state,dispatch} = useContext(UserContext)
  const history = useNavigate()
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const PostData =()=>{
    fetch("/signin",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        password,
        email
      })
      }).then(res=>res.json())
      .then(data=>{
        console.log(data);
        if(data.error){
          M.toast({html: data.error,classes:"#ef5350 red lighten-1"})
        }else
        {
          localStorage.setItem("jwt",data.token)
          localStorage.setItem("user",JSON.stringify(data.user))
          dispatch({type:"USER",payload:data.user})
          M.toast({html:"signedin successfully",classes:"#00897b teal darken-1"})
          history('/')
        }
    }).catch(err=>{
      console.log(err);
    })
  }

  return (
    <div className='mycard'>
      <div className="card auth-card input-field">
        <h2 className='usefont'>InstaShare</h2>
      
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />
        <button className="btn waves-effect waves-light #42a5f5 blue lighten-1" type="submit" name="action"
        onClick={()=>PostData()}>Submit</button>
        <h6>
            <Link to={"/signup"}>Don't have an Account ?</Link>
          </h6>
      </div>
    </div>
  )
}

export default Login