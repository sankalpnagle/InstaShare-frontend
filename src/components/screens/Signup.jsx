import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";

const SignUp = () => {
  const history = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);

  useEffect(() => {
    if (url) {
      uploadFields();
    }
  }, [url]);

  const uploadPic = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "sankalpn");
    fetch("https://api.cloudinary.com/v1_1/sankalpn/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const uploadFields = () => {
    fetch("/api/auth/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
        email,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#ef5350 red lighten-1" });
        } else {
          M.toast({ html: data.message, classes: "#00897b teal darken-1" });
          history("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const PostData = () => {
    if (image) {
      uploadPic();
    } else uploadFields();
  };

  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2 className="usefont">InstaShare</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <div className="file-field input-field">
          <div className="btn #42a5f5 blue darken-1">
            <span>Upload Pic</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <button
          className="btn waves-effect waves-light #42a5f5 blue darken-2"
          type="submit"
          name="action"
          onClick={() => PostData()}
        >
          Submit
        </button>
        <h6>
          <Link to={"/login"}>Already have an Account ?</Link>
        </h6>
      </div>
    </div>
  );
};

export default SignUp;
