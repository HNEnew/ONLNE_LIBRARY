import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header className="App-header">
            <h1 className="title">LIBRARY</h1>
            <div className="nav">
                <Link to={'/'} >Home</Link>
                <Link to={'/adminlogin'} >About</Link>
                <Link to={'/adminlogin'} >Services</Link>
                <Link to={'/adminlogin'} >Contact</Link>
            </div>
            <i className="fa-regular fa-circle-user user-icon hover-link" id="login-icon">
                <span className='tooltip'>Login</span>
            </i>
        </header>
    )
}
