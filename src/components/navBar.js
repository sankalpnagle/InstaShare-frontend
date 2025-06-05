import React,{useContext} from 'react' 
import { Link,useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const NavBar =()=>{
  const {state,dispatch} = useContext(UserContext)
  const history = useNavigate()
   const renderList = ()=>{
    if (state) {
      return[
        <li><Link key={""} to="/profile">Profile</Link></li>,
          <li><Link key={""} to="/createpost">Create Post</Link></li>,
          <li><Link key={""} to="/myfollowingposts">My following</Link></li>,
          <button className="btn waves-effect waves-light #ef5350 red  lighten-1" type="submit" name="action"
          onClick={()=>{
            localStorage.clear()
            dispatch({type:"CLEAR"})
            history('/login')
          }}>Logout</button>
      ]
    }else{
        return[
          <li><Link key={""} to="/login">Login</Link></li>,
          <li><Link key={""} to="/signup">Signup</Link></li>
        ]
    }
   }

    return(
      <nav>
      <div className="nav-wrapper white">
        <Link key={""} to={state?"/":"/login"} className="brand-logo usefont">InstaShare</Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {renderList()}
          
        </ul>
      </div>
    </nav>
  )
}

export default NavBar;