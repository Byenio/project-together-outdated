import React from 'react';
import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { Posts } from './components/Posts/Posts';
import { Account } from './components/Account/Account';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Security } from './components/Account/Security/Security';
import { SetTutors } from './components/Account/SetTutors/SetTutors';
import { AddPost } from './components/Account/AddPost/AddPost';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { checkAuth } from './scripts/tsx/checkAuth';

export interface IAppProps {}

export const App: React.FunctionComponent<IAppProps> = (props) => {

    if (!checkAuth()) {

        return (

            <div className="App">
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path='/posts' element={<Login />} />
                        <Route path='/account' element={<Login />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/account/add-post' element={<AddPost />} />
                        <Route path='/account/set-tutors' element={<SetTutors />} />
                        <Route path='/account/security' element={<Security />} />
                    </Routes>
                </BrowserRouter>
            </div>
            
        );

    }

    return (

        <div className="App">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/posts' element={<Posts />} />
                    <Route path='/account' element={<Account />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/account/add-post' element={<AddPost />} />
                    <Route path='/account/set-tutors' element={<SetTutors />} />
                    <Route path='/account/security' element={<Security />} />
                </Routes>
            </BrowserRouter>
        </div>
        
    );
};