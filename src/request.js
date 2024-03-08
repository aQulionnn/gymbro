import axios from 'axios'

export const getPosts = async () => {
  const response = await axios.get('https://localhost:7209/api/Post')
  return response.data
}

export const getPost = async (postid) => {
  const response = await axios.get('https://localhost:7209/api/Post/'+postid)
  return response.data
}

export const getSportsNutrition = async () => {
  const response = await axios.get('https://localhost:7209/api/Product/all/sportsNutrition')
  return response.data
}

export const getVideos = async () => {
  const response = await axios.get('https://localhost:7209/api/Tutorial')
  return response.data
}