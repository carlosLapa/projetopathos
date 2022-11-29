/* tipo que define a estrutura de resposta do login -> q pode ser visualizado, por exemplo, no localStorage do browser, ou no Postman tb*/
type LoginResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    userFirstName: string;
    userId: number;
  };

const tokenKey = 'authData';

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