import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'
import { baseURL } from '../../utils/constant'

const ListProduct = () => {

  const[allproducts, setAllProducts] = useState([]);

  const fetchInfo = async() => {
    await fetch(`${baseURL}/allproducts`)
    .then((res)=>res.json())
    .then((data)=>{setAllProducts(data)})
  }

  useEffect(()=>{
    fetchInfo();
  },[])

  const removeProduct = async(id) => {
    await fetch(`${baseURL}/removeproduct`,{
      method: 'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo();
  }

  const displayProductImage = (base64Image) => {
    return `data:image/jpeg;base64,${base64Image}`;
  };
  
  return (
    <div className='listproduct'>
        <h1>All Products List</h1>
        <div className="listproduct-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Price</p>
          <p>Offer</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
        <div className="listproduct-allproducts">
          <hr />
          {allproducts.map((product,index)=>{
            console.log(index)
            return <div key={index} className="listproduct-format-main listproduct-format">
              <img src={displayProductImage(product.image)} alt="" className="listproduct-icon" />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img onClick={()=>{removeProduct(product.id)}} src={cross_icon} alt="" className="listproduct-remove-icon" />
            </div>
          })}
        </div>
    </div>
  )
}

export default ListProduct