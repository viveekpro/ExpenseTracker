import axios from "axios";
const API_URL = "http://localhost:5000/api/auth"

// Register
export const  registerUser = async (userData)=>{
    const response = await axios.post(
        `${API_URL}/register`,userData
    );
    return response.data;
}

// login
export const loginUser = async (userData)=>{
    const response = await axios.post(
        `${API_URL}/login`,userData
    );
    return response.data;
}

// get profile 
export const getProfile = async (token)=>{
    const response = await axios.get(
        `${API_URL}/profile`,
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
}

// update profile
export const updateProfile = async (token, userData)=>{
    const response = await axios.put(`${API_URL}/profile`, userData,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

// change password
export const changePassword = async (token, passwordData)=>{
    const response = await axios.put(`${API_URL}/change-password`, passwordData,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}