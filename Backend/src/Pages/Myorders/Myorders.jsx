import React, { useContext, useEffect, useState } from 'react'
import './Myorders.css'
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';


//creating the logic through which we can fetch all the users data or their orders in the myorders page
const Myorders = () => {

    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);  //creating data and SetData variable to store all the ordered data in the variable

    const fetchOrders = async () => {
        const response = await axios.post(url + "/api/order/userOrders", {}, { headers: { token } }); //calling api for userorders
        setData(response.data.data);  //saving user data in the variable data
        console.log(response.data.data);
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token])

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order,index)=>{
                    return(
                        <div key={index} className='my-orders-order'>
                         <img src={assets.parcel_icon} alt="" />
                         <p>{order.items.map((item,index)=>{   //here we are mapping the data to fetch all the orders in frontend 
                            if(index===order.items.length-1){  //logic to find the last item of the orders,or checking if the orderd item is last or not
                                return item.name+" X "+item.quantity  //getting the quantity of the ordered items
                            }
                            else{
                                return item.name+" X "+item.quantity+" ," //here if the ordered items is not last,it will add a , after the items id 
                            }
                         })}</p>
                         <p>${order.amount}.00</p>  {/* getting the orders amount from the backend*/}
                         <p>Items:{order.items.length}</p> {/*getting all the ordered items on the frontend or on the myorders page*/}
                         <p><span>&#x25cf;</span><b>{order.status}</b></p> {/* here order.staus is showing the food processing text in the forntend */}
                         <button onClick={fetchOrders()} >Track Order</button>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default Myorders