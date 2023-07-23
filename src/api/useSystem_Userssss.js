import { useState } from 'react';

const useSystem_Users = async (initial) => {
    const [value, setValue] = useState({ user: initial.user, password: initial.password });
    let userData = '';

    const changeCredentials = (property, v) => {
        setValue({
            ...value,
            [property]: v
        });
    }

    if(value.user.length != 0 && value.password.length != 0) {
        try{
            const response = await fetch(`${initial.server}/System_Users`, {
                headers: {},
                body: {
                    "Windows_User": `${value.user}`,
                    "Password": `${value.password}`
                }
            });
            userData = response.json();
        } catch(error) {
            console.error("Error calling System_Users endpoint",error);
        }
    }
 
    return [ userData, changeCredentials ];

}

export default useSystem_Users;