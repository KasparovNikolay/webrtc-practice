import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Profile } from './components/Profile/Profile'
import { Auth0Provider } from './components/Auth0Provider/Auth0Provider'

const App = () => {
  return (
    <BrowserRouter>
      <Auth0Provider>
        <Routes>
          <Route
            path='/'
            element={
              <div>
                home
                <Profile />
              </div>
            }
          />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Auth0Provider>
    </BrowserRouter>
  )
}

export default App
