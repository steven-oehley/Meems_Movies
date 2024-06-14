import React from "react";
import ReactDOM from "react-dom/client";
// import App from './App.jsx'
// import './index.css'
import StarRating from "./components/StarRating";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StarRating maxRating={10} />
    <StarRating messages={["Terrible", "Okay", "Average", "Good", "Amazing"]} />
    <StarRating maxRating={10} defaultRating={5} />
  </React.StrictMode>
);
