import React, {useState} from 'react'

export default function DisplayProfile() {
    const [data, setData] = useState({
        username: "",
        firstName: "",
        lastName:"",
        email:"",
        phoneNumber:"",
        address:{
          streetLine:"",
          city:"",
          stateProvince:"",
          postalCode:"",
          country: "",
        },
        image_url: "",
    });
    const [errors, setErrors] = useState({
      username: "",
      firstName: "",
      lastName:"",
      email:"",
      phoneNumber:"",
      address:{
        streetLine:"",
        city:"",
        stateProvince:"",
        postalCode:"",
        country: "",
      },
      image_url: "",
    });
    

  return (
    <div>
      
    </div>
  )
}
