import style from './formError.module.css'
import Icon from "../../utils/getIcon"

type FormErrorProps = {
    message: string;
    centred?: boolean;
    marginTop?: boolean;
    bigMarginTop?: boolean;
}

const FormError = ({ message, centred, marginTop, bigMarginTop }: FormErrorProps) => {
    let className;
    if (centred) {
        className = `${style.errorContainer} ${style.errorContainerCentred}`
    } else {
        className = style.errorContainer
    }

    let marginStyle = {};
    if (bigMarginTop) {
        marginStyle = { marginTop: '0.5rem' };
    } else if (marginTop) {
        marginStyle = { marginTop: '0.25rem' };
    }

    return (
        <>
            <div className={className} style={marginStyle}>
                <Icon name="warning" className={style.warningIcon} />
                <p className={style.errorMessage}>{message}</p>
            </div>
        </>
    )
}

export default FormError