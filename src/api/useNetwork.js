const getNetworks = async (address) => {
    let data
    try {
        const response = await fetch(`${address}/Networks`, {
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

const getNetworksByProperties = async (address, properties) => {
    let data
    try {
        const response = await fetch(`${address}/Networks/ByProperties/${properties}`, {
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

const getNetworksDHCPServers = async (address) => {
    let data
    try {
        const response = await fetch(`${address}/Networks/DHCP_Servers`, {
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

const getNetworksDHCPServersById = async (address, id) => {
    let data
    try {
        const response = await fetch(`${address}/Networks/DHCP_Servers/${id}`, {
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

const getRelations = async (address, id) => {
    let data
    try {
        const response = await fetch(`${address}/Networks/Relations/${id}`, {
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

const getGateways = async (address) => {
    let data
    try {
        const response = await fetch(`${address}/Networks/Gateways`, {
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

const getLastNetwork = async address => {
    let data
    try {
        const response = await fetch(`${address}/Networks/LastNetwork`, {
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

const getIpAddressByNetworkAndIp = async (address, network, ip) => {
    let data
    try {
        const response = await fetch(`${address}/Networks/IP_Address/${network}/${ip}`, {
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

const addNetwork = async (address, data) => {
    let response = undefined;
    try {
        response = await fetch(`${address}/Networks`, {
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


const addIpAddress = async (address, data) => {
    let response = undefined;
    try {
        response = await fetch(`${address}/Networks/IP_Address`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return response
    } catch(error) {
        console.error(error)
    }

    return response 
}

const addBroadcast = async (address, data) => {
    let response = undefined;
    try {
        response = await fetch(`${address}/Networks/Broadcast`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return response
    } catch(error) {
        console.error(error)
    }

    return response 
}

const updateNetwork = async (address, data) => {
    let response = undefined

    try{
        response = await fetch(`${address}/Networks`, {
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

const deleteNetwork = async (address, data) => {
    let response = undefined

    try {
        response = await fetch(`${address}/Networks`, {
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

const useNetwork = (type) => {
    switch(type) {
        case 'getNetworks':
            return getNetworks
        case 'getNetworksByProperties':
            return getNetworksByProperties
        case 'getNetworksDHCPServers':
            return getNetworksDHCPServers
        case 'getNetworksDHCPServersById':
            return getNetworksDHCPServersById
        case 'getRelations':
            return getRelations
        case 'getIpAddressByNetworkAndIp':
            return getIpAddressByNetworkAndIp
        case 'deleteNetwork':
            return deleteNetwork
        case 'getGateways':
            return getGateways
        case 'getLastNetwork':
            return getLastNetwork
        case 'addNetwork':
            return addNetwork
        case 'addIpAddress':
            return addIpAddress
        case 'addBroadcast':
            return addBroadcast
        case 'updateNetwork':
            return updateNetwork
    }
}

export default useNetwork