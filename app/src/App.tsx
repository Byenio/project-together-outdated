import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cookies from 'universal-cookie';

import UserPosts from './Components/Account/AccountNav/UserPosts/Account.Userposts.Component';
import NewPost from './Components/Account/AccountNav/NewPost/Account.Newpost.Component';

import Navbar from './Components/Navbar/Navbar.Component';
import Posts from './Components/Posts/Posts.Component';
import Account from './Components/Account/Account.Component';
import Log from './Components/Log/Log.Component';
import Register from './Components/Register/Register.Component';
import PostDetails from './Components/Posts/PostDetails/Post.Details.Component';

function App() {

  return (
    <div className="App">
      
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route path='/' element={<Posts />}/>
          <Route path='/account' element = {
            <>
              <Account />
              <UserPosts />
            </>
          } />

          <Route path='/log' element={<Log />}/>

          <Route path='/account/new-post' element={
            <>
              <Account />
              <NewPost />
            </>
          }/>

          <Route path='/register' element={<Register />} />
          <Route path='/post/:_id' element={<PostDetails />} />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
