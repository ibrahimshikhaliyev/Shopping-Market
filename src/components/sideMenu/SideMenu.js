import './SideMenu.scss';
import {  NavLink } from 'react-router-dom';
import closeIcon from '../../assets/icons/close1.svg';
import { useDispatch,useSelector } from 'react-redux';
import {activeSideBar} from '../cartItem/cartItemSlice';


const SideMenu=()=>{
    const dispatch=useDispatch();
    const sidebarState=useSelector(state=>state.sideBar);

    const closeSideBar=()=>{
        dispatch(activeSideBar(false))
    }
    
    return(
        <>
            <div className={`menu_container ${ sidebarState?'menu_container_active':null}`}>
                        <span class="close" onClick={()=>{
                            closeSideBar();
                        }}> 
                        <img src={closeIcon} alt="close" />
                    </span>
                    <ul>
                        <li>
                            <NavLink onClick={()=>{
                            closeSideBar();
                        }}
                                to="/" 
                            >Collections</NavLink>
                        </li>
                        <li><NavLink onClick={()=>{
                            closeSideBar();
                        }}
                            
                            to="/men">Men</NavLink></li>
                        <li><NavLink onClick={()=>{
                            closeSideBar();
                        }}
                            
                            to="/women">Women</NavLink></li>
                        <li><NavLink onClick={()=>{
                            closeSideBar();
                        }}
                            
                            to="/about">About</NavLink></li>
                        <li><NavLink onClick={()=>{
                            closeSideBar();
                        }}
                            
                            to="/contacts">Contacts</NavLink></li>
                    </ul>
                </div>
                <div className={`menu_shade ${sidebarState?'menu_shade_active':null}`}
                    onClick={()=>{
                        closeSideBar();
                    }}
                ></div>
        </>
          
    
        
    )
}


export default SideMenu;