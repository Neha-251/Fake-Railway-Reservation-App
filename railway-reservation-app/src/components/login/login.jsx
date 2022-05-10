import "./login.css";
import axios from "axios";
import { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";


export const Login = () => {

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const [data, setData] = useState([]);


    const handleChange = (e) => {
        let { className, value } = e.target;
        setLoginData({ ...loginData, [className]: value });
    };


    const navigate = useNavigate();



    const getData = () => {
        try {

            axios.get("https://fake-railway-registration-app.herokuapp.com/users").then(response => setData(response.data))

        }

        catch (err) {
            console.log('err', err)

        }
    }


    console.log('data', data)

    useEffect(() => {
        getData()
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();

        let count = 0;
        data.forEach((el) => {
            console.log('el.email', el.email)
            console.log('loginData.email', loginData.email)
            if (loginData.email === el.email && loginData.password === el.password) {
               
                alert("You are Successfully Loged In");
                localStorage.setItem("users", JSON.stringify(el))

                navigate("/dashboard");

            } else {
                count++;
            }

            if(count > data.length){
                alert("Wrong Credentials");
            }
        })

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input onChange={(e) => { handleChange(e) }} value={loginData.email} name="email" type="text" className="email" required />
                <br />
                <label>Password</label>
                <input onChange={(e) => { handleChange(e) }} value={loginData.password} name="email" type="password" className="password" required />
                <br />

                <input className="submitBtn" type="submit" value="Register" />

                <Link to="/register">
                <button className="changebtn">New User? Register</button>
                </Link>
            </form>
        </div>
    )
}