import {FaSearch} from 'react-icons/fa'
import {Link} from 'react-router-dom'  /* used for linking different pages without refreshing  */
import { useSelector } from 'react-redux'

export default function Header() {
  const {currentUser} = useSelector(state => state.user)
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3' >
        <Link to="/">
         <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>          {/* text-sm yana text small for mobile version   and  sm: matlab after mobile hum aisa likhenge sm:text-xl full version kai liye xl extra large text size for dekstop  */}       
            <span className='text-yellow-500 font-bold'>Profit</span>
            <span className='text-slate-500 font-bold'>Estate</span>
        </h1>
        </Link>
        <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
          <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-72 md:w-72' />
          <FaSearch className='text-slate-900' />
        </form>
        <ul className='flex gap-4'>
          <Link to="/">
          <li className='hidden sm:inline text-slate-700 hover:underline' >HOME</li>
          </Link>
          <Link to="/about">
          <li className='hidden sm:inline text-slate-700 hover:underline'>ABOUT</li>
          </Link>
          <Link to="/profile">
          {currentUser ? (
              <img src={currentUser.avatar} alt={currentUser.username} className='w-7 h-7 rounded-full object-cover' />
            ): <li className='text-slate-700 hover:underline'>SIGN IN</li>
            
            
            }
            </Link>

          
         
          
        </ul>
      </div>
     
    </header>
  )
}
