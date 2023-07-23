const getAllUsers = async (address) => {
    let userData = undefined
    try {
        const response = await fetch(`${address}/User`, {
            method: 'GET'
        })
        userData = await response.json()
    } catch(error) {
        console.log(error)
    }
    return userData
}

const getUserById = async (address, id) => {
    let userData = undefined
    try {
        const response = await fetch(`${address}/User/${id}`, {
            method: 'GET'
        })
        userData = response.json()
    } catch(error) {
        console.error(error)
    }
    return userData
}

const useUser = (data) => {
    switch(data.type) {
        case 'getAllUsers':
            return getAllUsers
            break
        case 'getUserById':
            return getUserById
            break
    }
}

export default useUser