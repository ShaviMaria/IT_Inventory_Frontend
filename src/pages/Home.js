import { useEffect } from 'react'
import Header from '../components/Header'
import Cookies from 'universal-cookie'
import NavigationMenu from '../components/NavigationMenu'
import ContentContainer from '../components/ContentContainer'
const cookies = new Cookies();

const Home = () => {
    useEffect(() => {
        if(!cookies.get('Windows_User')) {
            window.location.href = './';
        }
    }, []);

    return(
        <>
            <Header />
            <ContentContainer >
                <NavigationMenu />
                <h1>This is the Home page</h1>
            </ContentContainer>
        </>
    )
}

export default Home;