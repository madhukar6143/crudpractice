import React from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function AddUser() {
 
    let {register,handleSubmit,formState:{errors},reset}=useForm()
    let navigate = useNavigate()
    const onSubmit = async(data) => {
        let response =await axios.post('user/create-user',data)
        if (response.status === 200) {
            //navigate to userlist component
            alert(response.data.message)
            navigate("/userlist")
          }
        if(response.status===200)
        {
            reset({
                username: '',
                password: ''
              });
        }
        
      };
     

  return (
  <div className='container border border-secondary mt-5 px-5 '>
  <form onSubmit={handleSubmit(onSubmit)}>
    
  <div>
    <input placeholder='username' className='border border-primary p-1 m-1'
       {...register("username", 
       { 
          // check username is empty
         required: "username required.",
         //minimum lentgh of username
        minLength: 
        {
          value: 6,
          message: 'minimum length should be 6' // JS only: <p>error message</p> TS only support string
        }
         })}/>
  </div>
       {errors.username && <p>{errors.username.message}</p>}


  <div>
      <input className='border border-primary p-1 m-1' placeholder='password' {...register("password",{ required: "password required,",

         //check pattern contain requitrements
       pattern: {
          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          message: 'Password must contain at least one capital letter, one number, and one special character' // JS only: <p>error message</p> TS only support string
        }})} />  
  </div>

      {errors.password && <p>{errors.password.message}</p>}

      <input type="submit" />
  </form>
  </div>

  )
}

export default AddUser


