import React, { useState, useEffect } from "react";
import { API_URL } from "./Data/apiPath";

const Allproducts = () => {
  const [products, setProducts] = useState([]);

  const productHandler = async () => {
    const firmId = localStorage.getItem("firmId");
    try {
      const response = await fetch(`${API_URL}/product/${firmId}/products`);
      const newProductsData = await response.json();
      setProducts(newProductsData);
      console.log(newProductsData);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to fetch products");
    }
  };

  useEffect(() => {
    productHandler();
  }, []);

  const deleteByProductId = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/product/${productId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        let prods = products.filter(product=>product._id !== productId);
        setProducts(prods);
        confirm("Are You Sure, You Want To Delete?");
        alert("Product Is Deleted Successfully");
      }
    } catch (error) {
      console.log("Unable To Delete The Product");
      console.error(error);
    }
  };

  return (
    <div>
      {products && products.length === 0 ? (
        <p>No Products Added</p>
      ) : (
        <table className="Product-Table">
          <thead>
            <tr>
              <th>productname</th>
              <th>price</th>
              <th>image</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{item.productname}</td>
                    <td>{item.price}</td>
                    <td>
                      {item.image && (
                        <img
                          src={`${API_URL}/uploads/${item.image}`}
                          alt={item.productname}
                        />
                      )}
                    </td>
                    <td>
                      <button onClick={() => deleteByProductId(item._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Allproducts;
