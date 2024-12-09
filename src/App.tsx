import { useEffect } from 'react'
import './App.css'
import { enterFullScreen } from './Functions/FullScreen'
import Home from './Pages/Home'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import CodeSpace from './Pages/CodeSpace'
import Admin from './Pages/Admin'
import Profile from './Components/Profile'
import ThankYou from './Pages/ThankYou'
import QuestionPage from './Components/QuestionPage'

function App() {
  useEffect(()=>{
    document.addEventListener('keydown', event => {
      if (event.key === 'F11') {
        event.preventDefault();
        return false;
      }
    });
    document.addEventListener('contextmenu', event => {
        event.preventDefault();
        return false;
    });
  },[])
  return (
    <div onClick={()=>{enterFullScreen(document.location.pathname)}} className='overflow-hidden'>
      <Router>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/codespace' element={<CodeSpace/>}></Route>
            <Route path="/admin" element={<Admin/>}/>
            <Route path='/profile/:userName' element={<Profile/>}/>
            <Route path='/thankYou' element={<ThankYou/>}/>
            <Route path='/qn' element={<QuestionPage/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
