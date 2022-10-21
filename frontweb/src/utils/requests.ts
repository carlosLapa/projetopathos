/*
Url com constante para utilizar uma variável de ambiente, compatível com o Netlify, 
e caso não esteja definida, através do operador de coalescência (?? no Javascript/Typescript) buscar, o url padrão para testes locais
*/
export const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';

