import { ReactComponent as SearchIcon } from 'assets/images/search-icon.svg';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Anomalia } from 'types/anomalia';
import { requestBackend } from 'util/requests';

import './styles.css';

export type EdificioFilterData = {
  name: string;
  anomalia: Anomalia | null;
};

type Props = {
  onSubmitFilter: (data: EdificioFilterData) => void;
};

const ProductFilter = ({ onSubmitFilter }: Props) => {
  const [selectCategories, setSelectCategories] = useState<Anomalia[]>([]);

  const { register, handleSubmit, setValue, getValues, control } =
    useForm<EdificioFilterData>();

  const onSubmit = (formData: EdificioFilterData) => {
    onSubmitFilter(formData);
  };

  const handleFormClear = () => {
    setValue('name', '');
    setValue('anomalia', null);
  };

  const handleChangeCategory = (value: Anomalia) => {
    setValue('anomalia', value);

    const obj: EdificioFilterData = {
      name: getValues('name'),
      anomalia: getValues('anomalia'),
    };

    onSubmitFilter(obj);
  };

  useEffect(() => {
    requestBackend({ url: '/anomalias' }).then((response) => {
      setSelectCategories(response.data.content);
    });
  }, []);

  return (
    <div className="base-card edificio-filter-container">
      <form onSubmit={handleSubmit(onSubmit)} className="edificio-filter-form">
        <div className="edificio-filter-name-container">
          <input
            {...register('name')}
            type="text"
            className="form-control"
            placeholder="Nome do edifício"
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
                  options={selectCategories}
                  isClearable
                  placeholder="Anomalia"
                  classNamePrefix="edificio-filter-select"
                  onChange={(value) => handleChangeCategory(value as Anomalia)}
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
            LIMPAR<span className="btn-edificio-filter-word"> FILTRO</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductFilter;
