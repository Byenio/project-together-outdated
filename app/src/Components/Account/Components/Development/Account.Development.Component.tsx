import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from 'Contexts/Auth.Context';
import { getUserPosts } from 'Proxies/Account.UserPosts/getUserPosts';

export interface UserPostsInterface { };

function inDevelop() {
    return (
        <div className='flex-1 flex flex-wrap min-w-[70%] justify-center'>
            <img src={require("../../../../img/wheel.gif")} alt="Zębatki kręcące się"/>
            <p className='text-black text-xl text-center w-full font-semibold text-2xl'>Strona w budowie</p>
        </div>
    )
}
export default inDevelop;