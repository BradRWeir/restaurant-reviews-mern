import React, { useState } from "react";
import {useNavigate} from "react-router-dom"

function Login({_login}) {
    const initialUserState = {
        name: "",
        id: ""
    };

    const [user, setUser] = useState(initialUserState);

    let navigate = useNavigate();

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({...user, [name]: value});
    };

    const login = () => {
        console.log(_login);
        _login(user);
        navigate('/');
    }
  return (
    <div className="submit-form">
        <div>
            <div className="form-group">
                <label htmlFor="user">Username</label>
                <input type="text" className="form-control" id="name" required value={user.name} onChange={handleInputChange} name="name" />
            </div>
            <div className="form-group">
                <label htmlFor="id">ID</label>
                <input type="text" className="form-control" id="id" required value={user.id} onChange={handleInputChange} name="id" />
            </div>
            <button onClick={login} className="btn btn-success">
                Login
            </button>
        </div>
    </div>
  );
}

export default Login;