import style from './itemCard.module.css';
type ItemCardProps = {
    reward?: string;
    itemName: string;
    category: string;
    location: string;
    timePassed: string;
    status: string;
    imgSrc: string;
};

const ItemCard = ({ reward, itemName, category, location, timePassed, status, imgSrc }: ItemCardProps) => {

    return (
        <>
            <div className={style.cardContainer}>
                <div className={style.itemImage}>
                    <img src={imgSrc} alt="Item Image" className={style.itemImage} />
                </div>
                <div className={style.itemDetails}>
                    {reward &&
                        <span className={style.reward}>{reward}</span>
                    }
                    <div>
                        <span className={style.itemName}>{itemName}</span>
                        <span className={style.status}>{status}</span>
                    </div>
                </div>
                <div className={style.additionalInfo}>
                    <span className={style.category}>{category}</span>
                    <br />
                    <span className={style.location}>{location},</span>
                    <span className={style.timePassed}>{timePassed}</span>
                </div>
            </div>
        </>
    );
}

export default ItemCard;