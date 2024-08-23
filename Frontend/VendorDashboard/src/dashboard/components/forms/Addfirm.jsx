import React, { useState } from 'react';
import { API_URL } from '../../Data/apiPath';

const Addfirm = ({showproducthandler}) => {
  const [firmname, setFirmname] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);

  const handleCategory = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleRegion = (e) => {
    const value = e.target.value;
    if (region.includes(value)) {
      setRegion(region.filter((item) => item !== value));
    } else {
      setRegion([...region, value]);
    }
  };

  const handleImage = (e) => {
    const value = e.target.files[0];
    setFile(value);
  };

  const firmHandler = async (event) => {
    event.preventDefault();
  try {
      const loginToken = localStorage.getItem('loginToken');
      console.log(loginToken);
      if (!loginToken) {
        console.log("User authentication failed");
      }

      const formData = new FormData();
      formData.append('firmname', firmname);
      formData.append('area', area);
      category.forEach((value) => {
        formData.append('category', value);
      });
      region.forEach((value) => {
        formData.append('region', value);
      });
      formData.append('offer', offer);
      formData.append('file', file);

      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: 'POST',
        headers: {
          'token': `${loginToken}`
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        alert("Firm added successfully");
        setFirmname("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        showproducthandler();
      }
      const firmId=data.firmId;
      localStorage.setItem('firmId', firmId);
    } catch (error) {
      console.error("Failed to add firm", error);
    }
  };

  return (
    <div className="firmsection">
      <form className='firmform' onSubmit={firmHandler}>
        <h2>Vendor Firm</h2>
        <label>Firm Name</label>
        <input type="text" name='firmname' value={firmname} onChange={(e) => setFirmname(e.target.value)} />

        <label>Area</label>
        <input type="text" name= 'area' value={area} onChange={(e) => setArea(e.target.value)} />

        <div className="catsection">
          <label>Category</label>
        </div>
        <div className="twoboxes">
          <div className="box">
            <label>Veg</label>
            <input type='checkbox'  checked={category.includes('Veg')} value='Veg' onChange={handleCategory} />
          </div>
          <div className="box">
            <label>Non-Veg</label>
            <input type='checkbox' checked={category.includes('Non-veg')} value='Non-veg' onChange={handleCategory} />
          </div>
        </div>

        <div className="catsection">
          <label>Region</label>
        </div>
        <div className="twoboxes">
          <div className="box">
            <label>South-Indian</label>
            <input type='checkbox' checked={region.includes('South indian')} value='South indian' onChange={handleRegion} />
          </div>
          <div className="box">
            <label>North-Indian</label>
            <input type='checkbox' checked={region.includes('North indian')} value='North indian' onChange={handleRegion} />
          </div>
          <div className="box">
            <label>Chinese</label>
            <input type='checkbox' checked={region.includes('Chinese')} value='Chinese' onChange={handleRegion} />
          </div>
        </div>

        <label>Offer</label>
        <input type="text" name='offer' value={offer} onChange={(e) => setOffer(e.target.value)} />

        <label>Image</label>
        <input type="file" onChange={handleImage} />

        <div className="submitsection">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Addfirm;
