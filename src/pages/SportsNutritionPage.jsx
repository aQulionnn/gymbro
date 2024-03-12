import React, { useState, useEffect } from 'react';
import { Button, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Typography } from '@mui/material';
import Header from '../components/Header';
import { getPosts, getSportsNutrition } from '../request';
import { useNavigate } from 'react-router-dom';
import MyHeader from '../components/MyHeader';
import MySportsNutrition from '../components/MySportsNutrition';



function SportsNutritionPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await getSportsNutrition();
        setProducts(results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching test results:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <MyHeader />
      {loading ? (
        <CircularProgress />
      ) : (
        <div style={{
              display: 'flex', justifyContent: 'space-evenly', marginTop: '50px'}}>
          {products.map((product, index) => (
            <div style={{boxShadow: '0px 0px 20px 2px rgba(0,0,0,0.2)', borderRadius:'15px', overflow:'hidden'}}>
              <MySportsNutrition 
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
  );
}

export default SportsNutritionPage;