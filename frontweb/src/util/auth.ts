import jwtDecode from 'jwt-decode';
import { getAuthData } from './storage';

/* Tipo um Enum, para auxiliar a descodificar o token */

export type Role = 'ROLE_ADMIN' | 'ROLE_OPERATOR';

/* tipo para descodificar o token e verificar o tempo de expiração */
export type TokenData = {
  exp: number;
  user_name: string;
  authorities: Role[];
};

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
