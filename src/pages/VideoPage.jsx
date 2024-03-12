import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { getVideos } from '../request';
import MyHeader from '../components/MyHeader';
import MyVideo from '../components/MyVideo';
import { CircularProgress } from '@mui/material';

function VideoPage() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await getVideos();
        setVideos(results);
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
      {loading ?
       ( <CircularProgress /> ) : 
       ( 
          <div style={{
            display: 'flex', justifyContent: 'space-evenly', marginTop: '50px'}}>
            {videos.map((video) => (
              <MyVideo key={video.id} desc={video.desc} title={video.title}/>
            ))}
          </div>
        )
     } 
    </div>
  )
}

export default VideoPage