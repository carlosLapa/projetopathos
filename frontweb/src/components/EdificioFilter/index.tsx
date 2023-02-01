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

/**
 * Agora o componente EdificioFilter, vai ter um evento (onSubmitFilter) onde o componente List pode inscrever uma função
 * (para executar no seu código),
 * quando este evento ocorrer aqui. Para tal, usamos este type Props que contém um evento/função que recebe como argumento,
 * um data do tipo EdificioFilterData.
 */
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

  /**
   * Função, que dispara ao clicar no botão "Limpar filtro",
   * para "settar" (setValue) o valor do nome como string vazia e as anomalias como nulas
   */
  const handleFormClear = () => {
    setValue('name', '');
    setValue('anomalia', null);
  };

   /**
   * Ao limpar o filtro da Anomalia, vamos enviar tb o formulário.
   * Para isso temos que passar o valor da mesma, sempre que mudar no select,
   * assim passamos o argumento com o value da Anomalia. Desto modo, na função o tipo é Anomalia.
   * Depois, fazemos um setValue para settar o value e ainda acrescentar os dados do formulário para ser enviado.
   */
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
