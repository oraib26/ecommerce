import React from "react";
import "./home.css";
import { Button } from "react-bootstrap";

function Home() {
  return (
    <div className="vh-100 homePage">
      <div className="header w-50 h-100 d-flex align-items-center justify-content-center">
        <div className="">
          <h1 className="text-dark w-75 text-center mb-4">
            Welcome To Your Area For Shopping ..
          </h1>
          <div className=" w-75 d-flex justify-content-center">
            <Button className="btn btn-dark rounded-0 rounded-bottom">Sign In Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
