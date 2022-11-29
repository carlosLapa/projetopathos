import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import history from './history';
import jwtDecode from 'jwt-decode';

/* Tipo um Enum, para auxiliar a descodificar o token */

type Role = 'ROLE_ADMIN' | 'ROLE_OPERATOR';

/* tipo para descodificar o token e verificar o tempo de expiração */
export type TokenData = {
  exp: number;
  user_name: string;
  authorities: Role[];
};

/* tipo que define a estrutura de resposta do login */
type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  userFirstName: string;
  userId: number;
};

const tokenKey = 'authData';

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

/* Para salvar o objeto do type LoginResponse - dados de autenticação - através da referencia global localStorage e da função da mesma, setItem
Isto será utilizado para fazer requisições autorizadas, por exemplo.
*/
export const saveAuthData = (obj: LoginResponse) => {
  localStorage.setItem(tokenKey, JSON.stringify(obj));
};

/* Para obter os dados, em String, do localStorage do browser. 

Como queremos um objeto ao invés de uma String, temos q converter através do parse.
Temos q nos certificar que a string não passa um nulo, através de um operador de coalescência para
assegurar que passa um objeto, mesmo q vazio, mas entre aspas, para converter o obj em string e vice-versa depois.

Para garantir que devolvemos o type correto, fazemos um cast (as LoginResponse) e temos assim uma situação type safe. 
*/
export const getAuthData = () => {
  const str = localStorage.getItem(tokenKey) ?? '{}';
  return JSON.parse(str) as LoginResponse;
};

export const removeAuthData = () => {
  localStorage.removeItem(tokenKey);
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
    if (error.response.status === 401 || error.response.status === 403) {
      history.push('admin/auth');
    }
    return Promise.reject(error);
  }
);

/*Função para descodificar o token */
export const getTokenData = (): TokenData | undefined => {
  try {
    return jwtDecode(getAuthData().access_token);
  } catch (error) {
    return undefined;
  }
};

/** Função para verificar se um User está autenticado
 * Essencialmente, recorrendo ao Unix Time Stamp, comparamos se a nossa data atual é menor que o tempo definido no token (ultimos 2 algarismos)
 * Se true, o token é válido e o user está autenticado.
 * */
export const isAuthenticated = (): boolean => {
  const tokenData = getTokenData();
  return tokenData && tokenData.exp * 1000 > Date.now() ? true : false;
};

/**Função para determinar os Roles dos users
 * Utiliza os "Enums" definidos, admin e operator
 * e a tokenData -> token que contém info sobre o user, especificamente neste caso, importam os roles que possuem
 */
export const hasAnyRoles = (roles: Role[]): boolean => {
  if (roles.length === 0) {
    return true;
  }

  const tokenData = getTokenData();

  if (tokenData !== undefined) {
    return roles.some((role) => tokenData.authorities.includes(role));
  }

  return false;
};
