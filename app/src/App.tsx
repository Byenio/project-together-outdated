import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

import UserPosts from './Account/AccountNav/UserPosts';
import NewPost from './Account/AccountNav/NewPost';

import Navbar from './Navbar';
import Posts from './Posts';
import Account from './Account';
import Log from './Log';

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

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
