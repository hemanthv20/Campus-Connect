import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './style.css'
// Components
import LandingPage from './components/LandingPage'
import Login from './components/Login'
import Register from './components/Register'
import Users from './components/Users'
import Feed from './components/Feed';
import Admin from './components/Admin.js';
import Navbar from './components/Navbar.js';
import Profile from './components/Profile.js';
import ChatList from './components/ChatList.js';
import ChatWindow from './components/ChatWindow.js';
import Discover from './components/Discover.js';
import AdminDashboard from './components/AdminDashboard.js';
import { AdminProvider } from './context/AdminContext';

function App() {
    return (
        <AdminProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path='/' element={<LandingPage />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/users' element={<Users />} />
                    <Route path='/feed' element={<Feed />} />
                    <Route path='/admin' element={<Admin />} />
                    <Route path='/admin-dashboard' element={<AdminDashboard />} />
                    <Route path='/profile/:username' element={<Profile />} />
                    <Route path='/chat' element={<ChatList />} />
                    <Route path='/chat/:chatId' element={<ChatWindow />} />
                    <Route path='/discover' element={<Discover />} />
                </Routes>
            </Router>
        </AdminProvider>
    )
}

render(<App />, document.getElementById('root'))