import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Profile } from './components/Profile/Profile'
import { Auth0Provider } from './components/Auth0Provider/Auth0Provider'
import Main from './pages/Main'

const App = () => {
  return (
    <BrowserRouter>
      <Auth0Provider>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Auth0Provider>
    </BrowserRouter>
  )
}

export default App
