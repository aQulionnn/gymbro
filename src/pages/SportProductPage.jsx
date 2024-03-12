import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import MyHeader from '../components/MyHeader'
import { useNavigate } from 'react-router-dom';
import { getSportPoducts } from '../request';
import { Card, CardActionArea, CardContent, CardMedia, CircularProgress, Typography } from '@mui/material';
import MyProduct from '../components/MyProduct';

function SportProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try{
        const results = await getSportPoducts();
        setProducts(results)
        setLoading(false)
      }
      catch(e){
        console.error(e)
      }
    }
    fetchData();
  }, [])
  

  return (
    <div>
      <MyHeader />
      {loading? (
        <CircularProgress />
      ) : (
        <div style={{
              display: 'flex', justifyContent: 'space-evenly', marginTop: '50px'}}>
          {products.map((product) => (
            <div style={{boxShadow: '0px 0px 20px 2px rgba(0,0,0,0.2)', borderRadius:'15px', overflow:'hidden'}}>
              <MyProduct
                name={product.name} 
                desc={product.desc} 
                price={product.price+' тг'}
                photo={product.photo}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SportProductPage