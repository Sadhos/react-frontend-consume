import React from 'react'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import Categories from '../components/Categories'
import Announcement from '../components/Announcement'
const Home = ({ products, productCategories }) => {

  return (
    <div>
      <Navbar />
      <Announcement />
      <Slider products={products} />
      <Categories productCategories={productCategories} />
    </div>
  )
}

export default Home