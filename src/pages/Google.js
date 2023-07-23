import { useEffect } from 'react'
import Header from '../components/Header'
import NavigationMenu from '../components/NavigationMenu'
import Cookies from 'universal-cookie'
import ContentContiner from '../components/ContentContainer'

const Google = () => {
    const cookies = new Cookies()
    useEffect(() => {
        if(!cookies.get('Windows_User')) {
            window.location.href = './'
        }
    }, [])
    return (
        <>
            <Header />
            <ContentContiner>
                <NavigationMenu />
                <h1>This is the Google page</h1>
            </ContentContiner>
        </>
    );
}

export default Google;