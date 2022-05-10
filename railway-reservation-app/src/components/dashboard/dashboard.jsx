import { Link } from "react-router-dom";
import "../planJourney/plan.css"

import { useState, useEffect } from "react";
import axios from "axios";


export const Dashboard = () => {


    const [showTrain, setShowTrain] = useState([]);
    const [show, setShow] = useState([]);



    const [user, setUser] = useState([]);



    const getData = () => {
        try {

            axios.get("https://fake-railway-registration-app.herokuapp.com/registered").then(response => setShowTrain(response.data))

            let users = JSON.parse(localStorage.getItem("users"));
            setUser(users);



        }

        catch (err) {
            console.log('err', err)

        }
    }

    useEffect(() => {
        getData()

    }, [])




    console.log("showTrain", showTrain);






    return (
        <div>
            <Link to="/plan">
                <button className="submitBtn">Plan Journey</button>
            </Link>

            <div style={{ margin: "20px 300px" }}>

                <div style={{backgroundColor: "cyan", color: "black", padding: "20px"}}>
                    <h1>Hi, {user.email}</h1>
                    <h2>Here are your bookings</h2>
                </div>

                <div>
                    {
                        showTrain.map((el) => {
                            console.log('el', el?.train_id?.train_name)
                            return (
                                <div  className={showTrain.length===0? "showTrain_null" : "showTrain"}>
                                    <h4>Train No. {el?.train_id?._id} {el?.train_id?.train_name} Express</h4>
                                    <p>Destination: {el?.train_id?.destination}</p>
                                    <p>Arrival Time: {el?.train_id?.departure_time}</p>
                                    <p>Departure Time: {el?.train_id?.arrival_time}</p>

                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>

    )
}