import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { getVideos } from '../request';

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
      <Header />
      {videos.map(() => (
        <div>
          <video width="320" height="240" controls={true}>
            <source src={videos.urlVideo} type="video/mp4"/>
          </video>
        </div>
      ))}
      </div>
  )
}

export default VideoPage