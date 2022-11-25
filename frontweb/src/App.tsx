import './assets/styles/custom.scss';
import './App.css';
import Routes from 'Routes';
import { AuthContext, AuthContextData } from 'AuthContext';
import { useState } from 'react';

const App = () => {
  /**Prover o Contexto Global - através de um useState - e com os dados que definimos no AuthContext
   * Depois no return, provemos este estado eposteriomente podemos utilizar em toda a aplicação, 
   * (como podemos ver na Navbar)
   */
  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false,
  });

  return (
    <AuthContext.Provider value={{ authContextData, setAuthContextData }}>
      <Routes />
    </AuthContext.Provider>
  );
};

export default App;
