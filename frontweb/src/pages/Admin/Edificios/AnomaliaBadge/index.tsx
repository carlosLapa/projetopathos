import './styles.css';

type Props = {
    name: string; 
}

const AnomaliaBadge = ({name} : Props) => {
    return(
        <div className="category-badge-container">{name}</div>
    );
}

export default AnomaliaBadge;