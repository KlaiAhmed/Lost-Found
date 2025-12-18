import Icon from "../../utils/getIcon";
import style from "./home.module.css";


const Home = () => {

    return (
        <>
            <div className={style.homePageContainer}>
                <h1>A Community-Driven Lost & Found Platform Built on Trust and Rewards</h1>
                <p>Post found items or search for things you’ve lost. Connect securely with owners and offer or claim rewards for successful returns</p>


            
                <label className={style.searchBox} htmlFor="searchInput">
                    <Icon name="search" className={style.searchIcon}/>
                    <input id="searchInput" type="text" placeholder="Search lost item..."/>
                </label>
            </div>
        </>
    );

};

export default Home;