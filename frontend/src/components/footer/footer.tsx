import style from './footer.module.css';
import { Link } from 'react-router-dom';
import Icons from '../../utils/getIcon';



const Footer = () => { 
    const currentYear = new Date().getFullYear();

    return (
        <>
            <div className={style.footer_container}>
                <div className={style.footer_content}>
                    <div className={style.list}>
                        <h4>Support</h4>
                        <Link to='/'>Help</Link>
                        <Link to='/'>Contact us</Link>
                        <Link to='/'>Site Map</Link>
                    </div>

                    <div className={style.list}>
                        <h4>Company</h4>
                        <Link to='/'>About Us</Link>
                        <Link to='/'>Reviews</Link>
                        <Link to='/'>FAQs</Link>
                    </div>

                    <div className={style.list}>
                        <h4>Legal</h4>
                        <Link to='/'>Terms &amp; Conditions</Link>
                        <Link to='/'>Privacy Policy</Link>
                        <Link to='/'>Cookies Policy</Link>
                    </div>

                    <div className={style.social}>
                        <h4>Follow Us</h4>
                        <div className={style.social_list}>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                <Icons name="facebook"  />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" >
                                <Icons name="instagram"  />
                            </a>
                            <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
                                <Icons name="tiktok"  />
                            </a>
                        </div>
                    </div>
                </div>

                <div className={style.footer_bottom}>
                    <p className={style.p1}>&copy; {currentYear} Lost&Found, All rights reserved.</p>
                    <p className={style.p2}>Powered by <a href="https://github.com/KlaiAhmed" target="_blank" rel="noopener noreferrer">Ahmed Klai</a></p>
                </div>
            </div>
        </>
    )

}

export default Footer;