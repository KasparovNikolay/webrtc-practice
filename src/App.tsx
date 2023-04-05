import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary'
import { StoreProvider } from './components/StoreComponent/StoreComponent'

const App = () => {
  return (
    <ErrorBoundary>
      <StoreProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </ErrorBoundary>
  )
}

export default App
