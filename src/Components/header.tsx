import React from "react";
import Home from "./home";
import { Link } from "react-router-dom";

type Props = {};

const Header = (props: Props) => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
