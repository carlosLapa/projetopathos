import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import ReactPaginate from 'react-paginate';

import './styles.css';

/**
 * Este tipo serve para a parametrização da Pagination e que contém a função (q servirá de evento), para comunicar e notificar,
 * segundo o padrão observer, com o componente do List (do admin) e do Catálogo (nas paginas).
 * Acresce que estes atributos podem ser usados em conjunto com os do SpringPage (ver como está no List)
 *
 * Aqui tipamos a função (typesafe) para garantir que é recebido um número como argumento, numa função que seja void,
 * ou seja, não é qualquer função que pode ser inscrita no evento.
 * Essa função pode ser opcional (não é obrigado a preencher)
 *
 * Neste caso, o evento que será disparado, é nativo do ReactPaginate - onPageChange
 * que recebe como argumento, de acordo com o ReactPaginate, os itens da paginação (items)
 * e depois a partir daí, podemos chamar, através do .selected, o numero da página que foi mudada já no componente List e Catálogo
 */
type Props = {
  pageCount: number;
  range: number;
  onChange?: (pageNumber: number) => void;
};

const Pagination = ({ pageCount, range, onChange }: Props) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={range}
      marginPagesDisplayed={1}
      containerClassName="pagination-container"
      pageLinkClassName="pagination-item"
      breakClassName="pagination-item"
      previousClassName="arrow-previous"
      nextClassName="arrow-next"
      activeLinkClassName="pagination-link-active"
      disabledClassName="arrow-inactive"
      onPageChange={(items) => (onChange ? onChange(items.selected) : {})}
      previousLabel={
        <div className="pagination-arrow-container">
          <ArrowIcon />{' '}
        </div>
      }
      nextLabel={
        <div className="pagination-arrow-container">
          <ArrowIcon />{' '}
        </div>
      }
    />
  );
};

export default Pagination;
