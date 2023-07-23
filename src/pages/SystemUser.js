import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import Header from '../components/Header'
import ContentContiner from '../components/ContentContainer'
import NavigationMenu from '../components/NavigationMenu'
import PageIcon from '../components/PageIcon'
import useLanguageContent from '../hooks/useLanguageContent'
import Loading from '../components/Loading'
import Title from '../components/Title'
import SubHeaderContainer from '../components/SubHeaderContainer'
import Label from '../components/Label'
import Text from '../components/Text'
import Button from '../components/Button'
import SecondaryButton from '../components/SecondaryButton'
import CheckboxText from '../components/CheckboxText'
import InputText from '../components/InputText'
import SubLabel from '../components/SubLabel'
import TextError from '../components/TextError'
import NotificationMessange from '../components/NotificationMessage'
import useServer from '../api/useServer'
import useUser from '../api/useUser'
import useSystem_User from '../api/useSystem_User'
import useEvent from '../api/useEvent'
import useDate from '../hooks/useDate'
import md5 from 'md5'
import '../css/SystemUser.css'
import { current } from '@reduxjs/toolkit'


const SystemUser = () => {
    const [ server, port ] = useServer()
    const address = `http://${server}:${port}/api`
    const cookies = new Cookies()
    const userId = cookies.get('Id_User_System_User')
    const [ state, setState ] = useState({
        check_language: false,
        select_language: '',
        check_password: '',
        new_password: '',
        repeat_password: '',
        language_ready: false,
        password_ready: false,
        button_disable: true,
        update_successful_notification: false
    })
    
    const currentDate = useDate('currentFullDate')
    const language = useLanguageContent(cookies.get('Language'))
    const getUserById = useUser({ type: 'getUserById' })
    const addSystemUserEvent = useEvent('addSystemUserEvent')
    const updateSystem_UserById = useSystem_User({ type: 'updateSystem_UserById' })
    const getSystem_UserByUserAndPassword = useSystem_User({ type: 'getSystem_UserByUserAndPassword'})

    const handleChange = e => { 
        let languageReady = state.language_ready
        let passwordReady = state.password_ready
        let buttonDisable = state.button_disable

        const checkButtonDisable = (checked, secondChecked, elementReady, secondElementReady) => {
            if(checked && secondChecked) {
                if(elementReady && secondElementReady) {
                    buttonDisable = false
                } else {
                    buttonDisable = true
                }
            }

            if(checked && !secondChecked) {
                if(elementReady) {
                    buttonDisable = false
                } else {
                    buttonDisable = true
                }
            }

            if(!checked && secondChecked) {
                if(secondElementReady) {
                    buttonDisable = false
                } else {
                    buttonDisable = true
                }
            }

            if(!checked && !secondChecked) {
                buttonDisable = true
            }
        }
        
        switch(e.target.name) {
            case 'check_language':
                if(e.target.checked && state.select_language !== '') {
                    languageReady = true
                } else {
                    languageReady = false
                }
                
                checkButtonDisable(e.target.checked, state.check_password, languageReady, passwordReady)
                if(!e.target.checked) {
                    setState({
                        ...state,
                        [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
                        ['language_ready']: languageReady,
                        ['password_ready']: passwordReady,
                        ['select_language']: '',
                        ['button_disable']: buttonDisable
                    })
                }
                if(e.target.checked) {
                    setState({
                        ...state,
                        [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
                        ['language_ready']: languageReady,
                        ['password_ready']: passwordReady,
                        ['button_disable']: buttonDisable
                    })
                }
                break
            case 'select_language':
                if(e.target.value !== '' && state.check_language) {
                    languageReady = true
                } else {
                    languageReady = false
                }
                checkButtonDisable(state.check_language, state.check_password, languageReady, passwordReady)
                if(state.check_language) {
                    setState({
                        ...state,
                        [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
                        ['language_ready']: languageReady,
                        ['password_ready']: passwordReady,
                        ['button_disable']: buttonDisable
                    })
                }
                break
            case 'check_password':
                if(e.target.checked && state.new_password !== '' && state.repeat_password !== '') {
                    if(state.new_password === state.repeat_password) {
                        passwordReady = true
                    } else {
                        passwordReady = false
                    }
                }
                checkButtonDisable(state.check_language, e.target.checked, languageReady, passwordReady)
                if(!e.target.checked) {
                    passwordReady = false
                    setState({
                        ...state,
                        [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
                        ['language_ready']: languageReady,
                        ['password_ready']: passwordReady,
                        ['new_password']: '',
                        ['repeat_password']: '',
                        ['button_disable']: buttonDisable
                    })
                }
                if(e.target.checked) {
                    setState({
                        ...state,
                        [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
                        ['language_ready']: languageReady,
                        ['password_ready']: passwordReady,
                        ['button_disable']: buttonDisable
                    })
                }
                break
            case 'new_password':
                if(state.check_password && e.target.value !== '' && state.repeat_password !== '') {
                    if(e.target.value === state.repeat_password) {
                        passwordReady = true
                    } else {
                        passwordReady = false
                    }
                }

                checkButtonDisable(state.check_language, state.check_password, languageReady, passwordReady)
                if(state.check_password) {
                    setState({
                        ...state,
                        [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
                        ['language_ready']: languageReady,
                        ['password_ready']: passwordReady,
                        ['button_disable']: buttonDisable
                    })
                }
                break
            case 'repeat_password':
                if(state.check_password && state.new_password !== '' && e.target.value !== '') {
                    if(state.new_password === e.target.value) {
                        passwordReady = true
                    } else {
                        passwordReady = false
                    }
                }

                checkButtonDisable(state.check_language, state.check_password, languageReady, passwordReady)
                if(state.check_password) {
                    setState({
                        ...state,
                        [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
                        ['language_ready']: languageReady,
                        ['password_ready']: passwordReady,
                        ['button_disable']: buttonDisable
                    })
                }
                break
        } 
    } 
    useEffect( () => {
        if(!cookies.get('Windows_User')) {
            window.location.href = './';
        }

        const fn = async () => {
            try {
                const userResult = await getUserById(address, userId)
                const systemUserResult = await getSystem_UserByUserAndPassword(address, cookies.get('Windows_User'), cookies.get('System_User_Password'))
                setState({
                    ...state,
                    userData: userResult,
                    systemUserData: systemUserResult
                })
            } catch(error) {
                console.error(error)
            }
        }
        fn()
    }, []) 

    return (
        <>
            <Header />
            <ContentContiner>
                <NavigationMenu />
                {state.update_successful_notification
                    ? <NotificationMessange type='successful'>{language.update_successfully}</NotificationMessange>
                    : null
                }
                <div className='system-user-container'>
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
                    {!state.userData || !state.systemUserData ? <Loading />
                        :
                        <div className='system-user-form'>
                            <div className='system-user-form-container'>
                                <div>
                                    <Label>{language.name}</Label>
                                    <Text>{state.userData[0].Name}</Text>
                                </div>
                                <div>
                                    <Label>{language.first_surname}</Label>
                                    <Text>{state.userData[0].First_Surname}</Text>
                                </div>
                                <div>
                                    <Label>{language.second_surname}</Label>
                                    <Text>{state.userData[0].Second_Surname}</Text>
                                </div>
                                <div>
                                    <Label>{language.user}</Label>
                                    <Text>{state.userData[0].Windows_User}</Text>
                                </div>
                                <div>
                                    <Label>{language.employee_number}</Label>
                                    <Text>{state.userData[0].Employee_Number}</Text>
                                </div>
                                <div>
                                    <Label>{language.email}</Label>
                                    <Text>{state.userData[0].Email}</Text>
                                </div>
                                <div>
                                    <Label>{language.job}</Label>
                                    <Text>{state.userData[0].Job}</Text>
                                </div>
                                <div>
                                    <Label>{language.user_type}</Label>
                                    <Text>{state.systemUserData[0].User_Type}</Text>
                                </div>
                                <div>
                                    <div className='system-user-language-check-container'>
                                        <Label>{language.language}</Label>
                                        <div>
                                            <input type='checkbox' name='check_language' checked={state.check_language} onChange={handleChange}/>
                                            <CheckboxText>{language.modify}</CheckboxText>
                                        </div> 
                                    </div>
                                    {!state.check_language ? <Text>{state.systemUserData[0].Language}</Text> : null}
                                    {state.check_language ? 
                                        <select name='select_language' value={state.select_language} onChange={handleChange}>
                                            <option value=''>-- {language.select} --</option>
                                            <option value='auto'>Auto</option>
                                            <option value='en'>{language.english}</option>
                                            <option value='es'>{language.spanish}</option>
                                        </select> 
                                        : null
                                    }
                                </div>
                            </div>
                            <div className='system-user-new-password-container'> 
                                <div className='system-user-new-password-check-container'>
                                    <input type='checkbox' name='check_password' checked={state.check_password} onChange={handleChange}/>
                                    <CheckboxText>{language.change_password}</CheckboxText>
                                </div>
                                {state.check_password ?
                                    <div className='system-user-new-password-change-password-container'>
                                        <Label>{language.change_password}</Label>
                                        <div className='system-user-new-password-change-password-inputs-container'>
                                            <div className='system-user-new-password-change-password-input-container'>
                                                <SubLabel>{language.new_password}</SubLabel>
                                                <InputText
                                                    name='new_password'
                                                    type='password'
                                                    value={state.new_password}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className='system-user-new-password-change-password-input-container'>
                                                <SubLabel>{language.repeat_password}</SubLabel>
                                                <InputText
                                                    name='repeat_password'
                                                    type='password'
                                                    value={state.repeat_password}
                                                    onChange={handleChange}
                                                />
                                                {state.check_password && state.new_password !== state.repeat_password && state.repeat_password !== ''
                                                    ? <TextError>{language.password_dont_match}</TextError>
                                                    : null
                                                }
                                            </div> 
                                        </div>
                                    </div>
                                : null}
                            </div>
                            <div className='system-user-button-container'>
                                <Button
                                    disabled={state.button_disable}
                                    onClick={ async () => {

                                        let auxEventDetail = ''
                                        let data = {}
                                        if(state.new_password !== '' && state.new_password === state.repeat_password && state.select_language !== '') {
                                            const md5Password = md5(state.new_password)
                                            data = {
                                                ...data,
                                                ["id"]: cookies.get('Id_User_System_User'),
                                                ["language"]: state.select_language,
                                                ["password"]: md5Password
                                            }
                                            auxEventDetail = 'Password y Language'
                                        } else if(state.new_password !== '' && state.new_password === state.repeat_password) {
                                            const md5Password = md5(state.new_password)
                                            data = {
                                                ...data,
                                                ["id"]: cookies.get('Id_User_System_User'),
                                                ["password"]: md5Password
                                            }
                                            auxEventDetail = 'Password'
                                        } else if(state.select_language !== '') {
                                            data = {
                                                ...data,
                                                ["id"]: cookies.get('Id_User_System_User'),
                                                ["language"]: state.select_language
                                            }
                                            auxEventDetail = 'Language'
                                        }

                                        const response = await updateSystem_UserById(address, {
                                            method: 'PUT',
                                            headers: {
                                            'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify(data)
                                        })

                                        if(response.ok) {
                                            if(state.new_password !== '' && state.new_password === state.repeat_password) {
                                                cookies.set('System_User_Password', data.password, {path: '/'})
                                            } else {
                                                cookies.set('Language', data.language, {path: '/'})
                                            }
                                            
                                            const eventData = {
                                                ["event"]: "Actualización de usuario de sistema",
                                                ["event_date"]: currentDate,
                                                ["details"]: "Actualización de usuario de sistema " + cookies.get('Windows_User') + ", actualizó " + auxEventDetail,
                                                ["user"]: parseInt(cookies.get('Id_User_System_User'))
                                            }
                                            const systemUserResult = await getSystem_UserByUserAndPassword(address, cookies.get('Windows_User'), cookies.get('System_User_Password'))
                                            await addSystemUserEvent(address, eventData)
                                            setState({
                                                ...state,
                                                //['userData']: userResult,
                                                ['systemUserData']: systemUserResult,
                                                ['check_language']: false,
                                                ['select_language']: '',
                                                ['check_password']: false,
                                                ['new_password']: '',
                                                ['repeat_password']: '',
                                                ['language_ready']: false,
                                                ['password_ready']: false,
                                                ['button_disable']: true,
                                                ['update_successful_notification']: true
                                            })

                                            setTimeout(() => {
                                                setState({
                                                    ...state,
                                                    ['check_language']: false,
                                                    ['select_language']: '',
                                                    //['userData']: userResult,
                                                    ['systemUserData']: systemUserResult,
                                                    ['check_password']: false,
                                                    ['new_password']: '',
                                                    ['repeat_password']: '',
                                                    ['language_ready']: false,
                                                    ['password_ready']: false,
                                                    ['button_disable']: true,
                                                    ['update_successful_notification']: false
                                                })
                                            }, 1000)
                                        }
                                    }}
                                >
                                    {language.save}
                                </Button>
                                <SecondaryButton>{language.add_user}</SecondaryButton>
                            </div>
                        </div>
                    }
                </div>
            </ContentContiner>
        </>
    )
}

export default SystemUser