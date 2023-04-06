import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/custom.scss';
import './App.css';

import { ToastContainer } from 'react-toastify';
import Routes from 'Routes';
import { AuthContext, AuthContextData } from 'AuthContext';
import { useState } from 'react';

const App = () => {
  /**Prover o Contexto Global - através de um useState - e com os dados que definimos no AuthContext
   * Depois no return, provemos este estado e posteriomente podemos utilizar em toda a aplicação, 
   * (como podemos ver na Navbar)
   */
  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false,
  });

  return (
    <AuthContext.Provider value={{ authContextData, setAuthContextData }}>
      <Routes />
      <ToastContainer />
    </AuthContext.Provider>
  );
};

export default App;
