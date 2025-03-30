import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
const Cart = () => {

  const { CartItems, food_list, removeFromCart, getToatalCartAmount,url } = useContext(StoreContext);

  const navigate = useNavigate();
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className='cart-items-title'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Qunatity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (CartItems[item._id] > 0) {
            return (
              <div>
                <div className='cart-items-title cart-items-item'>
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p> {/*here item name , item price etc. coming ftom the object created in assets.js cartitems as an object*/}
                  <p>${item.price}</p>
                  <p>{CartItems[item._id]}</p>
                  <p>${item.price * CartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>X</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
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
          <button onClick={() => navigate('/order')} >PROCEED TO CHECKOUT</button> {/* /order is coming from app.jsx file where it is mounted with placeorder.jsx file*/}
        </div>
        <div className='cart-promocode'>
          <div>
            <p>If you have Promocode , Enter Here</p>
          </div>
          <div className="cart-promocode-input">
            <input type="text" placeholder='Promocode' />
            <button>Submit</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart