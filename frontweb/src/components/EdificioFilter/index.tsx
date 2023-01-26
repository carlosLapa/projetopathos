import { ReactComponent as SearchIcon } from 'assets/images/search-icon.svg';

import './styles.css';

const EdificioFilter = () => {
  return (
    <div className="base-card edificio-filter-container">
      <form action="" className="edificio-filter-form">
        <div className="edificio-filter-name-container">
          <input
            type="text"
            className="form-control"
            placeholder="Nome do edifício"
          />
          <SearchIcon />
        </div>
        <div className="edificio-filter-bottom-container">
          <div className="edificio-filter-anomalia-container">
            <select name="" id="">
              <option value="">Livros</option>
            </select>
          </div>
          <button className="btn btn-outline-secondary">LIMPAR</button>
        </div>
      </form>
    </div>
  );
};

export default EdificioFilter;
