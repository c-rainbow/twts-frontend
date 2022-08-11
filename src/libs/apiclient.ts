import axios from "axios";


const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FRONTEND_BASE_URL,
  headers: {
   'Content-Type': 'application/json',
  }
});


export default client;