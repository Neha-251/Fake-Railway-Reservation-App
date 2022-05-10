import { Routes, Route } from "react-router-dom";
import { Login } from "../components/login/login";
import { Register } from "../components/registration/registration";
import { PlanJourney } from "../components/planJourney/plan";
import {Dashboard} from "../components/dashboard/dashboard";


export const AllRouters = () => {


    return(
        <>

            <Routes>
                <Route exact path="/register" element={<Register />}></Route>
                <Route exact path="/" element={<Login />}></Route>
                
                <Route exact path="/plan" element={<PlanJourney />}></Route>
                <Route exact path="/dashboard" element={<Dashboard />}></Route>


            </Routes>


        </>
    )
}