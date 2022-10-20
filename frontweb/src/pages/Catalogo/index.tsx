import EdificioCard from 'components/EdificioCard';
import { Link } from 'react-router-dom';
import { Edificio } from 'types/edificio';

import './styles.css';

const Catalogo = () => {
  const edificio: Edificio = {
    id: 3,
    localizacao: 'Porto',
    tipologia: 'Prédio',
    nome: 'Edificio da Água',
    utilizacao: 'Habitação',
    arquitetura: 'Moderna',
    piso: 5,
    fracao: '1B',
    imgUrl:
      'https://www.ferreiralapa.com/wp-content/uploads/2021/09/3-1-1024x768.jpg',
    date: '2022-04-14T10:00:00Z',
    createdAt: '2022-10-14T13:58:01.045385Z',
    anomalias: [
      {
        id: 1,
        consequente: 'Sim',
        inconsequente: 'Não',
        date: '2022-04-14T10:00:00Z',
        descricao: 'Causou patologias',
        edificios: [],
      },
    ],
  };

  return (
    <div className="container my-4 catalog-container">
      <div className="row catalog-title-container">
        <h1>Edifícios intervencionados</h1>
      </div>

      <div className="row">
        <div className="col-sm-6 col-lg-4 col-xl-6">
          <Link to="edificios/1">
            <EdificioCard edificio={edificio} />
          </Link>
        </div>
        <div className="col-sm-6 col-lg-4 col-xl-6">
          <Link to="edificios/1">
            <EdificioCard edificio={edificio} />
          </Link>
        </div>
        <div className="col-sm-6 col-lg-4 col-xl-6">
          <Link to="edificios/1">
            <EdificioCard edificio={edificio} />
          </Link>
        </div>
        <div className="col-sm-6 col-lg-4 col-xl-6">
          <Link to="edificios/1">
            <EdificioCard edificio={edificio} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Catalogo;
