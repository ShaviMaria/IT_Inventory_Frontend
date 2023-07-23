import { useState } from 'react';
import useSystem_Users from '../api/useSystem_Users';

const useLoginForm = (initial) => {
    const [ value, setValue ] = useState(initial);
    const [ sValue, manageCredentials, setSValue] = useSystem_Users({ user: value.user, password: value.password, server: value.server });

    const handleChange = e => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    }

    return [ value, sValue, handleChange, manageCredentials, setSValue ];
}

export default useLoginForm;