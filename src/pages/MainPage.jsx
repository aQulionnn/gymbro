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
          {posts.map((post, index) => (
            <div style={{boxShadow: '0px 0px 20px 2px rgba(0,0,0,0.2)', borderRadius:'15px', overflow:'hidden'}}>
              <MyPost title={post.title} text={post.text} 
              photo={"https://localhost:7209/api/File/"+post.photo}/>
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
}

export default MainPage;