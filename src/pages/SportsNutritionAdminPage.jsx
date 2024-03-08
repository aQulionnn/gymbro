import React, { useState, useEffect } from 'react';
import { Button, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Typography } from '@mui/material';
import Header from '../components/Header';
import { getPosts, getSportsNutrition } from '../request';
import { useNavigate } from 'react-router-dom';
import HeaderAdmin from '../components/HeaderAdmin';



function SportsNutritionAdminPage() {
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
      <HeaderAdmin />
      {loading ? (
        <CircularProgress />
      ) : (
        products.map((product, index) => (
          <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
          <CardMedia
          component="img"
          height="140"
          image={'https://localhost:7209/api/File/'+product.photo}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.desc}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
        ))
      )}
    </div>
  );
}

export default SportsNutritionAdminPage;