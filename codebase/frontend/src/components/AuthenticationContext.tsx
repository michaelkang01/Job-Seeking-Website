import React from 'react';
import { useEffect, useState } from 'react';
import "tailwindcss/tailwind.css"
import axios from 'axios';

type AuthenticationProps = {
    children: JSX.Element
}

const Authentication = ({children}: AuthenticationProps) => {
    
    return children;
}