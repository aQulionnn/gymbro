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

export const addFile = async (photo) => {
  try {
    const formData = new FormData();
    formData.append("file", photo);

    const response = await axios.post(
      'https://localhost:7209/api/File/upload',
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

export const addPost = async(post)=>{
  const response = await axios.post('https://localhost:7209/api/Post/',post)
  return response.data
}

export const editPost = async (post)=>{
  const response = await axios.put('https://localhost:7209/api/Post/'+post.id,post)
  return response.data
}
export const deletePost = async (postid)=>{
  const response = await axios.delete('https://localhost:7209/api/Post/'+postid)
  return response.data
}


export const getAllSportsNutrition = async () => {
  const response = await axios.get("https://localhost:7209/api/Product/all/sportsNutrition")
  return response.data
}

export const deleteSportsNutrition = async (id) => {
  const response = await axios.delete("https://localhost:7209/api/Product/Id?Id="+id)
  return response.data
}

export const addSportsNutrition = async (product) => {
  const response = await axios.post("https://localhost:7209/api/Product/create", product)
  return response.data
}

export const editSportsNutrition = async (product) => {
  const response = await axios.put("https://localhost:7209/api/Product/update/"+ product.id, product)
  return response.data
}


export const getAllSportsProducts = async () => {
  const response = await axios.get("https://localhost:7209/api/Product/all/products")
  return response.data
}

export const deleteSportsProducts = async (id) => {
  const response = await axios.delete("https://localhost:7209/api/Product/Id?Id="+id)
  return response.data
}

export const addSportsProducts = async (product) => {
  const response = await axios.post("https://localhost:7209/api/Product/create", product)
  return response.data
}

export const editSportsProducts = async (product) => {
  console.log(product);
  const response = await axios.put("https://localhost:7209/api/Product/update/"+ product.id, product)
  return response.data
}



export const getAllVideo = async () => {
  const response = await axios.get("https://localhost:7209/api/Tutorial")
  return response.data
}

export const deleteVideo = async (id) => {
  const response = await axios.delete("https://localhost:7209/api/Tutorial/"+id)
  return response.data
}

export const addVideo = async (video) => {
  const response = await axios.post("https://localhost:7209/api/Tutorial", video)
  return response.data
}

export const editVideo = async (video) => {
  const response = await axios.put("https://localhost:7209/api/Tutorial/"+ video.id, video)
  return response.data
}
