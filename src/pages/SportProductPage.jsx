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
              display: 'flex', flexWrap: 'wrap',justifyContent: 'center', marginTop: '25px', gap: '30px'}}>
          {products.map((product) => (
            <div>
              <MyProduct
                id={product.id}
                name={product.name} 
                desc={product.desc} 
                price={product.price}
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