const getSystem_UserByUserAndPassword = async (address, user, password) => {
    let data = undefined
    try {
        const response = await fetch(`${address}/System_Users/${user}/${password}`, {
            method: 'GET' 
        })
        data = await response.json()
    } catch(error) {
        console.error(error)
    }

    return data
}

const updateSystem_UserById = async (address, data) => {
    let response = undefined
    try {
        response = await fetch(`${address}/System_Users/`, data)
    } catch(error) {
        console.error(error)
    }

    return response
}

const useSystem_User = (data) => {
    switch(data.type) {
        case 'getSystem_UserByUserAndPassword':
            return getSystem_UserByUserAndPassword
            break
        case 'updateSystem_UserById':
            return updateSystem_UserById
            break
        default:
            return 'Error'
    }
}

export default useSystem_User