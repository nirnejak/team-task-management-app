import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.scss';


const Header = () => {
    return (
        <header style={headerStyle}>
            <h1>TodoList</h1>
            <NavLink style={linkStyle} to="/" activeClassName="is-active" exact={true}>Home</NavLink> | <NavLink style={linkStyle} to="/about" activeClassName="is-active">About</NavLink>
        </header>
    )
};

const headerStyle = {
    background: "#333",
    color: '#fff',
    textAlign: 'center',
    padding: '10px'
};

const linkStyle = {
    color: '#fff',
    textDecoration: 'none'
};

export default Header;