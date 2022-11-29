import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import history from './history';
import { getAuthData } from './storage';

/*
Constante, de Url, para utilizar uma variável de ambiente, compatível com o Netlify, 
e caso não esteja definida, através do operador de coalescência (?? no Javascript/Typescript) buscar (à direita) o url padrão para testes locais
*/
export const BASE_URL =
  process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';

/* Variável de teste para gerar o Authorization (através do algoritmo btoa - base64) q integra o cabeçalho de login (como está no Postman) */
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'projetopathos';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'projetopathos123';

/* Função auxiliar para gerar o código de Authorization  */
const basicHeader = () =>
  'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET);

/* Função para fazer a requisição de login  
O "loginData" leva as credenciais do user que vão no corpo da requisição (username e password)
*/
type LoginData = {
  username: string;
  password: string;
};

/* Nesta função, temos que passar os cabeçalhos mediante o content-type que definimos (ver Postman) 
   Podemos utilizar o headers que "casa" com o argumento homónimo contido no AxiosRequestConfig

   Seguidamente, temos que implementar o Body da requisição (ver Postman). Criamos a const data para esse efeito.
   Com o objeto composto por username, password e grant_type, mas convertidos para url_form_encoded. Para tal usamos uma função da "qs" 
   Também aproveitamos os dados contidos no loginData (através do spread operator) e complementamos com o grant_type 
*/
export const requestBackendLogin = (loginData: LoginData) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: basicHeader(),
  };

  const data = qs.stringify({
    ...loginData,
    grant_type: 'password',
  });

  return axios({
    method: 'POST',
    baseURL: BASE_URL,
    url: '/oauth/token',
    data,
    headers,
  });
};

/*Já usámos anteriormente - o AxiosRequestConfig tem todas as informações para uma requisição 
Esta função, recebe as configurações do axios, complementamos essa info com o BASE_URL e com as credenciais (caso seja true)
onde definimos o valor do "Authorization" - q vem do getAuthData - ainda asseguramos que aproveitamos, com o "spread operator", o que vem do config.headers
Depois repassamos para o axios, que depois será usado no catálogo (por exemplo)
*/
export const requestBackend = (config: AxiosRequestConfig) => {
  const headers = config.withCredentials
    ? {
        ...config.headers,
        Authorization: 'Bearer ' + getAuthData().access_token,
      }
    : config.headers;

  return axios({ ...config, baseURL: BASE_URL, headers });
};

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 200's cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 401) {
      history.push('admin/auth');
    }
    return Promise.reject(error);
  }
);
