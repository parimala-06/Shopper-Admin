// import React, { useState } from 'react'
// import './AddProduct.css'
// import upload_area from '../../assets/upload_area.svg' 
// import { baseURL } from '../../utils/constant.js';


// const AddProduct = () => {

//   const[image, setImage] = useState(false);
//   const[productDetails, setProductDetails] = useState({
//     id:"",
//     name:"",
//     image:"",
//     category:"women",
//     new_price:"",
//     old_price:""
//   })

//   const imageHandler = (e)=>{
//     setImage(e.target.files[0]);
//   };
  
//   const changeHandler = (e)=>{
//     setProductDetails({...productDetails,[e.target.name]:e.target.value})
//   }

//   const Add_product = async()=>{
//     console.log(productDetails);
//     let responseData;
//     let product = productDetails;

//     let formData = new FormData();
//     formData.append('product', image);

//     await fetch(`${baseURL}/upload`,{
//       method: 'POST',
//       headers:{
//         Accept:'application/json',
//       },
//       body:formData,
//     }).then((resp)=> resp.json()).then((data)=>{responseData = data})
//     if(responseData.success){
//       product.image = responseData.image_url;
//       console.log(product);
//       await fetch(`${baseURL}/addproduct`,{
//         method: 'POST',
//         headers:{
//           Accept:'application/json',
//           'Content-Type': 'application/json',
//         },
//         body:JSON.stringify(product),
//         }).then((resp)=>resp.json()).then((data)=>{data.success?alert("Product Added"):alert("Failed")
//       })
//     }
//   }

//   return (
//     <div className='addproduct'>
//       <div className="addproduct-itemfield">
//         <p>Product tile</p>
//         <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Title'/>
//       </div>
//       <div className="addproduct-price">
//         <div className="addproduct-itemfield">
//           <p>Price</p>
//           <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Price' />
//         </div>
//         <div className="addproduct-itemfield">
//           <p>Offer Price</p>
//           <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Offer Price' />
//         </div>
//       </div>
//       <div className="addproduct-itemfield">
//         <p>Product Category</p>
//         <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
//           <option value="women">Women</option>
//           <option value="men">Men</option>
//           <option value="kid">Kids</option>
//         </select>
//       </div>
//       <div className='addproduct-itemfield'>
//         <label htmlFor="file-input">
//           <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumbnail-img' alt="" />
//         </label>
//         <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
//       </div>
//       <button onClick={()=>{Add_product()}} className='addproduct-btn'>ADD</button>
//     </div>
//   )
// }

// export default AddProduct

import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg' 
import { baseURL } from '../../utils/constant.js';

const AddProduct = () => {

  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    id:"",
    name:"",
    image:"",
    category:"women",
    new_price:"",
    old_price:""
  })

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    }
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  
  const changeHandler = (e) => {
    setProductDetails({...productDetails, [e.target.name]: e.target.value})
  }

  const Add_product = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    // Check if image is a base64 string
    if (image.startsWith("data:image")) {
      product.image = image;
    }

    await fetch(`${baseURL}/addproduct`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    }).then((resp) => resp.json()).then((data) => {
      data.success ? alert("Product Added") : alert("Failed");
    });
  }

  return (
    <div className='addproduct'>
      <div className="addproduct-itemfield">
        <p>Product tile</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Title'/>
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Price' />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Offer Price' />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kids</option>
        </select>
      </div>
      <div className='addproduct-itemfield'>
        <label htmlFor="file-input">
          <img src={image ? image : upload_area} className='addproduct-thumbnail-img' alt="" />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
      </div>
      <button onClick={Add_product} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct
