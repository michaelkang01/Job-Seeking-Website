import React from 'react';
import { useEffect, useState } from 'react';
import "tailwindcss/tailwind.css"
import axios from 'axios';

const SignIn = () => {
    return (
        <div className="p-8">
            <form action="http://localhost:8001/signin" method="POST">
                <label className="text-xl">Email address</label>
                <input type="email" className="w-full p-2 focus:bg-blue-100 border-2 border-gray-200" placeholder="my@email.net" />
                <br />
                <br />
                <label className="text-xl">Password</label>
                <input type="password" className="w-full p-2 focus:bg-blue-100 focus:border-2 focus:border-gray-200 border-2 border-gray-200" placeholder="*********" />
                <br />
                <br />
                <input type="submit" className="cursor-pointer hover:bg-gray-500 py-2 px-4 w-full md:w-auto md:float-right bg-black text-white" value="Sign in" />
            </form>
        </div>
    );
}

export default SignIn;