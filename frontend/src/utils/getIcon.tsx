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

        case "category":
            svg = (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 3.57143C5.78277 3.57143 4.77634 3.74256 4.09054 3.88071C4.00982 3.89696 3.94486 3.96042 3.93067 4.05126C3.79347 4.92993 3.58824 6.43203 3.58824 7.5C3.58824 8.56797 3.79347 10.0701 3.93067 10.9487C3.94486 11.0396 4.00982 11.103 4.09054 11.1193C4.77634 11.2574 5.78277 11.4286 6.5 11.4286C7.21723 11.4286 8.22366 11.2574 8.90946 11.1193C8.99018 11.103 9.05514 11.0396 9.06933 10.9487C9.20653 10.0701 9.41177 8.56797 9.41177 7.5C9.41177 6.43203 9.20653 4.92993 9.06933 4.05126C9.05514 3.96042 8.99018 3.89696 8.90946 3.88071C8.22366 3.74256 7.21723 3.57143 6.5 3.57143ZM3.77369 2.34087C4.46212 2.20219 5.60739 2 6.5 2C7.39261 2 8.53788 2.20219 9.22631 2.34087C9.9687 2.49041 10.5249 3.08082 10.6389 3.81133C10.7759 4.68826 11 6.29813 11 7.5C11 8.70187 10.7759 10.3117 10.6389 11.1887C10.5249 11.9192 9.9687 12.5096 9.22631 12.6591C8.53788 12.7978 7.39261 13 6.5 13C5.60739 13 4.46212 12.7978 3.77369 12.6591C3.0313 12.5096 2.47513 11.9192 2.36106 11.1887C2.22412 10.3117 2 8.70187 2 7.5C2 6.29813 2.22412 4.68826 2.36106 3.81133C2.47513 3.08082 3.0313 2.49041 3.77369 2.34087Z" fill="currentColor"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5 20.4286C16.7828 20.4286 15.7763 20.2574 15.0905 20.1193C15.0098 20.103 14.9449 20.0396 14.9307 19.9487C14.7935 19.0701 14.5882 17.568 14.5882 16.5C14.5882 15.432 14.7935 13.9299 14.9307 13.0513C14.9449 12.9604 15.0098 12.897 15.0905 12.8807C15.7763 12.7426 16.7828 12.5714 17.5 12.5714C18.2172 12.5714 19.2237 12.7426 19.9095 12.8807C19.9902 12.897 20.0551 12.9604 20.0693 13.0513C20.2065 13.9299 20.4118 15.432 20.4118 16.5C20.4118 17.568 20.2065 19.0701 20.0693 19.9487C20.0551 20.0396 19.9902 20.103 19.9095 20.1193C19.2237 20.2574 18.2172 20.4286 17.5 20.4286ZM14.7737 21.6591C15.4621 21.7978 16.6074 22 17.5 22C18.3926 22 19.5379 21.7978 20.2263 21.6591C20.9687 21.5096 21.5249 20.9192 21.6389 20.1887C21.7759 19.3117 22 17.7019 22 16.5C22 15.2981 21.7759 13.6883 21.6389 12.8113C21.5249 12.0808 20.9687 11.4904 20.2263 11.3409C19.5379 11.2022 18.3926 11 17.5 11C16.6074 11 15.4621 11.2022 14.7737 11.3409C14.0313 11.4904 13.4751 12.0808 13.3611 12.8113C13.2241 13.6883 13 15.2981 13 16.5C13 17.7019 13.2241 19.3117 13.3611 20.1887C13.4751 20.9192 14.0313 21.5096 14.7737 21.6591Z" fill="currentColor"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 16.6154C5.73888 16.6154 4.66241 16.7965 3.98316 16.9294C3.90741 16.9443 3.86241 16.9941 3.84775 17.0469C3.71755 17.5158 3.58824 18.0994 3.58824 18.5C3.58824 18.9006 3.71755 19.4842 3.84775 19.9531C3.86241 20.0059 3.90741 20.0557 3.98316 20.0706C4.66241 20.2035 5.73888 20.3846 6.5 20.3846C7.26112 20.3846 8.33759 20.2035 9.01684 20.0706C9.09259 20.0557 9.13759 20.0059 9.15225 19.9531C9.28245 19.4842 9.41177 18.9006 9.41177 18.5C9.41177 18.0994 9.28245 17.5158 9.15225 17.0469C9.13759 16.9941 9.09259 16.9443 9.01684 16.9294C8.33759 16.7965 7.26112 16.6154 6.5 16.6154ZM3.68301 15.3432C4.36186 15.2103 5.57165 15 6.5 15C7.42835 15 8.63814 15.2103 9.31699 15.3432C9.95957 15.4689 10.4966 15.9447 10.6807 16.6079C10.8134 17.0857 11 17.857 11 18.5C11 19.143 10.8134 19.9143 10.6807 20.3921C10.4966 21.0553 9.95957 21.5311 9.31699 21.6568C8.63814 21.7897 7.42835 22 6.5 22C5.57165 22 4.36186 21.7897 3.68301 21.6568C3.04043 21.5311 2.50344 21.0553 2.31929 20.3921C2.18661 19.9143 2 19.143 2 18.5C2 17.857 2.18661 17.0857 2.31929 16.6079C2.50344 15.9447 3.04043 15.4689 3.68301 15.3432Z" fill="currentColor"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5 7.38462C16.7389 7.38462 15.6624 7.20353 14.9832 7.07057C14.9074 7.05575 14.8624 7.00592 14.8477 6.95312C14.7176 6.4842 14.5882 5.90057 14.5882 5.5C14.5882 5.09943 14.7176 4.5158 14.8477 4.04688C14.8624 3.99408 14.9074 3.94425 14.9832 3.92943C15.6624 3.79647 16.7389 3.61538 17.5 3.61538C18.2611 3.61538 19.3376 3.79647 20.0168 3.92943C20.0926 3.94425 20.1376 3.99408 20.1523 4.04688C20.2824 4.5158 20.4118 5.09943 20.4118 5.5C20.4118 5.90057 20.2824 6.4842 20.1523 6.95312C20.1376 7.00592 20.0926 7.05575 20.0168 7.07057C19.3376 7.20353 18.2611 7.38462 17.5 7.38462ZM14.683 8.65685C15.3619 8.78973 16.5717 9 17.5 9C18.4283 9 19.6381 8.78973 20.317 8.65685C20.9596 8.53107 21.4966 8.05534 21.6807 7.39214C21.8134 6.91427 22 6.14299 22 5.5C22 4.85701 21.8134 4.08573 21.6807 3.60786C21.4966 2.94466 20.9596 2.46893 20.317 2.34315C19.6381 2.21027 18.4283 2 17.5 2C16.5717 2 15.3619 2.21027 14.683 2.34315C14.0404 2.46893 13.5034 2.94466 13.3193 3.60786C13.1866 4.08573 13 4.85701 13 5.5C13 6.14299 13.1866 6.91427 13.3193 7.39214C13.5034 8.05534 14.0404 8.53107 14.683 8.65685Z" fill="currentColor"></path> </g>
                </svg>
            );
            break;

        case "location":
            svg = (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g>
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
