import { createContext,useEffect, useState } from "react";
import axios from 'axios'





export const StoreContext=createContext(null)

const StoreContextProvider = (props)=>{
    const [CartItems,SetcartItems]=useState({});

    const url="http://localhost:4000"

    const [food_list,setFoodList]=useState([]);

    const [token,SetToken]=useState("");

    const AddtoCart= async (itemId)=>{  //addtoCart

        if(!CartItems[itemId]){
            SetcartItems((prev)=>({...prev,[itemId]:1}))  //checking if the food item already avialable in the cart
        }
        else{
            SetcartItems((prev)=>({...prev,[itemId]:prev[itemId]+1})) // if food item avialable in the cart,it will increase the food item quantitiy by 1
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}}) //adding the cartitems avialable in the cart,from the frontend  to the backend 
        }
        
    }
    const removeFromCart= async  (itemId)=>{
        SetcartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}));
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}}) //adding the cartitems avialable in the cart,from the frontend  to the backend

        }
        
    }

    const getToatalCartAmount=()=>{
        let totalAmount=0;
        for(const item in CartItems){
            if(CartItems[item] > 0){
                let itemInfo=food_list.find((product)=>product._id===item);
                totalAmount+=itemInfo.price* CartItems[item];
            }
        }
        return totalAmount;
    }

   const fetchFoodList=async ()=>{
      const response=await axios.get(url+"/api/food/list");
      setFoodList(response.data.data)
   }

   //when cart items or food  is finally added to the cart with their quantity, then after refreshing the page the the food items or cartitems disappears from the home page 
   //to fix the problem of disaaperance of food items from the home page the following code has been written 

   const loadCartData= async(token)=>{
      const response=await axios.post(url+"/api/cart/get",{},{headers:{token}}); 
      SetcartItems(response.data.CartData);  //saving cart data in the setcarrtItems variable



   }
   
    const contextValue= {
        food_list,
        CartItems,
        SetcartItems,
        AddtoCart,
        removeFromCart,
        getToatalCartAmount,
        token,
        SetToken,
        url
    }

    useEffect(()=>{
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                SetToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token")); //getting the token to save or store the cartitems permannently in the add icon(+) on the home page 
            }
        }
        loadData();
    },[])

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
