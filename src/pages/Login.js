import { useEffect } from 'react'
import Cookies from 'universal-cookie'
import useLoginForm from '../hooks/useLoginForm'
import Field from '../components/Field'
import Button from '../components/Button'
import TextError from '../components/TextError'
import Header from '../components/Header'
import '../css/Login.css'
import MITLogo from '../assets/pictures/MIT_Logo.png'
import User_Icon from '../assets/pictures/User_Icon.webp'
import Lock_Input_Icon from '../assets/pictures/Lock_Icon.png'
import User_Input_Icon from '../assets/pictures/User_Icon_Draw.png'
import useServer from '../api/useServer'

const cookies = new Cookies();

const Login = () => {
    const [ serverIp, port ] = useServer()
    const server = `http://${serverIp}:${port}/api`
    const [ value, sValue, handleChange, manageCredentials, setSValue ] = useLoginForm({ user: '', password: '', buttonPushed: false, server: server, credentialsFail: false, startingSesion: false});

    useEffect(() => {
        if(cookies.get('Windows_User')) {
            window.location.href = './Home';
        }
    }, []);

    const inputEvent = async e => {
        if(e.key == 'Enter') {
            await manageCredentials({ user: value.user, password: value.password });
        }
    }

    return(
        <>
            <Header />
            <div className='login-container'>
                <div className='login-big-icon-container'>
                    <div>
                        <img className='login-big-icon' src={User_Icon}></img>
                    </div>
                </div>
                

                <div className='login-box'>
                    <h1 className='login-trademark'>MIT</h1>

                    <div className='mit-logo-login-container'>
                        <img className='mit-logo-login' src={MITLogo}></img>
                    </div>
                    

                    <div className='fields-container'>
                        <Field
                        className='login-input'
                        secondInputClassName=''
                        img={User_Input_Icon}
                        name='user'
                        type='text'
                        onKeyPress={inputEvent}
                        value={value.user}
                        onChange={handleChange}
                        >
                            Usuario
                        </Field>

                        <Field
                        className='login-input'
                        secondInputClassName='icon-input-lock-container'
                        img={Lock_Input_Icon}
                        name='password'
                        type='password'
                        onKeyPress={inputEvent}
                        value={value.password}
                        onChange={handleChange}
                        >
                            Contraseña
                        </Field>
                        
                        <Button secondButtonClassName='login-button' onClick={async () => {
                            await manageCredentials({ user: value.user, password: value.password });
                        }}>Ingresar</Button>
                        {
                            //<Input type='submit' value='Iniciar Sesión' onClick={async () => {
                            //await manageCredentials({ user: value.user, password: value.password });
                            //}}/>
                        }
                        
                    </div>
                </div> 
            </div>
            <div className='errors-container'>
                <div>
                    {sValue.credentialsFail ? <TextError>Usuario o Contraseña incorrectos</TextError> : <></>}
                    {sValue.credentialsFail2 ? handleChange({ target: {name: 'password', value: ''} }) : <></>}
                    {sValue.credentialsFail2 ? setSValue('credentialsFail2', '') : <></>}
                    {sValue.buttonPushed && value.password.length === 0 ? <TextError>Debes ingresar una contraseña</TextError> : <></>}
                    {sValue.buttonPushed && value.user.length === 0 ? <TextError>Debes ingresar un usuario</TextError> : <></>}
                </div>
            </div>
        </>
    )
}

export default Login;