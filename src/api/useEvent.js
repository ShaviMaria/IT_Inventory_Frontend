const addSystemUserEvent = async (address, data) => {
    let response = undefined;
    try {
        response = await fetch(`${address}/Events/System_User`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    } catch(error) {
        console.error(error)
    }

    return response
}

const addPropertyEvent = async (address, data) => {
    let response = undefined;
    try {
        response = await fetch(`${address}/Events/Property`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    } catch(error) {
        console.error(error)
    }

    return response
}

const addGenericEvent = async (address, data) => {
    let response = undefined;
    try {
        response = await fetch(`${address}/Events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    } catch(error) {
        console.error(error)
    }

    return response
}

const useEvent = (type) => {
    switch(type) {
        case 'addSystemUserEvent':
            return addSystemUserEvent
        case 'addPropertyEvent':
            return addPropertyEvent
        case 'addGenericEvent':
            return addGenericEvent
    }
}

export default useEvent