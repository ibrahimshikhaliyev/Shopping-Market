import { Link, NavLink } from 'react-router-dom';
import Cart from '../cart/Cart';
import { useState } from 'react';

import { useSelector ,useDispatch} from 'react-redux';
import './Navbar.scss';
import logo from '../../assets/icons/logo.svg';
import basket from '../../assets/icons/Shape.svg';
import profilePic from '../../assets/icons/profilePic.svg'
import Hamburger from '../hamburger/Hamburger';
import {activeSideBar} from '../cartItem/cartItemSlice';

const Navbar=()=>{
    const [active,setActive]=useState(false);
    
    let activeStyle = {
        borderBottom: "4px solid #FF7E1B"
    }; 

    const selected=useSelector(state=>state.selected).length;
    const dispatch=useDispatch();

    window.addEventListener('click',e=>{
        if(e.target===document.querySelector('.shade')){
            setActive(false);
        }
        
    })

    return(
        <nav className="navbar">
            <button className='hamburger_button' onClick={()=>{
                dispatch(activeSideBar(true));
            }}>
               <Hamburger/>
            </button>
            <Link to="/">
                <img src={logo} alt="logo" />
            </Link>

            <div className="links">
                <ul>
                    <li>
                        <NavLink 
                            style={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }
                            to="/" 
                        >Collections</NavLink>
                    </li>
                    <li><NavLink 
                        style={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }
                        to="/men">Men</NavLink></li>
                    <li><NavLink 
                        style={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }
                        to="/women">Women</NavLink></li>
                    <li><NavLink 
                        style={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }
                        to="/about">About</NavLink></li>
                    <li><NavLink 
                        style={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }
                        to="/contacts">Contacts</NavLink></li>
                </ul>
            </div>

            <div className="basket">
                <button onClick={()=>active ? setActive(false) : setActive(true)}>
                    <img src={basket} alt="basket icon" />
                    {selected?<div className="basket_counter">{selected}</div>:null}
                    
                </button>
            </div>
            <div className={`cart_container ${active? 'active' : null}`}>
                <Cart/>
                <div className={`shade ${active? 'active' : null}`}></div>
            </div>
           

            <div className="profile">
                <button>
                   <img src={profilePic} alt="profile " /> 
                </button>
                
            </div>
        </nav>
    )
}

export default Navbar;