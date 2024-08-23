import React, { useState } from 'react';
import { API_URL } from '../../Data/apiPath';

const Addproduct = () => {
  const [productname, setproductname] = useState('');
  const [price, setprice] = useState('');
  const [bestseller, setbestseller] = useState(false);
  const [category, setcategory] = useState([]);
  const [description, setdescription] = useState('');
  const [file, setfile] = useState(null);

  const handlecategory = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setcategory(category.filter((item) => item !== value));
    } else {
      setcategory([...category, value]);
    }
  };

  const handlebestseller = (e) => {
    setbestseller(e.target.value === 'yes');
  };

  const handlefile = (e) => {
    setfile(e.target.files[0]);
  };

  const productHandler = async (event) => {
    event.preventDefault();
    try {
      const loginToken = localStorage.getItem('loginToken');
      const firmId=localStorage.getItem('firmId')
      if (!loginToken || !firmId ) {
        console.log('User authentication failed');
      }

      const formData = new FormData();
      formData.append('productname', productname);
      formData.append('price', price);
      category.forEach((value) => {
        formData.append('category', value);
      });
      formData.append('bestseller', bestseller);
      formData.append('description', description);
      formData.append('file', file);

      const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        alert('Product added successfully');
      } else {
        console.log('Error:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="firmsection">
      <form className="firmform" onSubmit={productHandler}>
        <h2>Vendor Product</h2>
        <label>Product Name</label>
        <input
          type="text"
          value={productname}
          onChange={(e) => setproductname(e.target.value)}
        />
        <label>Price</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setprice(e.target.value)}
        />
        <div className="catsection">
          <label>Category</label>
        </div>
        <div className="twoboxes">
          <div className="box">
            <label>Veg</label>
            <input
              type="checkbox"
              checked={category.includes('Veg')}
              value="Veg"
              onChange={handlecategory}
            />
          </div>
          <div className="box">
            <label>Non-Veg</label>
            <input
              type="checkbox"
              checked={category.includes('Non-Veg')}
              value="Non-Veg"
              onChange={handlecategory}
            />
          </div>
        </div>
        <div className="catsection">
          <label>Best-seller</label>
        </div>
        <div className="twoboxed"> 
        <div className="box1">
          <label>Yes</label>
          <input type="radio" value="true" checked={bestseller===true} onChange={handlebestseller} />
        </div>
        <div className="box2">
          <label>No</label>
          <input type="radio" value="false" checked={bestseller===false} onChange={handlebestseller} />
        </div>
        </div>
        
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        />
        <label>Product Image</label>
        <input type="file" onChange={handlefile} />
        <div className="submitsection">
          <button type="submit">Submit</button>
        </div>
        <br />
      </form>
    </div>
  );
};

export default Addproduct;
