import { getValue } from '@testing-library/user-event/dist/utils';
import { ReactComponent as SearchIcon } from 'assets/images/search-icon.svg';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select, { SingleValue } from 'react-select';
import { Anomalia } from 'types/anomalia';
import { requestBackend } from 'util/requests';

import './styles.css';

type EdificioFilterData = {
  name: string;
  anomalia: Anomalia | null;
};

const EdificioFilter = () => {
  const [selectAnomalias, setSelectAnomalias] = useState<Anomalia[]>([]);

  const { register, setValue, getValues, handleSubmit, control } =
    useForm<EdificioFilterData>();

  const onSubmit = (formData: EdificioFilterData) => {
    console.log('ENVIADO', formData);
  };

  /**
   * Função, que dispara ao clicar no botão "Limpar filtro",
   * para "settar" (setValue) o valor do nome como string vazia e as anomalias como nulas
   */
  const handleFormClear = () => {
    setValue('name', '');
    setValue('anomalia', null);
  };

  useEffect(() => {
    requestBackend({ url: '/anomalias' }).then((response) => {
      setSelectAnomalias(response.data.content);
    });
  }, []);

  /**
   * Ao limpar o filtro da Anomalia, vamos enviar tb o formulário.
   * Para isso temos que passar o valor da mesma, sempre que mudar no select,
   * assim passamos o argumento com o value da Anomalia. Desto modo, na função o tipo é Anomalia.
   * Depois, fazemos um setValue para settar o value e ainda acrescentar os dados do formulário para ser enviado.
   */
  const handleChangeAnomalia = (value: Anomalia) => {
    setValue('anomalia', value);

    const obj: EdificioFilterData = {
      name: getValues('name'),
      anomalia: getValues('anomalia'),
    };

    console.log('ENVIADO', obj);
  };

  return (
    <div className="base-card edificio-filter-container">
      <form onSubmit={handleSubmit(onSubmit)} className="edificio-filter-form">
        <div className="edificio-filter-name-container">
          <input
            {...register('name')}
            type="text"
            className="form-control base-input"
            placeholder="Designação do edifício"
            name="name"
          />
          <button className="edificio-filter-search-icon">
            <SearchIcon />
          </button>
        </div>
        <div className="edificio-filter-bottom-container">
          <div className="edificio-filter-anomalia-container">
            <Controller
              name="anomalia"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={selectAnomalias}
                  isClearable
                  placeholder="Anomalia"
                  classNamePrefix="edificio-filter-select"
                  onChange={(value) => handleChangeAnomalia(value as Anomalia)}
                  getOptionLabel={(anomalia: Anomalia) => anomalia.tipologia}
                  getOptionValue={(anomalia: Anomalia) => String(anomalia.id)}
                />
              )}
            />
          </div>
          <button
            onClick={handleFormClear}
            className="btn btn-outline-secondary btn-edificio-filter-clear"
          >
            LIMPAR <span className="btn-edificio-filter-word">FILTRO</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EdificioFilter;
