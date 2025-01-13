import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

export default function OAuth() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleGoogleClick= async()=>{  //async becuase we are waiting for gooogle to respond
       try {
          const provider=new GoogleAuthProvider() 
          const auth= getAuth(app)  //getAuth is a function that takes the app created in firebase.js file as an argument to know which app to use for authentication

          const result= await signInWithPopup(auth,provider) 
          console.log(result.user )
          const res = await fetch('/api/auth/google', { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photo: result.user.photoURL }),
           } )
              const data = await res.json()
              dispatch(signInSuccess(data))
              navigate('/')

       } catch (error) {
            console.log('Could not handle sign in with google because ...',error)
       }
    }
  return (
    <button  onClick={handleGoogleClick} type='button' className="bg-red-600 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-70">Continue With Google</button>  //type=button because it will prevent on submitting the form when the button is clicked
  )
}
