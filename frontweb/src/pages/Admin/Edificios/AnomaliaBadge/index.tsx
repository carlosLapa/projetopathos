import './styles.css';

type Props = {
  tipologia: string;
};

const AnomaliaBadge = ({ tipologia }: Props) => {
  return <div className="category-badge-container">{tipologia}</div>;
};

export default AnomaliaBadge;
