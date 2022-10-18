import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';

import './styles.css';

const EdificioDetails = () => {
  return (
    <div className="edificio-details-container">
      <div className="base-card edificio-details-card">
        <div className="go-back-container">
          <ArrowIcon />
          <h2>Voltar</h2>
        </div>
        <div className="row">
          <div className="col-xl-6">
            <div className="img-container">
                <img src="https://www.ferreiralapa.com/wp-content/uploads/2021/09/3-1-1024x768.jpg" alt="Nome do Edificio" />
            </div>
            <div className="name-typology-container">
                <h1>Nome/Endereço do Edificio</h1>
                <h3>Tipologia</h3>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="description-container">
                <h2>Descrição do edificio</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui, harum!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EdificioDetails;
