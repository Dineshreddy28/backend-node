import React from 'react'

const SideBar = ({showfirmhandler, showproducthandler, showAllproducthandler}) => {
  return (
    <div>
      <div className="sidebarsection">
        <ul>
            <li>User</li>
            <li onClick={showfirmhandler}>Add Firms</li>
            <li onClick={showproducthandler}>Add Products</li>
            <li onClick={showAllproducthandler}>All Products</li>
            
        </ul>
      </div>
    </div>
  )
}

export default SideBar
