import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData(
      {
        ...formData, //spread operator used to maintain the previous state like if we have username and password in the formdata and we want to add email to it then we will use spread operator to maintain the previous state sab ek sath leke chalta hai spread operator
        [e.target.id]: e.target.value //e.target.id is used to get the id of the input field and e.target.value is used to get the value of the input field
      }
    )
  };
  const handleSubmit = async(e) => {
    e.preventDefault(); //to prevent the refreshing of the page when the signup button is clicked
    try {
      setLoading(true)      //to show the loading when the signup button is clicked
      const res=await fetch('/api/auth/sign-up',   //fetch is used to send the data to the server ALSO IT GIVES THE REPOSNE FROM THE SERVER  and the first parameter is the url where we want to send the data and the second parameter is the data that we want to send
        {
          method: 'POST', //method is used to tell the server that we are sending the data to the server
          headers: {
            'Content-Type': 'application/json' //header is used to tell the server that the data that we are sending is in the json format
          },
          body: JSON.stringify(formData) //body is used to send the data to the server and the data that we are sending is in the json format so we are using JSON.stringify to convert the data into json format
        }
      ) 
      const data=await res.json() //to convert the response that we get from the server into the json format
      if(data.success===false){   //data.sucess mai success variable index.js file mai hai jabh error aata hai to success false hota hai
        setError(data.message) //if the success is false then we will show the error message that we get from the server
        setLoading(false) //to stop the loading when the error message is shown
        return;
      } 
      setLoading(false) //to stop the loading when the data is sent and received successfully
      setError(null)
      navigate('/sign-in')  // if data is sent and received successfully then we will navigate to the sign-in page
    } catch (error) {
      setLoading(false) 
      setError(error)
    }
    
    console.log(data);
  }


  console.log(formData)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center my-7 font-semibold'>Sign Up</h1> 
      <form  onSubmit={handleSubmit} className='flex flex-col gap-4' > 
        <input type="text" placeholder='Username' className='border p-3 rounded-lg' id='username'onChange={handleChange}/>
        <input type="email" placeholder='E-mail' className='border p-3 rounded-lg' id='email'onChange={handleChange}/>
        <input type="password" placeholder='Password' className='border p-3 rounded-lg' id='password'onChange={handleChange}/>
        <button disabled={loading} className='bg-blue-500 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-70'>
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth/>
      </form>
      <div className="flex justify-center items-center  gap-1 mt-5" >
        <p>Already have an account?</p>
        <Link to='/sign-in'>
          <span  className='text-blue-500'>Sign In</span>
        </Link>

      </div>
      {error && <p className='text-red-500 text-center mt-5'>{error}</p>}
    </div>
  )
}
