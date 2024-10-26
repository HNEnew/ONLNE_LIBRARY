
import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from 'react-router-dom'
import sidebar from '../../images/sidebar.svg'

export default function Sidebar() {

    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (

        <div className={`sidebar ${isOpen ? "open" : ""}`}>
            <button className="toggle-btn" onClick={toggleSidebar}>
            <img className="sidebarlogo" src={sidebar} alt="" />
                {/* {isOpen ? "Close" : "Menu"} */}
            </button>
            
            <ul className="sidebar-menu">
                <li>
                    <Link to={'/adminlogin'} >Users</Link>
                </li>
                <li>
                    <Link to={'/authors'} >Authors</Link>
                </li>
                <li>
                    <Link to={'/books'} >Books</Link>
                </li>
                <li>
                    <Link to={'/adminlogin'} >Genre</Link>
                </li>
            </ul>
        </div>
    )
}
