import './styles.css';

const Form = () => {
  return (
    <div className="edificio-crud-container">
      <div className="base-card edificio-crud-form-card">
        <h1 className="edificio-crud-form-title">Dados do Edificio</h1>

        <form action="">
          <div className="row edificio-crud-inputs-container">
            <div className="col-lg-6 edificio-crud-inputs-left-container">
              <div className="margin-bottom-30">
                <input type="text" className="form-control base-input" />
              </div>
              <div className="margin-bottom-30">
                <input type="text" className="form-control base-input" />
              </div>
              <div>
                <input type="text" className="form-control base-input" />
              </div>
            </div>
            <div className="col-lg-6">
              <div>
                <textarea name="" rows={10} className="form-control base-input h-auto"></textarea>
              </div>
            </div>
          </div>
          <div className="edificio-crud-buttons-container">
            <button className="btn btn-outline-danger edificio-crud-button">CANCELAR</button>
            <button className="btn btn-primary edificio-crud-button text-white">GRAVAR</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
