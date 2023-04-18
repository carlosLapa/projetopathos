import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { requestBackend } from 'util/requests';
import { AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import AddAnomaliaRequest from 'models/AddAnomaliaRequest';

import './styles.css';

type urlParams = {
  anomaliaId: string;
};

export const AddAnomalia = () => {
  const [consequente, setConsequente] = useState('');
  const [inconsequente, setInconsequente] = useState('');
  const [date, setDate] = useState(0);
  const [tipologia, setTipologia] = useState('');
  const [descricao, setDescricao] = useState('');
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const history = useHistory();

  function tipologiaField(value: string) {
    setTipologia(value);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<AddAnomaliaRequest>();

  const handleCancel = () => {
    history.push('/admin/anomalias');
  };

  async function base64ConversionForImages(e: any) {
    if (e.target.files[0]) {
      getBase64(e.target.files[0]);
    }
  }

  function getBase64(file: any) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setSelectedImage(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Erro!', error);
    };
  }

  const { anomaliaId } = useParams<urlParams>();
  const isEditing = anomaliaId !== 'create';

  useEffect(() => {
    if (isEditing) {
      requestBackend({ url: `/anomalias/${anomaliaId}` }).then((response) => {
        const anomalia = response.data as AddAnomaliaRequest;
        setValue('tipologia', anomalia.tipologia);
        setValue('descricao', anomalia.descricao);
        setValue('img', anomalia.img);
      });
    }
  }, [anomaliaId, isEditing, setValue]);

  const novaAnomalia: AddAnomaliaRequest = new AddAnomaliaRequest(
    consequente,
    inconsequente,
    date,
    tipologia,
    descricao,
    selectedImage
  );

  addNovaAnomalia: JSON.stringify(novaAnomalia);

  const onSubmit = (formData: AddAnomaliaRequest) => {
    const config: AxiosRequestConfig = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/anomalias/${anomaliaId}` : '/anomalias',
      withCredentials: true,
      data: formData,
    };

    requestBackend(config)
      .then(() => {
        toast.info('Anomalia registada com sucesso!');
        history.push('/admin/anomalias');
      })
      .catch(() => {
        toast.error('Erro ao registar Anomalia');
      });
  };

  return (
    <div className="anomalia-crud-container">
      <div className="base-card anomalia-crud-form-card">
        <h3 className="anomalia-crud-form-title">Dados da Anomalia</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
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
              <div className="margin-bottom-30">
                <input
                  {...register('img')}
                  type="file"
                  onChange={(e) => base64ConversionForImages(e)}
                  className={`form-control base-input ${
                    errors.img ? 'is-invalid' : ''
                  }`}
                  placeholder="Imagem da anomalia"
                  name="img"
                />
                <div className="invalid-feedback d-block">
                  {errors.img?.message}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div>
                <textarea
                  rows={10}
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
