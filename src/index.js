import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Navbar from "./Navbar.js";
import News from "./News.js";
import reportWebVitals from "./reportWebVitals";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<News  key="general" pageSize={6} country="in" category="general" />}/>
        <Route exact path="business" element = {<News key="business" pageSize={6} country="in" category="business" />}/>
        <Route exact path="entertainment" element = {<News key="entertainment" pageSize={6} country="in" category="entertainment" />}/>
        <Route exact path="science" element ={<News key="science" pageSize={6} country="in" category="science" />}/>
        <Route exact path="sports" element ={<News key="sports" pageSize={6} country="in" category="sports" />}/>
        <Route exact path="technology" element={ <News  key="technology" pageSize={6} country="in" category="technology" />}/>
      </Routes>
    </Router>
    </React.StrictMode>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
