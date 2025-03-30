import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';


const Verify = () => {

    const [searchParams,setSearchParams]=useSearchParams();
    const success=searchParams.get("success")  //storing the success status in the success variable and we are getting the success status from the parameters of the stripe payment page or url 
    const orderId=searchParams.get("orderId")  //storing the orderId in the variable orderId form the url of stripe payment page
    const {url}=useContext(StoreContext);  //accessing or calling the url form the storecontext file
    const navigate=useNavigate();   //using this navigate function to send the user to the order page

    const verifyPayment= async()=>{
        const response= await  axios.post(url+"/api/order/verify",{success,orderId});
        if(response.data.success){  //checking the status of the payment done or not
            navigate("/myorders");  //if payment status get successful, the user will navigate or sent to the myorder page
        }
        else{
            navigate("/") //if payment got not successful , the user will be navigted or sent to the home page
        }
    }
    useEffect(()=>{
        verifyPayment();
    },[]);

    //creating logic for the getting success status(true or false) from the url of the  stripe payment page and save into the backend
  return (
    <div className='verify'>
        <div className="spinner">

        </div>
    </div>
  )
}

export default Verify