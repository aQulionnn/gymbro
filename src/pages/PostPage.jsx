import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getPost } from '../request';
import MyHeader from '../components/MyHeader';
import style from '../Style/PostPage.module.css'

function PostPage() {
  const {postid}  = useParams();
  const [post, setPost] = useState({})

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
    <div>
      <MyHeader />
      <div className={style.main}>
        <div className={style.container}>
          <h2>{post.title}</h2>
          <img src={'https://localhost:7209/api/File/'+post.photo} />
          <p>{post.text}</p>
        </div>
      </div>
    </div>
  )
}

export default PostPage