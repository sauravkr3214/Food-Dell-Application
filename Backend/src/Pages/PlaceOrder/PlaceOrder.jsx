import React, { useContext,useEffect,useState} from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getToatalCartAmount,token,food_list,CartItems,url} = useContext(StoreContext);

  //creating a state variable to store the delievery information from the order page entered by a user

  const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    zipcode:"",
    state:"",
    country:"",
    phone:""
  })

  //creating the onchangehandler function so that the above state varible object data like name,city,state etc. can be changed into the input fields of frontend  fetching from the backend 
  const onChangeHandler = (event) =>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value})) //updating the name field with the new value
  }
  //creating a function to go to procced to payment button and to order finally
  const placeOrder= async(event)=>{
    event.preventDefault();
    let orderItems=[];     //giving an structure to the ordered items in the cart
    food_list.map((item)=>{
      if(CartItems[item._id]>0){                       //checking if the any item in the cart
        let itemInfo=item;                            //if the item available,it will first store in the itemInfo varaible as an object 
        itemInfo["quantity"]=CartItems[item._id];    //here we are getting the qauntity the of an item added or ordered 
        orderItems.push(itemInfo);                    //sending or pushing the ordered data in the orderItems variable
      }
    })
    let orderData={
      address:data,   //storing address from the data object defined above in usestate
      items:orderItems,
      amount:getToatalCartAmount()+2,
    }
    let response=await axios.post(url+"/api/order/place",orderData,{headers:{token}});  //sending api data to the backend
    if(response.data.success){
      const {session_url}=response.data;
      window.location.replace(session_url);  //sending the user to the session url
    }
    else{
      alert("Error");
    }
  }

  //logic to hide myorders page,if the user gets logout 

  const navigate=useNavigate();

   useEffect(()=>{
    if(!token){
      navigate('/Cart')
    }
    else if(getToatalCartAmount()=== 0){
      navigate('/Cart')
    }
   },[token])

  //here in the below divs onchangehandler function is updating the all realted input fields and fetching or storing the data in the frontend from the backend
  return(
    <form onSubmit={placeOrder} className='place-order'>
      <div className='place-order-left'>
        <h2 className='title'>Delivery Information</h2>
        <div className="multi-fields">
          <input  required name='firstName' onChange={onChangeHandler}  value={data.firstName} type="text" placeholder='First Name'/>
          <input  required name='lastName' onChange={onChangeHandler}  value={data.lastName} type="text" placeholder='Last Name'/>
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email}  type="text" placeholder='Email' />
        <input required name='street' onChange={onChangeHandler}  value={data.street}  type="text"  placeholder='Street'/>
        <div className="multi-fields">
          <input  required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder="City"/>
          <input required name='zipcode' onChange={onChangeHandler}  value={data.zipcode} type="text" placeholder='Zip code'/>
        </div>
        <div className="multi-fields">
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State'/>
          <input required name='country' onChange={onChangeHandler}  value={data.country} type="text" placeholder='Country'/>
        </div>
        <input name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className='place-order-right'>
      <div className='cart-total'>
          <h2>Cart Totals</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>${getToatalCartAmount()}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delievery Fee</p>
              <p>${getToatalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <b>Total</b>
              <b>${getToatalCartAmount() === 0 ? 0 : getToatalCartAmount() + 2}</b>  {/* obtaining the amount from the function*/}
              {/* here ternary oprator ensuring that the toatl amount will not showing before adding any item in the cart*/}
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button> 
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder