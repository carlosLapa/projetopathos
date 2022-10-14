import './styles.css';

type Props = {
  descricao: string;
};

const ResumoCard = ({ descricao }: Props) => {
  return (
    <>
      <div className="resumo-patologia-container">
        <h3>{descricao}</h3>
      </div>
    </>
  );
};

export default ResumoCard;
