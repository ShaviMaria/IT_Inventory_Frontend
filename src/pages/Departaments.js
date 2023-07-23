import Cookies from 'universal-cookie'
import { useEffect } from 'react'
import NavigationMenu from '../components/NavigationMenu'
import Header from '../components/Header'
import ContentContiner from '../components/ContentContainer'
import SubHeaderContainer from '../components/SubHeaderContainer'
import Title from '../components/Title'
import PageIcon from '../components/PageIcon'
import useLanguageContent from '../hooks/useLanguageContent'

const Departaments = () => {
    const cookies = new Cookies()
    const language = useLanguageContent(cookies.get('Language'))
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
                <div>
                        <SubHeaderContainer>
                            <PageIcon>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-shield" width="80" height="80" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M6 21v-2a4 4 0 0 1 4 -4h2" />
                                    <path d="M22 16c0 4 -2.5 6 -3.5 6s-3.5 -2 -3.5 -6c1 0 2.5 -.5 3.5 -1.5c1 1 2.5 1.5 3.5 1.5z" />
                                    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                                </svg>
                            </PageIcon>
                            <Title>{language.system_user}</Title>
                        </SubHeaderContainer>
                    </div>
            </ContentContiner>
        </>
    );
}

export default Departaments;