import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom';
import ReactPlayer from 'react-player';
import {Typography, Box, Stack} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import {Video, Videos} from './'
import {fetchFromAPI} from '../utils/fetchFromAPI'


const VideoDetail = () => {


  const {id} = useParams();

  const [videoDetail, setVideoDetail] = useState(null)
  const [videos, setVideos] = useState(null)
  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
    .then((data) => setVideoDetail(data.items[0]))
    
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
    .then((data) => setVideos(data.items))
  }, [])

  if(!videoDetail?.snippet) return 'Loading...';
  const {snippet: {title, channelId, channelTitle}, statistics: {viewCount, likeCount}} = videoDetail;
  

  return (
    <Box minHeight="95vh">
      <Stack direction={{xs: 'column', md: 'row'}}>
        <Box flex={1}>
          <Box sx={{width: '100%', position: 'sticky', top: '86px'}}>
            <ReactPlayer className="react-player" controls url={`https://www.youtube.com/watch?v=${id}`}/>
            <Typography style={{margin:'25px'}} variant="h6" fontWeight="bold" color="#fff">
              {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{
              color: '#fff'
            }} py={1} px={2}>
              <Link to={`/channel/${channelId}`} style={{marginLeft: '10px'}}>
                <Typography variant='subtitle1'  color="gray">
                  {channelTitle}
                  <CheckCircle sx={{fontSize: '12px', color: 'gray', ml:'5px'}}/> 
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{opacity: 0.7}}>
                    {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{opacity: 0.7}}>
                    {parseInt(likeCount).toLocaleString()} Likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
      <Box px={2} py={{md: 1, xs:5}} justifyContent="center" alignItems="center">
            <Videos videos={videos} direction="column"/> 
      </Box>
      </Stack>
    </Box>
  )
}

export default VideoDetail