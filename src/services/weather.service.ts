import axios from "axios";

const API_BASE_URL = 'https://weatherapi-skmb.onrender.com/'; 

export const getWeather = async (lat: string, lon: string,token: string)=>{
     const res = await axios.get(`${API_BASE_URL}api/weather?lat=${lat}&lon=${lon}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.data
}