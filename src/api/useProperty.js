const getProperties = async (address) => {
    let data
    try {
        const response = await fetch(`${address}/Properties`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        data = await response.json()
        return data;
    } catch(error){
        console.error(error)
    }
}

const getLastProperty = async (address) => {
    let data
    try {
        const response = await fetch(`${address}/Properties/Last`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        data = await response.json()
        return data;
    } catch(error){
        console.error(error)
    } 
}

const addProperty = async (address, data) => {
    let response = undefined;
    try {
        response = await fetch(`${address}/Properties`, {
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

const getPropertyRelations = async (address, id) => {
    let data
    try {
        const response = await fetch(`${address}/Properties/getRelations/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        data = await response.json()
        return data;
    } catch(error){
        console.error(error)
    }
}

const deletePropertyById = async (address, data) => {
    let response = undefined

    try {
        response = await fetch(`${address}/Properties`, {
            method: 'DELETE',
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

const updatePropertyById = async (address, data) => {
    let response = undefined

    try{
        response = await fetch(`${address}/Properties`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        return response
    } catch(error) {
        console.error(error)
    }
}

const useProperty = (type) => {
    switch(type) {
        case 'getProperties':
            return getProperties
        case 'getLastProperty':
            return getLastProperty
        case 'addProperty':
            return addProperty
        case 'getPropertyRelations':
            return getPropertyRelations
        case 'deletePropertyById':
            return deletePropertyById
        case 'updatePropertyById':
            return updatePropertyById
    }
}

export default useProperty