import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UserPosts from './Components/Account/Components/UserPosts/Account.Userposts.Component';
import NewPost from './Components/Account/Components/NewPost/Account.Newpost.Component';

import Navbar from './Components/Navbar/Navbar.Component';
import { Posts } from './Components/Posts/Posts.Component';
import Account from './Components/Account/Account.Component';
import Log from './Components/Log/Log.Component';
import Register from './Components/Register/Register.Component';
import PostDetails from './Components/Posts/PostDetails/Post.Details.Component';
import Users from './Components/Account/Components/Manage/Tutors/Account.Manage.Users.Component';

import Composer from './Contexts/Context.Composer';
import { ThemeProvider } from './Contexts/Theme.Context';
import { AuthProvider } from './Contexts/Auth.Context';

const Contexts = [BrowserRouter, AuthProvider, ThemeProvider];

function App() {

  return (
    <div className='App'>
      <Composer components={Contexts}>

        <Navbar />
        <Routes>

          <Route path='/' element={<Posts />} />
          <Route path='/account' element={
            <>
              <Account />
              <UserPosts />
            </>
          } />

          <Route path='/log' element={<Log />} />

          <Route path='/account/new-post' element={
            <>
              <Account />
              <NewPost />
            </>
          } />

          <Route path='/account/manage/users' element={
            <>
              <Account />
              <Users />
            </>
          } />

          <Route path='/register' element={<Register />} />
          <Route path='/post/:_id' element={<PostDetails />} />

        </Routes>

      </Composer>
    </div>
  );
}

export default App;
