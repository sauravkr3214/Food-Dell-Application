import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our menu</h1>
        <p className='explore-menu-text'>
            Choose from a diverse menu featuring delactable list of dishes.Our mission is to satisfy your cravings and elevate your dining experience. 
        </p>
        <div className='explore-menu-list'>
            {menu_list.map((item,index)=>{ {/*the line of code is executing the list menu img and text from the object created before*/}
                return(
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                        {/*here the line of code is recording the menu list function to store as a usestate and also checking the prev state*/}
                        <img className={category===item.menu_name?"active":" "} src={item.menu_image} alt="" />
                        {/*here the category classname is dynamic and created for the current state of the menu list*/}
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu