import React, { useEffect, useState } from 'react'
import './Orders.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'




const Orders = ({ url }) => {

  const [orders, setOrders] = useState([]);  //creating a state variable to store all the ordered data coming from the api(/api/order/list)

  const fetchAllOrders = async (req, res) => {
    const response = await axios.get(url + "/api/order/list"); //calling api for food lsit ordered by the user
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    }
    else {
      toast.error("Error")
    }
  }

  //creating the logic for integrating the status of food on the frontend

  const stausHandler=async(event,orderId)=>{
   const response=await axios.post(url+"/api/order/status",{
    orderId,
    status:event.target.value
   })
   if(response.data.success){
    await fetchAllOrders();
   }

  }

  useEffect(() => {
    fetchAllOrders();
  },[]);


  return(
    <div className="order add">
      <h3>Orders Page</h3>
      <div className="order-list">
        {orders.map((order,index)=>(
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item,index)=>{
                  if(index===order.items.length-1){
                    return item.name+" X "+ item.quantity
                  }
                  else{
                    return item.name+" X "+ item.quantity+ " ,"
                  }
                })}
              </p>
              <p className="order-item-name">{order.address.firstName+""+order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street+","}</p>
                <p>{order.address.city+" ,"+order.address.zipcode+","+order.address.state}</p>
                <p>{order.address.country}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items:{order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(event)=>stausHandler(event,order._id)} value={order.status} >
              <option value="Food Processing">Food Processing</option>
              <option value="Out For Delivery">Out For Dlivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders