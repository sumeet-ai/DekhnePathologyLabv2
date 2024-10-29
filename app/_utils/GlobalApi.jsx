const { default: axios } = require("axios");

// Retrieve the API key from the environment variables
const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

// Create the axios client with the base URL and headers
const axiosClient = axios.create({
    baseURL: 'http://localhost:1337/api',  // Correct the property name to baseURL
    headers: {
        'Authorization': `Bearer ${API_KEY}`,  // Template literal should be inside backticks (` `)
    },
});

const getCategory=()=>axiosClient.get('categories?populate=*');
const getDoctorList=()=>axiosClient.get('doctors?populate=*');
const getDoctorByCategory = (category) => axiosClient.get(`/doctors?filters[categories][Name][$in]=${category}&populate=*`);
export default{
    getCategory,
    getDoctorList,
    getDoctorByCategory
}
