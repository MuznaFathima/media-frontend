
import{BASE_URL} from "./baseurl"
import { commmonRequest } from "./commonrequest"


// add video


 export const addVideo=async(body)=>{

  return await commmonRequest("POST",`${BASE_URL}/videos`,body)
}


// get video


export const getVideo=async()=>{
  return await commmonRequest("GET",`${BASE_URL}/videos`,"")
}

// delete 

export const deleteVideo=async(id)=>{

     return await commmonRequest("DELETE",`${BASE_URL}/videos/${id}`,{})
}
// add categories   


export const addCategory=async(body)=>{


  return await commmonRequest("POST",`${BASE_URL}/categories`,body)
}


// get all categories

export const getallCategories=async()=>{


  return await commmonRequest("GET",`${BASE_URL}/categories`,"")
}

// delete category

export const deleteCategory=async(id)=>{

 return await commmonRequest("DELETE",`${BASE_URL}/categories/${id}`,{})
}

// get history
export const gethistory=async()=>{
  return await commmonRequest("GET",`${BASE_URL}/watchhistory`,"")
}
// add history
export const AddHistory=async(body)=>{
  return await commmonRequest("POST",`${BASE_URL}/watchhistory`,body)
}

// get single card detaiils

export const getVideos=async(id)=>{
  return await commmonRequest("GET",`${BASE_URL}/videos/${id}`,"")
}

// to update card details in category section

export const updateCategory=async(id,body)=>{

  return await commmonRequest("PUT",`${BASE_URL}/categories/${id}`,body)
 }