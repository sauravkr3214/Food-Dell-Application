import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import {toast} from 'react-toastify'

const List = ({url}) => {


  const [list,Setlist]=useState([]);

  const fetchList=async()=>{
    const response=await axios.get(`${url}/api/food/list`);
    

    if (response.data.success) {
      Setlist(response.data.data);
      
    } else {
      toast.error("Error")
      
    }
  }

  const removeFood = async(foodId)=>{
   const response=await axios.post(`${url}/api/food/remove`,{id:foodId}) //food item removed from the database 
   await fetchList();
   if (response.data.success) {
    toast.success(response.data.message)
    
   } else {
    toast.error("Error")
    
   }

  }
  
  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{   //method to show all the added products in the list items option, here map method is returning all the contents
          return(
            <div className='list-table-format' key={index}>
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>removeFood(item._id)} className='cursor'>X</p> {/* on the click of this button the removeFood fn. will add  the  id of food item from list itme*/}
            </div>
          )

        })}
      </div>
    </div>
  )
}

export default List