import React from "react";
import { Link } from "react-router-dom";
import "./main.css"; // CSS 파일 import

const Add = () => {
  return (
    <>
      <header>
        <h1>Global Hunger Index Analysis System</h1>
        <nav>
          <ul>
            <li>
              <Link to="/data">
                <button type="button" class="btn btn-primary">Data Page</button>
              </Link>
            </li>
            <li>
              <Link to="/map">
                <button type="button" class="btn btn-primary">Map Page</button>
              </Link>
              
            </li>
            <li><a href="/data">Data Page</a></li>
            <li><a href="/data">Map Page</a></li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Add;
