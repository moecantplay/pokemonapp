import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const navList = [
  {
    label: "All Pokemons",
    path: "/"
  },
  {
    label: "My Pokemons",
    path: "/favorites"
  }
];

const Header = () => {
  return (
    <header className="poke__header">
      <div className="container">
        <ul className="poke__header-nav">
          {navList.map(item => (
            <li key={item.path}>
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
