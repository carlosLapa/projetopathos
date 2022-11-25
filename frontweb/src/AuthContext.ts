import { createContext } from 'react';
import { TokenData } from 'util/requests';

/*type, com os dados do tokenData e true/false para o estado authenticated, para possibilitar a lógica de Login/Logout 

Criamos o Estado Global (ver doc do React sobre Contexts), com o mesmo propósito ao supramencionado, mas que vai permitir
utilizar estes dados entre componentes independentes, como por exemplo na Navbar e no Login - onde ambos estão a observar este estado
*/
export type AuthContextData = {
  authenticated: boolean;
  tokenData?: TokenData;
};

/*type que contém um dado/atributo e uma função, que recebe o dado e que só altera o valor e não retorna nada, daí o void */
export type AuthContextType = {
  authContextData: AuthContextData;
  setAuthContextData: (authContextData: AuthContextData) => void;
};

/*Cria o contexto propriamente dito, através das definições nos types anteriores
Parametrizamos, definimos um valor inicial (authenticated: false) e depois a função com valor inicial de null,
que será sobrescrita posteriormente.
*/
export const AuthContext = createContext<AuthContextType>({
  authContextData: {
    authenticated: false,
  },
  setAuthContextData: () => null,
});
