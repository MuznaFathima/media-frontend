import axios from "axios";

// function definition commmon request

export const commmonRequest=async(method,url,body)=>{

    // request confuguration

    

    let reqConfig={
url,
method,
data:body,
headers:{
    "content-type":"application/json"
            //    multipart form data
}

    }
    // api call using axios library
    // axios library is a popular js library used to make http request

    return await axios(reqConfig).then((response)=>{
        return response

    })
    .catch((error=>{
        return error
    }))
}