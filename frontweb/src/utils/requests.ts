import axios from 'axios';
import qs from 'qs';

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
}

/* */
export const saveAuthData = (obj : LoginResponse) => {
  localStorage.setItem(tokenKey, JSON.stringify(obj));
}

/*
Para obter os dados do localStorage do browser, mas em String 
Como queremos um objeto ao invés de uma String, temos q converter através do parse.
Temos q nos certificar que a string não passa um nulo, através de um operador de coalescência para
assegurar que passa um objeto, mesmo q vazio, mas entre aspas, para converter o obj em string e vice-versa depois.
Para garantir que devolvemos o type correto, fazemos um cast (as LoginResponse) e temos assim uma situação type safe.
*/
export const getAuthData = () => {
  const str = localStorage.getItem(tokenKey) ?? "{}";
  return JSON.parse(str) as LoginResponse;
}
