import { ReactComponent as SearchIcon } from 'assets/images/search-icon.svg';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Anomalia } from 'types/anomalia';
import { requestBackend } from 'util/requests';

import './styles.css';

type EdificioFilterData = {
  name: string;
  anomalia: Anomalia;
};

const EdificioFilter = () => {
  const [selectAnomalias, setSelectAnomalias] = useState<Anomalia[]>([]);

  const { register, handleSubmit, control } = useForm<EdificioFilterData>();

  const onSubmit = (formData: EdificioFilterData) => {
    console.log('ENVIOU', formData);
  };

  useEffect(() => {
    requestBackend({ url: '/anomalias' }).then((response) => {
      setSelectAnomalias(response.data.content);
    });
  }, []);

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
                  getOptionLabel={(anomalia: Anomalia) => anomalia.tipologia}
                  getOptionValue={(anomalia: Anomalia) => String(anomalia.id)}
                />
              )}
            />
          </div>
          <button className="btn btn-outline-secondary btn-edificio-filter-clear">
            LIMPAR <span className="btn-edificio-filter-word">FILTRO</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EdificioFilter;
