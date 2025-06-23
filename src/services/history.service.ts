import axios from "axios";

const API_BASE_URL = 'https://weatherapi-skmb.onrender.com/'; 

export const getHistory = async (token: string)=>{
 const res = await axios.get(`${API_BASE_URL}api/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data
}