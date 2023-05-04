export const API_BASE_URL = process.env.REACT_APP_DEV_ENVIRONMENT ? process.env.REACT_APP_DEVELOPMENT_API_HOST : process.env.REACT_APP_PRODUCTION_API_HOST;
console.log(API_BASE_URL);
console.log(process.env.REACT_APP_IS_DEV_ENVIRONMENT)
export const baseUrl = `http://${API_BASE_URL}`;

console.log('base url is', baseUrl)