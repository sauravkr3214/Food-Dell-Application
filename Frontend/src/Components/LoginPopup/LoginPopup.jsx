import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios'

const LoginPopup = ({SetshowLogin}) => {

    const [CuurentState,SetcurrentState]=useState("Login");
    const {url,SetToken}=useContext( StoreContext)

    // creating state variables to store the details like name,email and password fromt the database to frontend
    const [data,SetData]=useState({
        name:"",
        email:"",
        password:""
    })

    // creating onchangeHnaler,it will take the data like email,name & password from the input fields from the frontend and will save in the backend (MongoDB)  
    const onChangeHandler=(event) =>{
        const name=event.target.name;
        const value=event.target.value;
        SetData(data=>({...data,[name]:value}))
    }

    const onLogin=async(event)=>{
        event.preventDefault()

        // logic to call the api for user authentication with the help of axios
        let newUrl=url;
        if(CuurentState==="Login"){
            newUrl +="/api/user/login"
        }
        else{
             newUrl +="/api/user/register"
        }
        const response=await axios.post(newUrl,data);

        if(response.data.success){
            SetToken(response.data.token);
            localStorage.setItem("token",response.data.token)
            SetshowLogin(false)  //to hide the login popup on frontend after registration
        }
        else{
            alert(response.data.message)
        }
    }
    
  return (
    <div className='login-popup'>
        <form  onSubmit={onLogin} className="login-popup-container">
            <div className='login-popup-title'>
                <h2>{CuurentState}</h2>
                <img onClick={()=>SetshowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-input">
                {/* here input feilds details like name,email & password are integrated in the backend(MongoDB)with the  help of onchangeHnadler fn. and with  the property like name,value & onchange in input fields*/}
                {CuurentState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text"  placeholder='Your name' required/>} 
                <input name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder='Your email' required />
                <input name='password' onChange={onChangeHandler} value={data.password} type="text" placeholder='Password'  required/>
            </div>
            <button type='submit'>{CuurentState==="Sign Up"?"Create Account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By continuing,I agree to the terms of use & privacy policy</p>
            </div>
            {CuurentState==="Login"
            ?<p>Create New Account? <span onClick={()=>SetcurrentState("Sign Up")}> Click here</span></p>
            :<p>Already have an account ? <span onClick={()=>SetcurrentState("Login")} >Login here</span> </p>
            }
        </form>
    </div>
  )
}

export default LoginPopup