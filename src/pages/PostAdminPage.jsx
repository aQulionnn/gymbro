import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, Typography } from '@mui/material';
import Header from '../components/Header';
import { getPosts } from '../request';
import { useNavigate } from 'react-router-dom';
import HeaderAdmin from '../components/HeaderAdmin';

function PostAdminPage() {
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
      <HeaderAdmin />
      {loading ? (
        <CircularProgress />
      ) : (
        posts.map((post, index) => (
          <div
             onClick={() => {navigate('admin/post/'+post.id)}}
            key={index}
            style={{
              border: '1px solid #808080',
              padding: '10px',
              margin: '20px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'box-shadow 0.3s ease',
              ':hover': {
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <Typography variant="h6">{post.title}</Typography>
            <Typography>{post.text}</Typography>
          </div>
        ))
      )}
    </div>
  );
}

export default PostAdminPage;