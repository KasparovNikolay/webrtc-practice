import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Profile } from './components/Profile/Profile'
import { MainPage } from './pages/MainPage'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
