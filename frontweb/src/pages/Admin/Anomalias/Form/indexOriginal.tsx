import { useHistory, useParams } from 'react-router-dom';
import { Anomalia } from 'types/anomalia';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { ChangeEvent, useEffect, useState } from 'react';
import { requestBackend } from 'util/requests';
import { AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import { Buffer } from 'buffer';
import Select from 'react-select';

import './styles.css';

type urlParams = {
  //edificioId: string;
  anomaliaId: string;
};

const Form = () => {
  const { anomaliaId } = useParams<urlParams>();

  const isEditing = anomaliaId !== 'create';

  const history = useHistory();

  /*const [formData, setFormData] = useState<Anomalia>({
    id: 0,
    tipologia: '',
    descricao: '',
    consequente: '',
    inconsequente: '',
    img: undefined,
  });*/

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Anomalia>();

  useEffect(() => {
    if (isEditing) {
      requestBackend({ url: `/anomalias/${anomaliaId}` }).then((response) => {
        const anomalia = response.data as Anomalia;
        setValue('tipologia', anomalia.tipologia);
        setValue('descricao', anomalia.descricao);
      });
    }
  }, [anomaliaId, isEditing, setValue]);

  const onSubmit = async (formData: Anomalia) => {
    const formDataToSend = new FormData();

    Object.entries(formData).forEach((entry) => {
      const [key, value] = entry;
    
      if (value instanceof File) {
        formDataToSend.append(key, value);
      } else {
        formDataToSend.append(key, JSON.stringify(value));
      }
    });

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/anomalias',
      data: formDataToSend,
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    };

    try {
      await requestBackend(config);
      toast.info('Anomalia registada com sucesso!');
      history.push('/admin/anomalias');
    } catch (error) {
      toast.error('Erro ao registar Anomalia');
    }
  };

  const handleCancel = () => {
    history.push('/admin/anomalias');
  };

  return (
    <div className="anomalia-crud-container">
      <div className="base-card anomalia-crud-form-card">
        <h1 className="anomalia-crud-form-title">Dados da Anomalia</h1>

        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
          <div className="row anomalia-crud-inputs-container">
            <div className="col-lg-6 anomalia-crud-inputs-left-container">
              <div className="margin-bottom-30">
                <input
                  {...register('tipologia', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.tipologia ? 'is-invalid' : ''
                  }`}
                  placeholder="Designação da anomalia"
                  name="tipologia"
                />
                <div className="invalid-feedback d-block">
                  {errors.tipologia?.message}
                </div>
              </div>

              <div className="margin-bottom-30">
                <input
                  {...register('consequente', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.consequente ? 'is-invalid' : ''
                  }`}
                  placeholder="Consequências"
                  name="consequente"
                />
                <div className="invalid-feedback d-block">
                  {errors.consequente?.message}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div>
                <textarea
                  rows={12}
                  {...register('descricao', {
                    required: 'Campo obrigatório',
                  })}
                  className={`form-control base-input h-auto ${
                    errors.descricao ? 'is-invalid' : ''
                  }`}
                  placeholder="Descrição da anomalia"
                  name="descricao"
                />
                <div className="invalid-feedback d-block">
                  {errors.descricao?.message}
                </div>
              </div>
            </div>
          </div>

          <div className="anomalia-crud-buttons-container">
            <button
              className="btn btn-outline-danger anomalia-crud-button"
              onClick={handleCancel}
            >
              CANCELAR
            </button>
            <button className="btn btn-primary anomalia-crud-button text-white">
              GRAVAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
