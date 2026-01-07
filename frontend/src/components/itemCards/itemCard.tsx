import style from './itemCard.module.css';
import calculateTimePassed  from '../../utils/calculateTimePassed';
import Icon from '../../utils/getIcon';

type ItemCardProps = {
    reward?: number;
    itemName: string;
    category: string;
    createdAt: string;
    status: string;
    holder: { state: string };
    image: { path: string };
};

type Props = {
    item: ItemCardProps;
};

const statusStyles = (status: string) => {
    return (
        <>
            <span className={`${style.status} ${style[status.toLowerCase()]}`}>{status}</span>
        </>
    );
}

const ItemCard = ({ item }: Props) => {
    const { reward, itemName, category, createdAt, status } = item;
    const croppedReward = status === 'lost' && reward != null ? (String(reward).length > 5 ? String(reward).slice(0, 4) + '..' : String(reward)) : null;
    const location= item.holder.state 
    let imgSrc = import.meta.env.VITE_API_URL + '/' + item.image.path;
    if (!imgSrc) {
        imgSrc ='../../assets/placeHolder.png';
    }
    const timePassed = calculateTimePassed(createdAt);
    const upperCategory = category.charAt(0).toUpperCase() + category.slice(1);
    const Title = itemName.charAt(0).toUpperCase() + itemName.slice(1);
    const croppedTitle = Title.length > 22 ? Title.slice(0, 20) + '...' : Title;

    return (
        <>
            <div className={style.cardContainer}>
                <div className={style.imageContainer}>
                    <img src={imgSrc} alt="Item Image" className={style.itemImage} />
                    {statusStyles(status)}
                </div>
                <div className={style.infoContainer}>
                    <div className={style.itemDetails}>
                        {croppedReward && croppedReward !== '0' &&
                            <span className={style.reward}>{croppedReward}TND</span>
                        }
                        <span className={style.itemName}>{croppedTitle}</span>
                    </div>
                    <div className={style.additionalInfo}>
                        <div className={style.category}><Icon name="category" className={style.icon} />{upperCategory}</div>
                        <div className={style.info}><Icon name="location" className={style.icon} />{location}, {timePassed} </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ItemCard;