import { useState } from 'react';
import md5 from 'md5';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const useSystem_Users = ({ server, user, password, startingSesion }) => {
    const [value, setValue] = useState({ server: server, user: user, password: password, startingSesion: startingSesion, userData: undefined });

    const handleValue = (property, v) => {
        setValue({
            ...value,
            [property]: v
        });
    }

    const manageCredentials = async (credentials) => {
        const userData = await callSystem_Users(value.server, credentials.user, credentials.password); 
        setValue({
            ...value,
            ['user']: credentials.user,
            ['password']: credentials.password,
            ['userData']: userData
        });
        
        if(userData === undefined || userData.length === 0){
            setValue({
                ...value,
                ['credentialsFail']: true,
                ['credentialsFail2']: true,
                ['buttonPushed']: true,
            });
        } else {
            setValue({
                ...value,
                ['credentialsFail']: false,
                ['credentialsFail2']: false,
                ['buttonPushed']: false,
            });
            cookies.set('User_Name', userData[0].Name, {path: '/'});
            cookies.set('First_Surname', userData[0].First_Surname, {path: '/'});
            cookies.set('Second_Surname', userData[0].Second_Surname, {path: '/'});
            cookies.set('User_Type', userData[0].User_Type, {path: '/'});
            cookies.set('Windows_User', userData[0].Windows_User, {path: '/'});
            cookies.set('Language', userData[0].Language, {path: '/'});
            cookies.set('Id_User_System_User', userData[0].Id_User, {path: '/'});
            cookies.set('Id_System_User', userData[0].Id_System_User, {path: '/'});
            cookies.set('System_User_Password', userData[0].Password, {path: '/'});
            cookies.set('Sections', JSON.stringify(userData[0].Sections), {path: '/'});
            cookies.set('Properties', JSON.stringify(userData[0].Properties), {path: '/'});
            window.location.href='./Home';
        }
    }

    return [ value, manageCredentials, handleValue ];
}

//OTHER FUNCTION
const callSystem_Users = async (server, user, password, startingSesion) => {
    let userData = undefined;

    if(user.length != 0 && password.length != 0) {
        const md5Password = md5(password);
        try{
            const response = await fetch(`${server}/System_Users/${user}/${md5Password}`, {
                //headers: {
                    //'Content-Type': 'application/json',
                //},
                method: 'GET', 
                //mode: 'no-cors'
            });
            userData = await response.json();
        } catch(error) {
            console.error(error);
        }
    }

    return userData;
}

export default useSystem_Users;