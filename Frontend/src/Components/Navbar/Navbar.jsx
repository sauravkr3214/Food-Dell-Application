import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

const Navbar = ({SetshowLogin}) => {

  const [menu,setMenu] = useState("home");

  const {getToatalCartAmount ,token ,SetToken}=useContext(StoreContext); {/* function exported to add dot from the context file*/}
  const navigate=useNavigate();

  const logout= ()=>{
    localStorage.removeItem("token")  //to logout from the frontend, we have to remove the saved token in backend or database(MnDB)
    SetToken(); //settting the token state as an empty string 
    navigate("/") //when the user will logout, this navigate function will navigate them to the home page
  }

  return (
    <div className='navbar'>
        <Link to='/'> <img src={assets.logo} alt="" className="logo" /></Link>
        <ul className='navbar-menu'>
          <Link to='/' onClick={()=>setMenu("home")} className={menu === "home"? "active":""}>home</Link>
           <a href='#explore-menu'  onClick={()=>setMenu("menu")} className={menu === "menu"? "active":""}>menu</a>
           <a href='#app-download' onClick={()=>setMenu("mobile app")} className={ menu === "mobile app" ? "active":""}>mobile app</a>
           <a href='#footer' onClick={()=>setMenu("contact us")} className={ menu === "contact us"? " active":""}>contact us</a>
        </ul>
        <div className='navbar-right'>
            <img src={assets.search_icon} alt="" />
            <div className='navbar-search-icon'>
              <Link to='/cart' ><img src={assets.basket_icon} alt="" /></Link>
                <div className={getToatalCartAmount()===0 ? "":"dot"}></div> {/* added dynamic dot class to showcase a dot in cart img when an item is added to the cart*/}
            </div>
            {!token?<button onClick={()=>SetshowLogin(true)} >sign in </button>
            :<div className='Navbar-profile'>
              <img src={assets.profile_icon} alt="" />
              <ul className="nav-profile-dropdown">
                <li onClick={()=>navigate('/myorders')} > <img src={assets.bag_icon} alt="" /><p>Orders</p> </li> {/* here using usenavigate fn. to redirect the user on myorders page by clicking on myorders*/}
                <hr />
                <li onClick={logout}> <img  src={assets.logout_icon} alt=""/><p>Logout</p></li>
              </ul>
            </div>
            }
        </div>
    </div>
  )
}

export default Navbar