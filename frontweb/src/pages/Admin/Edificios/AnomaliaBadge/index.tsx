import './styles.css';

type Props = {
  descricao: string;
};

const AnomaliaBadge = ({ descricao }: Props) => {
  return <div className="category-badge-container">{descricao}</div>;
};

export default AnomaliaBadge;
