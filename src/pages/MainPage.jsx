import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, Typography } from '@mui/material';
import Header from '../components/Header';
import { getPosts } from '../request';
import { useNavigate } from 'react-router-dom';
import MyHeader from '../components/MyHeader';
import MyPost from '../components/MyPost';
import style from '../Style/MainPage.module.css'

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
        <div className={style.container}>
          {posts.map((post) => (
            <div >
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