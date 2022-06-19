import React from 'react';
import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { Posts } from './components/Posts/Posts';
import { Account } from './components/Account/Account';
import { Login } from './components/Login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export interface IAppProps {}

export const App: React.FunctionComponent<IAppProps> = (props) => {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/posts' element={<Posts />} />
                    <Route path='/account' element={<Account />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </BrowserRouter>
        </div>
        
    );
};