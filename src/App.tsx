import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Posts from './components/Posts/Posts';
import MyAccount from './components/MyAccount/MyAccount';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/posts' element={<Posts />} />
                </Routes>
            </BrowserRouter>
        </div>
        
    );
};

/*function App() {
    return (
        <div className="App">
            <Navbar />
            <Posts path='/posts' />
            <MyAccount />
        </div>
    );
}*/

export default App;