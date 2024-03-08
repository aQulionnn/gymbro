import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getPost } from '../request';
import Header from '../components/Header';

function PostPage() {
  const { postid } = useParams();
  const [post, setPost] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await getPost(postid);
        setPost(results);
        console.log(results)
      } catch (error) {
        console.error("Error fetching test results:", error);
      }
    };

    fetchData();
  }, [postid]);

  return (
    <>
      <Header/>
      <div>
        {post?.text}
      </div>
    </>
    
  )
}

export default PostPage