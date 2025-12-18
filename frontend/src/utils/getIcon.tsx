type IconProps = {
    name: string,
    className?: string
    width?: string,
    height?: string,
    color?: string,
    onClick?: () => void
    onPointerDown?: () => void
}

const Icon = ({name,className,width,height,color,onClick,onPointerDown}:IconProps) => {

    let svg;

    switch (name) {

        case"profile":
            svg = (
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 48 48" fill="currentColor">
                    <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M38.8,35c-3.4,4.5-8.8,7.5-14.8,7.5C13.8,42.5,5.5,34.2,5.5,24c0-2.1,0.4-4.1,1-6"></path><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12.4,9.6C15.6,7,19.6,5.5,24,5.5c10.2,0,18.5,8.3,18.5,18.5c0,1.2-0.1,2.4-0.3,3.5"></path><circle cx="24" cy="18" r="4.5" fill="none" stroke="#000" strokeWidth="3"></circle><path fill="none" stroke="#000" strokeWidth="3" d="M32.5,30.3c0-1.6-1.3-2.8-2.8-2.8H18.3c-1.6,0-2.8,1.3-2.8,2.8v0c0,2.7,3.4,5.2,8.5,5.2S32.5,33,32.5,30.3	L32.5,30.3z"></path>
                </svg>
            );
            break;

        case "search":
            svg = (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
                    <path d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g>
                </svg>
            );
            break;

        case"sun":
            svg = (
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M 11.992188 -0.0078125 A 0.50005 0.50005 0 0 0 11.5 0.5 L 11.5 2.5 A 0.50005 0.50005 0 1 0 12.5 2.5 L 12.5 0.5 A 0.50005 0.50005 0 0 0 11.992188 -0.0078125 z M 3.8632812 3.3632812 A 0.50005 0.50005 0 0 0 3.5136719 4.2207031 L 4.9277344 5.6347656 A 0.50005 0.50005 0 1 0 5.6347656 4.9277344 L 4.2207031 3.5136719 A 0.50005 0.50005 0 0 0 3.8632812 3.3632812 z M 20.123047 3.3632812 A 0.50005 0.50005 0 0 0 19.779297 3.5136719 L 18.365234 4.9277344 A 0.50005 0.50005 0 1 0 19.072266 5.6347656 L 20.486328 4.2207031 A 0.50005 0.50005 0 0 0 20.123047 3.3632812 z M 12 5 C 8.1399268 5 5 8.1399296 5 12 C 5 15.86007 8.1399268 19 12 19 C 15.860073 19 19 15.86007 19 12 C 19 8.1399296 15.860073 5 12 5 z M 12 6 C 15.319633 6 18 8.6803688 18 12 C 18 15.319631 15.319633 18 12 18 C 8.6803666 18 6 15.319631 6 12 C 6 8.6803688 8.6803666 6 12 6 z M 0.5 11.5 A 0.50005 0.50005 0 1 0 0.5 12.5 L 2.1113281 12.5 L 2.5 12.5 A 0.50005 0.50005 0 1 0 2.5 11.5 L 2.1113281 11.5 L 0.5 11.5 z M 21.5 11.5 A 0.50005 0.50005 0 1 0 21.5 12.5 L 23.5 12.5 A 0.50005 0.50005 0 1 0 23.5 11.5 L 21.5 11.5 z M 5.2714844 18.212891 A 0.50005 0.50005 0 0 0 4.9277344 18.365234 L 3.5136719 19.779297 A 0.50005 0.50005 0 1 0 4.2207031 20.486328 L 5.6347656 19.072266 A 0.50005 0.50005 0 0 0 5.2714844 18.212891 z M 18.712891 18.212891 A 0.50005 0.50005 0 0 0 18.365234 19.072266 L 19.779297 20.486328 A 0.50005 0.50005 0 1 0 20.486328 19.779297 L 19.072266 18.365234 A 0.50005 0.50005 0 0 0 18.712891 18.212891 z M 11.992188 20.992188 A 0.50005 0.50005 0 0 0 11.5 21.5 L 11.5 23.5 A 0.50005 0.50005 0 1 0 12.5 23.5 L 12.5 21.5 A 0.50005 0.50005 0 0 0 11.992188 20.992188 z"></path>
                </svg>
            );
        break

        case"moon":
            svg = (
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 15.8442C20.6866 16.4382 19.2286 16.7688 17.6935 16.7688C11.9153 16.7688 7.23116 12.0847 7.23116 6.30654C7.23116 4.77135 7.5618 3.3134 8.15577 2C4.52576 3.64163 2 7.2947 2 11.5377C2 17.3159 6.68414 22 12.4623 22C16.7053 22 20.3584 19.4742 22 15.8442Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            );
        break

        default:
            svg = <></>;
    }

    const wrapperStyle: React.CSSProperties = {
        display: "inline-block",
        width: width,
        height: height,
        lineHeight: 0,
        color: color
    };

    return (
        <div className={className} style={wrapperStyle} onClick={onClick} onPointerDown={onPointerDown}>
            {svg}
        </div>
    );
}

export default Icon;
