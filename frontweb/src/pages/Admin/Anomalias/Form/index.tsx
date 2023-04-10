import { useHistory, useParams } from 'react-router-dom';
import './styles.css';
import { Anomalia } from 'types/anomalia';
import { useForm, Controller } from 'react-hook-form';
import { useEffect } from 'react';
import { Edificio } from 'types/edificio';
import { requestBackend } from 'util/requests';

type urlParams = {
  //edificioId: string;
  anomaliaId: string;
};

const Form = () => {
  const { anomaliaId } = useParams<urlParams>();

  const isEditing = anomaliaId !== 'create';

  const history = useHistory();

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

  return (
    <div>
      <h1>Teste</h1>
    </div>
  );
};

export default Form;
