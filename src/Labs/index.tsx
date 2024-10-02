import { disconnect } from "process";
import Lab1 from "./Lab1";
import { Route, Routes } from "react-router";
import TOC from "./TOC";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";

export default function Labs(){
    return (
        <div className="container-fluid">
            <h1>Da-En, Yu</h1>
            <TOC />
            <h1>Labs</h1>
            <Routes>
                <Route path = "/Lab1" element = {<Lab1 />} />
                <Route path = "/Lab2" element = {<Lab2 />} />
                <Route path = "/Lab3" element = {<Lab3 />} />
            </Routes>
        </div>
    );
}