import './styles.css';

type Props = {
  descricao: string;
};

const ResumoCard = ({ descricao }: Props) => {
  return (
    <div className="resumo-patologia-container">
      <h6>{descricao}</h6>
    </div>
  );
};

export default ResumoCard;
