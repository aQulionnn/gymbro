import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, Typography } from '@mui/material';
import Header from '../components/Header';
import { getPosts } from '../request';
import { useNavigate } from 'react-router-dom';
import MyHeader from '../components/MyHeader';
import MyPost from '../components/MyPost';

function MainPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await getPosts();
        setPosts(results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching test results:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <MyHeader/>
      {loading ? (
        <CircularProgress />
      ) : (
        <div style={{display: 'flex', justifyContent: 'space-evenly', marginTop: '50px'}}>
          {posts.map((post) => (
            <div style={{boxShadow: '0px 0px 20px 2px rgba(0,0,0,0.2)', borderRadius:'15px', overflow:'hidden'}}>
              <MyPost 
                id={post.id}
                title={post.title} 
                text={post.text} 
                photo={post.photo}
              />
            </div>
          ))}
        </div>
      )}   
    </div>
  );
}

export default MainPage;