import './styles.css';

type Props = {
  descricao: string;
};

const ResumoCard = ({ descricao }: Props) => {
  return (
    <>
      <div className="resumo-patologia-container">
        <h5>{descricao}</h5>
      </div>
    </>
  );
};

export default ResumoCard;
