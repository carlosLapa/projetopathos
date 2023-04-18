import { useHistory, useParams } from 'react-router-dom';
import { Anomalia } from 'types/anomalia';
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
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

  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [filebase64, setFileBase64] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<Anomalia>();

  useEffect(() => {
    if (isEditing) {
      requestBackend({ url: `/anomalias/${anomaliaId}` }).then((response) => {
        const anomalia = response.data as Anomalia;
        setValue('tipologia', anomalia.tipologia);
        setValue('descricao', anomalia.descricao);
        setValue('img', anomalia.img);
      });
    }
  }, [anomaliaId, isEditing, setValue]);

  const onSubmit = (formData: Anomalia) => {
    const config: AxiosRequestConfig = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/anomalias/${anomaliaId}` : '/anomalias',
      data: formData, 
      withCredentials: true,
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

  function convertFile(files: FileList | null) {
    if (files) {
      const fileRef = files[0] || '';
      const fileType: string = fileRef.type || '';
      console.log('This file upload is of type:', fileType);
      const reader = new FileReader();
      reader.readAsBinaryString(fileRef);
      reader.onload = (ev: any) => {
        // convert it to base64
        setFileBase64(`data:${fileType};base64,${Buffer.from(ev.target.result)}`);
      };
    }
  }

  return (
    <div className="anomalia-crud-container">
      <div className="base-card anomalia-crud-form-card">
        <h1 className="anomalia-crud-form-title">Dados da Anomalia</h1>

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
              <input type="file" onChange={(e) => convertFile(e.target.files)} />
            {filebase64 && (
              <>
                {/* if it's an image */}
                {filebase64.indexOf('image/') > -1 && (
                  <img src={filebase64} width={400} alt="" />
                )}
                {/* if it's an image */}

                {/* if it's a video */}
                {filebase64.indexOf('video/') > -1 && (
                  <video controls>
                    <source src={filebase64} />
                  </video>
                )}
                {/* if it's a video */}

                {/* if it's a audio (music, sound) */}
                {filebase64.indexOf('audio/') > -1 && (
                  <audio controls>
                    <source src={filebase64} />
                  </audio>
                )}
                {/* if it's a audio (music, sound) */}

                {/* if it's a PDF */}
                {filebase64.indexOf('application/pdf') > -1 && (
                  <embed src={filebase64} width="800px" height="2100px" />
                )}
                {/* if it's a PDF */}
                <button> Submit and check the console</button>
              </>
            )}
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
