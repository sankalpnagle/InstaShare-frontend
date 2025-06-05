import "./App.css";
import NavBar from "./components/navBar";
import Home from "./components/screens/Home";
import Login from "./components/screens/Login";
import Profile from "./components/screens/Profile";
import Signup from "./components/screens/Signup";
import CreatePost from "./components/screens/CreatePost";
import UserProfile from "./components/screens/UserProfile";
import SubscribeUserPosts from "./components/screens/SubscribeUserPosts";
import React, { useEffect, createContext, useReducer, useContext } from "react";
import { reducer, initialState } from "./reducers/userReducer";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  // Link,
} from "react-router-dom";

export const UserContext = createContext();

const Routing = () => {
  const history = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "USER", payload: user });
    } else history("/login");
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route exact path="profile/" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route exact path="/profile/:userid" element={<UserProfile />} />
        <Route path="/myfollowingposts" element={<SubscribeUserPosts />} />
      </Routes>
    </>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
