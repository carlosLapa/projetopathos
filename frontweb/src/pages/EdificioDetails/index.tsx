import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Edificio } from 'types/edificio';
import { BASE_URL } from 'utils/requests';

import './styles.css';

const EdificioDetails = () => {
  
  let edificio: Edificio;

  /*
  Chamada de API assíncrona -> ou seja, dispara enquanto a app roda e só num momento posterior chegará a resposta dessa requisição
  Como controlamos a chegada da requisição? Através de uma Promise, neste caso .then
  Esse ".then", executa algo ao receber a requisição. Pode ser uma função, ou uma expressão lambda.
  Definimos então um argumento com um determinado nome, normalmente será "response" para implementar uma expressão lambda neste caso,
  e depois escrevemos o que queremos executar.
  */
  axios.get(BASE_URL + "/edificios/2")
    .then(response => {
        console.log(response.data)
    });

  return (
    <div className="edificio-details-container">
      <div className="base-card edificio-details-card">
        <Link to="/edificios">
          <div className="go-back-container">
            <ArrowIcon />
            <h2>Voltar</h2>
          </div>
        </Link>
        <div className="row">
          <div className="col-xl-6">
            <div className="img-container">
              <img
                src="https://www.ferreiralapa.com/wp-content/uploads/2021/09/3-1-1024x768.jpg"
                alt="Nome do Edificio"
              />
            </div>
            <div className="name-typology-container">
              <h1>Nome/Endereço do Edificio</h1>
              <h3>Tipologia</h3>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="description-container">
              <h2>Descrição do edificio</h2>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui,
                harum!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EdificioDetails;
