import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VideoDetail = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/videos/${id}/`)
      .then(res => setVideo(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!video) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{video.title}</h1>
      <iframe
        className="w-full aspect-video"
        src={video.youtube_url.replace("watch?v=", "embed/")}
        title={video.title}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoDetail;
