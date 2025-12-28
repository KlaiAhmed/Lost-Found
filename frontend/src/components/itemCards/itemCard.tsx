import style from './itemCard.module.css';
import calculateTimePassed  from '../../utils/calculateTimePassed';
import Icon from '../../utils/getIcon';

type ItemCardProps = {
    reward?: string;
    title: string;
    category: string;
    createdAt: string;
    status: string;
    holder: { city: string };
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
    const { reward, title, category, createdAt, status } = item;
    const rewardText = item.reward ? `${item.reward} Reward` : "10000Dt";
    const location= item.holder.city 
    const imgSrc = item.image.path
    const timePassed = calculateTimePassed(createdAt);
    const upperCategory = category.charAt(0).toUpperCase() + category.slice(1);
    const Title = title.charAt(0).toUpperCase() + title.slice(1);
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
                        {rewardText &&
                            <span className={style.reward}>{rewardText}</span>
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