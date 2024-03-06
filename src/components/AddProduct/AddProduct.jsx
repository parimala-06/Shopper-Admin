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

// AddProduct.js
import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';
import { baseURL } from '../../utils/constant.js';

const AddProduct = () => {
  const [image, setImage] = useState('');
  const [base64Image, setBase64Image] = useState('');

  const [productDetails, setProductDetails] = useState({
    name: '',
    category: 'women',
    new_price: '',
    old_price: ''
  });

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const imageHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      try {
        const base64Image = await convertToBase64(file);
        setBase64Image(base64Image);
      } catch (error) {
        console.error('Error converting image to base64:', error);
      }
    }
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    const { name, category, new_price, old_price } = productDetails;

    if (!base64Image) {
      alert('Please select an image');
      return;
    }

    try {
      const response = await fetch(`${baseURL}/upload-`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, image: base64Image, category, new_price, old_price })
      });
      console.log(image)
      const data = await response.json();
      if (data.success) {
        alert('Product Added');
        // Clear the form after successful submission
        setProductDetails({ name: '', category: 'women', new_price: '', old_price: '' });
        setImage('');
        setBase64Image('');
      } else {
        alert('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder="Title" />
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className="add-product-selector">
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kids</option>
        </select>
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder="Price" />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder="Offer Price" />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img src={image || upload_area} className="addproduct-thumbnail-img" alt="" />
        </label>
        <input onChange={imageHandler} type="file" name="image" id="file-input" accept="image/*" />
      </div>
      <button onClick={addProduct} className="addproduct-btn">ADD</button>
    </div>
  );
};

export default AddProduct;