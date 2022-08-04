import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UserPosts from './Account/AccountNav/UserPosts';
import NewPost from './Account/AccountNav/NewPost';

import Navbar from './Navbar';
import Posts from './Posts';
import Account from './Account';
import Log from './Log';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route path='/' element={<Posts />}/>
          <Route path='/posts' element={<Posts />}/>
          <Route path='/account' element={
            <>
              <Account />
              <UserPosts />
            </>
          }/>
          <Route path='/log' element={<Log />}/>

          <Route path='/account/new-post' element={
            <>
              <Account />
              <NewPost />
            </>
          }/>

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
