import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

import UserPosts from './Components/Account/AccountNav/UserPosts/Account.Userposts.Component';
import NewPost from './Components/Account/AccountNav/NewPost/Account.Newpost.Component';

import Navbar from './Components/Navbar/Navbar.Component';
import Posts from './Components/Posts/Posts.Component';
import Account from './Components/Account/Account.Component';
import Log from './Components/Log/Log.Component';
import Register from './Components/Register/Register.Component';

function App() {

  async function loggedIn(): Promise<boolean> {

    const cookies = new Cookies();

    try {
      const response = await fetch('http://localhost:1337/api/sessions', {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'x-refresh': cookies.get('refreshToken')
        }),
        body: ''
      })

      const result = await response.json();

      console.log(result);

      return response.ok;

    } catch(ex) {
      return false;
    }

  }

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

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
