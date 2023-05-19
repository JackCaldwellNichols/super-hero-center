import { useState, Suspense, useContext} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Hero from './pages/Hero/Hero'
import Loading from './pages/Loading/Loading'
import Home from './pages/home/Home'
import Profile from './pages/Profile/Profile'
import Search from './pages/Search/Search'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import { Context } from './Context/Context'
import Edit from './pages/Edit/Edit'
import Quiz from './pages/Quiz/Quiz'




function App() {

  const {user} = useContext(Context)

  return (
    <>
    <BrowserRouter>
    <Suspense fallback={<Loading />}>
    
    <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/hero/:id' element={<Hero />} />
        <Route path='/profile/:id' element={ user ? <Profile /> : <Login />} />
        <Route path='/edit/:id' element={ user ? <Edit /> : <Login />} />
        <Route path='/search' element={<Search />} />
        <Route path='/quiz' element={<Quiz />} />

      </Routes>
      </Suspense>
    </BrowserRouter>
    </>
  )
}

export default App
