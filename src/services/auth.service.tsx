import axios from "axios";



const API_BASE_URL = 'https://weatherapi-skmb.onrender.com'; 

export const signUp = async (email: string, password: string)=>{
     const res = await axios.post(`${API_BASE_URL}/api/auth/signup`, { email, password });
     return res.data
}

export const signIn = async (email: string, password: string)=>{
     const res = await axios.post(`${API_BASE_URL}/api/auth/signin`, { email, password });
     return res.data
}

export const signOut = ()=>{
    localStorage.removeItem('token')
}