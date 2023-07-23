import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Properties from '../pages/Properties'
import Networks from '../pages/Networks'
import Departaments from '../pages/Departaments'
import Users from '../pages/Users'
import Trademarks from '../pages/Trademarks'
import AppleID from '../pages/AppleID'
import Google from '../pages/Google'
import SystemUser from '../pages/SystemUser'

const Rts = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/Home" element={<Home />} />
        <Route exact path="/Properties" element={<Properties />} />
        <Route exact path='/Networks' element={<Networks />} />
        <Route exact path='/Departaments' element={<Departaments />} />
        <Route exact path='/Users' element={<Users />} />
        <Route exact path='/Trademarks' element={<Trademarks />} />
        <Route exact path='/Appleid' element={<AppleID />} />
        <Route exact path='/Google' element={<Google />} />
        <Route exact path='/SystemUser' element={<SystemUser />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Rts;