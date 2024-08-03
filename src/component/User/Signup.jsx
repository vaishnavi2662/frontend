import React, { useEffect, useRef, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerAPI } from '../Api/Api'
import axios from 'axios'
function Signup() {
    
        // const{loading,user,error,isAuthenticated}=useSelector(state=>state.users)
  const [loading ,setLoading]=useState(false)
    const[exist,setexist]=useState(false)
    const navigate=useNavigate()
  
    const switchTabs=(e,tab)=>{
        navigate(`/${tab}`)
    }
    const loginSubmit=()=>{
        console.log("ghh");
    }
    const [user1,setUser]=useState({
        name:"",
        email:"",
        password:""
      })
      const[avatar,setAvatar]=useState('')
      const[avatarpreview,setAvatarpreview]=useState("")
      const registerDatachange=(e)=>{
        if(e.target.name=="avatar"){
            const reader=new FileReader()
            reader.onload=()=>{
              if(reader.readyState===2){
                setAvatarpreview(reader.result)
                setAvatar(reader.result)
              }
            }
            reader.readAsDataURL(e.target.files[0])
        }
        else{
          setUser({...user1,[e.target.name]:e.target.value})
        }
      }
      const { name, email, password } = user1;
    //   console.log(name,email,password,avatar);
    //   console.log(user1);
    //   const {name,email,password}=useState()
   
      const registerSubmit=async (e)=>{
        e.preventDefault()
        
        const myForm=new FormData()
        myForm.set("name",name)
         myForm.set("email",email)
         myForm.set("password",password)
        //  myForm.set("avatar", avatar);
         console.log(myForm);
         const {data} = await axios.post(registerAPI, {
          name,
          email,
          password
        });
        if(data.success === true){
          delete data.user.password;
          localStorage.setItem("user", JSON.stringify(data.user));
       
          setLoading(true);
          navigate("/");
        }
        else{
          if(data.message="User already Exists"){
            setexist(true)
          }
        }
      }
     

    const {login,setlogin}=useState(false)
    
    const [data,setdata]=useState({
       
        password:"",
        email:"",
      
    })
   

  return (
   <>
   {exist?"Alreadyexist":null}
    {
      loading?<div>
        
       
      <div className='flex justify-center place-items-center  mt-64 font-karla '>
<div role="status  place-center">
  <svg aria-hidden="true" className="w-24 h-24 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
  </svg>
  <span className="sr-only">Loading...</span>
</div>
</div></div>:
    <section class="bg-gray-50 h-screen dark:bg-gray-900" onSubmit={loginSubmit}>
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
         
         Register   
      </a>
      <div className="login_signUp_toggle text-white flex mb-5 ">
                  <p onClick={(e) => switchTabs(e, "login") } className='mr-5 font-bold font-mono border-2 p-1 px-6 border-green-500 bg-green-500 rounded hover:text-green-500 hover:bg-gray-900 hover:border-none'>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")} className='font-bold font-mono border-2 p-1 px-2 border-red-500 bg-red-500 rounded hover:text-red-500 hover:bg-gray-900 hover:border-none'>REGISTER</p>
                </div>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#" onSubmit={registerSubmit}>
              <div>
                      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                      <input type="text" name="name" id="name" placeholder="enter your name" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={registerDatachange}/>
                  </div>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" onChange={registerDatachange}/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={registerDatachange}/>
                  </div>
                
                 
                  <button type="submit" class="w-full text-white bg-yellow-600 hover:bg-transparent hover:text-yellow-500 hover:font-bold  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600">Sign Up</button>
=
              </form>
          </div>
      </div>
  </div>
</section>

    }
   </>
  )
}

export default Signup
