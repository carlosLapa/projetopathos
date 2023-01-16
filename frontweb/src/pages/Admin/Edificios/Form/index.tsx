import { AxiosRequestConfig } from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Edificio } from 'types/edificio';
import { requestBackend } from 'util/requests';

import './styles.css';

const Form = () => {
  /**
   * O tipo customizado, Edificio, e os seus atributos, é o que controla este formulário, que neste caso servirá para POST
   */

  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Edificio>();

  const onSubmit = (formData: Edificio) => {
    /**
     * Sendo obrigatório passar pelo menos uma anomalia em cada Edificio, temos que criar esta função com uma anomalia mock
     */
    const data = {
      ...formData,
      imgUrl:
        'https://www.ferreiralapa.com/wp-content/uploads/2021/09/3-1-1024x768.jpg',
      anomalias: [
        { id: 1, consequente: '', inconsequente: '', date: '', descricao: '' },
      ],
    };

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/edificios',
      data,
      withCredentials: true,
    };

    requestBackend(config).then((response) => {
      console.log(response.data);
    });
  };

  const handleCancel = () => {
    history.push('/admin/edificios');
  };

  return (
    <div className="edificio-crud-container">
      <div className="base-card edificio-crud-form-card">
        <h1 className="edificio-crud-form-title">Dados do Edificio</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row edificio-crud-inputs-container">
            <div className="col-lg-6 edificio-crud-inputs-left-container">
              <div className="margin-bottom-30">
                <input
                  {...register('nome', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.nome ? 'is-invalid' : ''
                  }`}
                  placeholder="Nome/designação do edifício"
                  name="nome"
                />
                <div className="invalid-feedback d-block">
                  {errors.nome?.message}
                </div>
              </div>

              <div className="margin-bottom-30">
                <input
                  {...register('localizacao', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.localizacao ? 'is-invalid' : ''
                  }`}
                  placeholder="Localização do edifício"
                  name="localizacao"
                />
                <div className="invalid-feedback d-block">
                  {errors.localizacao?.message}
                </div>
              </div>

              <div className="margin-bottom-30">
                <input
                  {...register('tipologia', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.tipologia ? 'is-invalid' : ''
                  }`}
                  placeholder="Tipologia do edifício"
                  name="tipologia"
                />
                <div className="invalid-feedback d-block">
                  {errors.tipologia?.message}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div>
                <textarea
                  rows={10}
                  {...register('utilizacao', {
                    required: 'Campo obrigatório',
                  })}
                  className={`form-control base-input h-auto ${
                    errors.utilizacao ? 'is-invalid' : ''
                  }`}
                  placeholder="Utilização do edifício"
                  name="utilizacao"
                />
                <div className="invalid-feedback d-block">
                  {errors.utilizacao?.message}
                </div>
              </div>
            </div>
          </div>
          <div className="edificio-crud-buttons-container">
            <button
              className="btn btn-outline-danger edificio-crud-button"
              onClick={handleCancel}
            >
              CANCELAR
            </button>
            <button className="btn btn-primary edificio-crud-button text-white">
              GRAVAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
