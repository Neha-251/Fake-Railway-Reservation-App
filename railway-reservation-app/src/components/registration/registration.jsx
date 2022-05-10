import "../login/login.css";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

export const Register = () => {

    const [registerData, setregisterData] = useState({
        email: "",
        password: ""
    });



    const navigate = useNavigate();


    const handleChange = (e) => {
        let {className, value} = e.target; 
         setregisterData({...registerData, [className]: value});
    };


    const handleSubmit = (e) => {
        try {
            e.preventDefault()
            fetch("https://fake-railway-registration-app.herokuapp.com/users", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(registerData),
            });

            navigate("/")
        }

        catch (err) {
            console.log('err', err)

        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input onChange={(e) => { handleChange(e) }} value={registerData.email} name="email" type="text" className="email" required />
                <br />
                <label>Password</label>
                <input  type="password" className="Conpassword"  required />
                <br />
                <label>Confirm Password</label>
                <input onChange={(e) => { handleChange(e) }} value={registerData.password} name="email" type="password" className="password" required />
                <br />

                <input className="submitBtn" type="submit" value="Register" />
            </form>
        </div>
    )
}