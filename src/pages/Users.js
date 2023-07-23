import { useEffect } from 'react'
import Cookies from 'universal-cookie'
import Header from '../components/Header'
import NavigationMenu from '../components/NavigationMenu'
import ContentContiner from '../components/ContentContainer'

const Users = () => {
    const cookies = new Cookies()
    useEffect(() => {
        if(!cookies.get('Windows_User')) {
            window.location.href = './';
        }
    }, []);
    return (
        <>
            <Header />
            <ContentContiner>
                <NavigationMenu />
                <h1>This is the Users page</h1>
            </ContentContiner> 
        </>
    );
}

export default Users;