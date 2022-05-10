import "./plan.css";
import {Link} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


export const PlanJourney = () => {

    const [data, setData] = useState({});
    const [train, setTrain] = useState({
        dest: ""
    });
    const [showTrain, setShowTrain] = useState([]);


    const getData = () => {
        try {

            axios.get("https://fake-railway-registration-app.herokuapp.com/trains").then(response => setData(response.data))

        }

        catch (err) {
            console.log('err', err)

        }
    }


    console.log('data', data)

    useEffect(() => {
        getData()
    }, [])


    const handleChange = (e) => {
        let { className, value } = e.target;
        setTrain({ ...train, [className]: value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        data.forEach((el) => {
            console.log('el', el)

            if (el.destination === train.dest) {
                setShowTrain([el]);
            }

        })

    }

    console.log("showTrain", showTrain);


    const handleTicket = async (id) => {
        try {

            let users = JSON.parse(localStorage.getItem("users"))

            let user_id = users._id;

            let data = {
                train_id: id,
                user_id: user_id
            }
            
            console.log('data', data)

           let respon = await fetch("https://fake-railway-registration-app.herokuapp.com/registered", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(data),
            })

            let res = await respon.json();
            console.log('res', res)

        }

        catch (err) {
            console.log('err', err)

        }
    }

    return (
        <div>
<Link to="/dashboard">
<button className="submitBtn">Go to Dashboard</button>
</Link>

            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Search Destination..." onChange={(e) => { handleChange(e) }} value={train.dest} className="dest" name="dest" />
                    <input type="submit" value="Search" className="submitBtn" />
                </form>
            </div>
            <div>

                {

                    showTrain.map((el) => {
                        return (
                            <div className={showTrain.length===0? "showTrain_null" : "showTrain"}>
                            <h4>Train No. 00876467 {el.train_name} Express</h4>
                            <p>Arrival Time: {el.departure_time}</p>
                            <p>Departure Time: {el.arrival_time}</p>
                            <p>Destination: {el.destination}</p>
                            <button className="submitBtn" onClick={() => handleTicket(el._id)}>Book Ticket</button>
                        </div>
                        )
                    })
                   


                }
            </div>
        </div>

    )
}