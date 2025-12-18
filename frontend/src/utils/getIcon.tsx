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

        case "profile":
            svg = (
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 48 48" fill="currentColor">
                    <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M38.8,35c-3.4,4.5-8.8,7.5-14.8,7.5C13.8,42.5,5.5,34.2,5.5,24c0-2.1,0.4-4.1,1-6"></path><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12.4,9.6C15.6,7,19.6,5.5,24,5.5c10.2,0,18.5,8.3,18.5,18.5c0,1.2-0.1,2.4-0.3,3.5"></path><circle cx="24" cy="18" r="4.5" fill="none" stroke="#000" strokeWidth="3"></circle><path fill="none" stroke="#000" strokeWidth="3" d="M32.5,30.3c0-1.6-1.3-2.8-2.8-2.8H18.3c-1.6,0-2.8,1.3-2.8,2.8v0c0,2.7,3.4,5.2,8.5,5.2S32.5,33,32.5,30.3	L32.5,30.3z"></path>
                </svg>
            );
            break;

        case "search":
            svg = (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">
                    <path d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g>
                </svg>
            );
            break;

        case "sun":
            svg = (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g>
                </svg>
            );
            break;

        case "moon":
            svg = (
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 15.8442C20.6866 16.4382 19.2286 16.7688 17.6935 16.7688C11.9153 16.7688 7.23116 12.0847 7.23116 6.30654C7.23116 4.77135 7.5618 3.3134 8.15577 2C4.52576 3.64163 2 7.2947 2 11.5377C2 17.3159 6.68414 22 12.4623 22C16.7053 22 20.3584 19.4742 22 15.8442Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            );
            break;

        case "sunmoon":
            svg = (
                <svg version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xmlSpace="preserve" fill="#000000">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css">{`.st0{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st1{fill:none;stroke:currentColor;stroke-width:2;stroke-linejoin:round;stroke-miterlimit:10;}`}</style> <line className="st0" x1="16" y1="3" x2="16" y2="29"></line> <path className="st0" d="M16,23c-3.87,0-7-3.13-7-7s3.13-7,7-7"></path> <line className="st0" x1="6.81" y1="6.81" x2="8.93" y2="8.93"></line> <line className="st0" x1="3" y1="16" x2="6" y2="16"></line> <line className="st0" x1="6.81" y1="25.19" x2="8.93" y2="23.07"></line> <path className="st0" d="M16,12.55C17.2,10.43,19.48,9,22.09,9c0.16,0,0.31,0.01,0.47,0.02c-1.67,0.88-2.8,2.63-2.8,4.64 c0,2.9,2.35,5.25,5.25,5.25c1.6,0,3.03-0.72,3.99-1.85C28.48,20.43,25.59,23,22.09,23c-2.61,0-4.89-1.43-6.09-3.55"></path> </g>
                </svg>
            );
            break;

        case "tick":
            svg = (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.89163 13.2687L9.16582 17.5427L18.7085 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path> </g>
                </svg>
            );
            break;

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
