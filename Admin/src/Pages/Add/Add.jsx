import React, {  useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets.js'
import axios from 'axios'
import { toast } from 'react-toastify'


const Add = ({url}) => {

    const [image, SetImage] = useState(false);

    {/* state variable to store the name,desc,price & category while adding the item */ }
    const [Data, SetData] = useState({
        name: "",
        description: " ",
        price: " ",
        category: "Salad",
    })
    {/* here onchangehandler fn. is used to take the values from all the input fileds & update the values*/ }
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        SetData(Data => ({ ...Data, [name]: value }))
    }
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData(); //this form data is to store all the data like name,desc,price & category in one form
        formData.append("name", Data.name)
        formData.append("description", Data.description)
        formData.append("price", Number(Data.price))
        formData.append("category", Data.category)
        formData.append("image", image)
        {/* all these formData.append will add all the ipnput values in a form*/ }

        const response = await axios.post(`${url}/api/food/add`,formData);

        {/* here axios.post is an endpoint & through this endpoint we are uploading the formData in the backend which includes name,desc,price,image etc. & the url is helping to call the api*/ }

        if (response.data.success) {
            SetData({
                name: "",
                description: " ",
                price: " ",
                category: "Salad",
            })
            SetImage(false)
            toast.success(response.data.message)
        }
        else {

        }

    }

    return (
        <div className='add' onSubmit={onSubmitHandler}>
            <form className='flex-col'>
                <div className='add-img-uplaod flex-col'>
                    <p>Image Upload</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image):assets.upload_area} alt="" /> {/* code to preview or see the image while uploading*/}
                    </label>
                    <input onChange={(e) => SetImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>
                <div className="add-product-name flex-col" >
                    <p>Product name</p>
                    <input onChange={onChangeHandler} value={Data.name} type="text" name="name" placeholder='Type here' />
                </div>
                <div className="add-product-deescription flex-col">
                    <p>Add Description</p>
                    <textarea onChange={onChangeHandler} value={Data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select onChange={onChangeHandler} name="category">
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure veg">Pure veg</option>
                            <option value="Paasta">Paasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={Data.price} type="number" name='price' placeholder='$20' />
                    </div>
                </div>
                <button onClick={(onChangeHandler)} type='submit' className='add-btn'>Add</button>
            </form>
        </div>
    )
}

export default Add