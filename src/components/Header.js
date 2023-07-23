import MHILogo from '../assets/pictures/Melia_Hotels_International_logo_White.png'
import MITLogo from '../assets/pictures/MIT_Logo.png'
import userIcon from '../assets/pictures/User-Icon.webp'
import Cookies from 'universal-cookie'
import useLanguageContent from '../hooks/useLanguageContent'
import { useState } from 'react'
import '../css/Header.css'

const cookies = new Cookies();

const Header = () => {
    const [ open, setOpen ] = useState(false)
    const language = useLanguageContent(cookies.get('Language'))

    let userBoxClassName = 'userBox'
    switch(open) {
        case true:
            userBoxClassName += ' userBoxOpen'
            break
        case false:
            userBoxClassName += ' userBoxClosed'
            break
    }

    const signOff = () => {
        cookies.remove('User_Name')
        cookies.remove('First_Surname')
        cookies.remove('Second_Surname')
        cookies.remove('User_Type')
        cookies.remove('Windows_User')
        cookies.remove('Language')
        window.location.href = '/'
    }
    return (
        <header className="header">
           <div className='header-container'>
                <div className="melia-hotels-international-logo-container">
                    <img alt='Melia Hotels International Logo' src={MHILogo}></img>
                </div>

                {cookies.get('Windows_User') ?
                    <div className='icons-header-container-logued'>
                        <div className='mit-logo-container-logued'>
                            <img alt='MIT Logo' src={MITLogo}></img>
                        </div>
                        <div className='header-user-info-logued' onClick={() => setOpen(!open)}>
                            <div className='user-icon-header-container-logued'>
                                <img alt='User Icon Header' src={userIcon}></img>
                            </div>
                            <h3>{cookies.get('Windows_User')}</h3>
                        </div>
                        {open ?
                            <span className={userBoxClassName}>
                                <h2>{cookies.get('Windows_User')}</h2>
                                <nav>
                                    <a onClick={() => window.location.href = '/SystemUser'}>{language.settings}</a>
                                </nav>
                                <button onClick={() => signOff()}>{language.sign_off}</button>
                            </span> 
                        : null
                        }
                    </div>
                    :
                    <div className='mit-logo-container-unlogued'>
                        <img alt='MIT Logo' src={MITLogo}></img>
                    </div>
                } 

            </div> 
            
        </header>
    )
}

export default Header;