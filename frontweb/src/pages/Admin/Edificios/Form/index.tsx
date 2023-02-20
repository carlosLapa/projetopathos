import { AxiosRequestConfig } from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';
import { Anomalia } from 'types/anomalia';
import { Edificio } from 'types/edificio';
import { requestBackend } from 'util/requests';
import { toast } from 'react-toastify';

import './styles.css';

type UrlParams = {
  edificioId: string;
  //anomaliaId: string;
};

const Form = () => {

  /**
   * O tipo customizado, Edificio, e os seus atributos, é o que controla este formulário, que neste caso servirá para POST
   */
  const { edificioId } = useParams<UrlParams>();

  /** Condição boleana que verifica se estamos a Criar (diferente/falso) ou a Editar (igual/verdadeiro) */
  const isEditing = edificioId !== 'create';

  const history = useHistory();

  /**
   * useState para a seleção das anomalias, do tipo Anomalia, que inicialmente, por padrão, estará vazia e que vamos utilizar na lista de options
   * do Select.
   * No caso do setSelectAnomalias, já teremos que usar um useEffect para buscar as anomalias do BE, aquando o componente for montado.
   */
  const [selectAnomalias, setSelectAnomalias] = useState<Anomalia[]>([]);

  /**
   * o setValue permite definir o(s) valor(es) de algum(/ns) atributo(s)
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<Edificio>();

  useEffect(() => {
    requestBackend({ url: '/anomalias' }).then((response) => {
      setSelectAnomalias(response.data.content);
    });
  }, []);

  /**
   * Para editar e trazer os atributos respectivos e preenchidos, utilizamos este useEffect,
   * que nos vai permitir settar os values aquando o componente (Form) é montado
   * e CASO estivermos a editar (condição if) fazemos a requisição ao backend, com o Id do edificio,
   * e "setamos" cada atributo com o valor que nos chega do BE
   * (Fizemos tb o type safe (Edificio))
   */
  useEffect(() => {
    if (isEditing) {
      requestBackend({ url: `/edificios/${edificioId}` }).then((response) => {
        const edificio = response.data as Edificio;
        setValue('name', edificio.name);
        setValue('localizacao', edificio.localizacao);
        setValue('tipologia', edificio.tipologia);
        setValue('utilizacao', edificio.utilizacao);
        setValue('imgUrl', edificio.imgUrl);
        setValue('anomalias', edificio.anomalias);
      });
    }
  }, [edificioId, isEditing, setValue]);

  const onSubmit = (formData: Edificio) => {
    /**
     * Sendo obrigatório passar pelo menos uma anomalia em cada Edificio, temos que criar esta função com uma anomalia mock
     * CASO estejamos a criar um edificio novo
     * No caso da edição, não vamos permitir que estes atributos sejam hardcoded.
     * Para tal fazemos uma condição ternária para avaliar a situação em que estamos.
     */

    /**
     * Vamos avaliar se estamos a editar (PUT) ou a criar (POST)
     * e qual o url que precisamos utilizar
     */
    const config: AxiosRequestConfig = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/edificios/${edificioId}` : '/edificios',
      data: formData,
      withCredentials: true,
    };

    requestBackend(config)
      .then(() => {
        toast.info('Edifício registado com sucesso!');
        history.push('/admin/edificios');
      })
      .catch(() => {
        toast.error('Erro ao registar Edifício');
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
                  {...register('name', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.name ? 'is-invalid' : ''
                  }`}
                  placeholder="Nome/designação do edifício"
                  name="name"
                />
                <div className="invalid-feedback d-block">
                  {errors.name?.message}
                </div>
              </div>

              <div className="margin-bottom-30">
                <Controller
                  name="anomalias"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={selectAnomalias}
                      classNamePrefix="edificio-crud-select"
                      isMulti
                      getOptionLabel={(anomalia: Anomalia) =>
                        anomalia.tipologia
                      }
                      getOptionValue={(anomalia: Anomalia) =>
                        String(anomalia.id)
                      }
                    />
                  )}
                />
                {errors.anomalias && (
                  <div className="invalid-feedback d-block">
                    Campo obrigatório
                  </div>
                )}
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

              <div className="margin-bottom-30">
                <input
                  {...register('imgUrl', {
                    required: 'Campo obrigatório',
                    pattern: {
                      value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm,
                      message: 'Deve ser um URL válido',
                    },
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.name ? 'is-invalid' : ''
                  }`}
                  placeholder="URL da imagem do edifício"
                  name="imgUrl"
                />
                <div className="invalid-feedback d-block">
                  {errors.imgUrl?.message}
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div>
                <textarea
                  rows={12}
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
