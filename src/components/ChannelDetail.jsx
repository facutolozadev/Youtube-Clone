import React, { useState, useEffect } from 'react'
import {useParams } from 'react-router-dom';
import {Box, Typography} from '@mui/material';
import { Videos, ChannelCard } from './'
import { fetchFromAPI } from '../utils/fetchFromAPI';

const ChannelDetail = () => {
  const {id} = useParams();
  const [channelDetail, setChannelDetail] = useState(null)
  const [videos, setVideos] = useState([])

  console.log(channelDetail, videos)

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`)
    .then((data) => setChannelDetail(data?.items[0]))
  
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
    .then((data) => setVideos(data?.items))
  }, [id])

  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{background: 'linear-gradient(90deg, rgba(59,113,255,1) 0%, rgba(180,32,163,1) 92%)',
          height:'260px'}}/> 
      </Box>
      <ChannelCard marginTop="-110px" channelDetail={channelDetail}/> 
      <Videos videos={videos}/> 
    </Box>
  )
}

export default ChannelDetail