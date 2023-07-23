import { useEffect, useState } from 'react'
import ip from 'ip'
import Cookies from 'universal-cookie'
import NavigationMenu from '../components/NavigationMenu'
import Header from '../components/Header'
import ContentContiner from '../components/ContentContainer'
import SubHeaderContainer from '../components/SubHeaderContainer'
import PageIcon from '../components/PageIcon'
import Title from '../components/Title'
import InformationBar from '../components/InformationBar'
import TertiaryButton from '../components/TertiaryButton'
import SubLabel from '../components/SubLabel'
import InputText from '../components/InputText'
import Loading from '../components/Loading'
import Table from '../components/Table'
import PageContent from '../components/PageContent'
import NotificationMessange from '../components/NotificationMessage'
import InteractionBox from '../components/InteractionBox'
import DeleteContent from '../components/DeleteContent'
import NewContent from '../components/NewContent'
import UpdateContent from '../components/UpdateContent'
import DetailsContent from '../components/DetailsContent'
import useLanguageContent from '../hooks/useLanguageContent'
import useDate from '../hooks/useDate'
import useEvent from '../api/useEvent'
import useServer from '../api/useServer'
import useNetwork from '../api/useNetwork'
import useProperty from '../api/useProperty'

const Networks = () => {
    const [ state, setState ] = useState({
        search: '',
        networks: null,
        selectedRow: null,
        selectedNew: false,
        selectedDetails: false,
        selectedDelete: false,
        deletePushed: false,
        deletePhase: false,
        deleteFailed: false,
        addFailed: false,
        deleteSuccessfuly: false,
        addedSuccessfuly: false,
        readyToDelete: false,
        addButtonPushed: false,
        networkRelations: null,
        properties: null,
        Property_Input_Changed: false,
        Network_Name_Input_Changed: false,
        Network_Address_Input_Changed: false,
        Subnet_Mask_Input_Changed: false,
        Property: '',
        Network_Name: '',
        Network_Address: '',
        Subnet_Mask: '',
    })
    const cookies = new Cookies()
    const language = useLanguageContent(cookies.get('Language'))
    const [ server, port ] = useServer()
    const address = `http://${server}:${port}/api`
    const currentDate = useDate('currentFullDate')

    const getNetworks = useNetwork('getNetworks')
    const getNetworksDHCPServers = useNetwork('getNetworksDHCPServers')
    const getRelations = useNetwork('getRelations')
    const getGateways = useNetwork('getGateways')
    const getLastNetwork = useNetwork('getLastNetwork')
    const getIpAddressByNetworkAndIp = useNetwork('getIpAddressByNetworkAndIp')
    const addNetwork = useNetwork('addNetwork')
    const addIpAddress = useNetwork('addIpAddress')
    const addBroadcast = useNetwork('addBroadcast')
    const updateNetwork = useNetwork('updateNetwork')
    const deleteNetwork = useNetwork('deleteNetwork')

    const getProperties = useProperty('getProperties')

    const addGenericEvent = useEvent('addGenericEvent')

    ip.isMask = (ip) => {
        let isMask = false

        const maskList = [
            '128.0.0.0', //1
            '192.0.0.0', //2
            '224.0.0.0', //3
            '240.0.0.0', //4
            '248.0.0.0', //5
            '252.0.0.0', //6
            '254.0.0.0', //7
            '255.0.0.0', //8
            '255.128.0.0', //9
            '255.192.0.0', //10
            '255.224.0.0', //11
            '255.240.0.0', //12
            '255.248.0.0', //13
            '255.252.0.0', //14
            '255.254.0.0', //15
            '255.255.0.0', //16
            '255.255.128.0', //17
            '255.255.192.0', //18
            '255.255.224.0', //19
            '255.255.240.0', //20
            '255.255.248.0', //21
            '255.255.252.0', //22
            '255.255.254.0', //23
            '255.255.255.0', //24
            '255.255.255.128', //25
            '255.255.255.192', //26
            '255.255.255.224', //27
            '255.255.255.240', //28
            '255.255.255.248', //29
            '255.255.255.252', //30
            '255.255.255.254', //31
            '255.255.255.255' //32
        ]

        maskList.map(mask => {
            if(!isMask) {
                if(mask === ip) {
                    isMask = true
                }
            }
        })

        return isMask
    }
    
    const handleChange = e => {
        switch(e.target.name) {
            case 'Property':
            case 'Network_Name':
            case 'Network_Address':
            case 'Subnet_Mask':
                setState({
                    ...state,
                    [e.target.name]: e.target.value,
                    [`${e.target.name}_Input_Changed`]: true
                })
                break
            default:
            setState({
                ...state,
                [e.target.name]: e.target.value
            })
        }
    }

    useEffect(() => {
        if(!cookies.get('Windows_User')) {
            window.location.href = './'
        }

        const getInitialData = async () => {
            let initialNetworks = await getNetworks(address)
            const dhcpServers = await getNetworksDHCPServers(address)
            const gateways = await getGateways(address)
            const networks = []

            initialNetworks = initialNetworks.reduce((acc, network) => {
                const property = `${network.Property_Code} - ${network.Property_Name}`

                delete network.Property_Code
                delete network.Property_Name

                network = {
                    ['Id_Network']: network.Id_Network,
                    ['Property']: property,
                    ...network
                }

                acc.push(network)
                return acc
            }, [])

            console.log(initialNetworks)

            if(initialNetworks.length > 0) {
                initialNetworks.map(network => {
                    if(gateways.length > 0) {
                        network = gateways.reduce((acc, elem) => {
                            if(network.Id_Network === elem.Id_Network) {
                                acc = {
                                    ...acc,
                                    ['Gateway']: elem.Gateway
                                }
                            } else if(acc.Gateway) {
                                if(acc.Gateway !== 'N/A') {
                                    
                                } else {
                                    acc = {
                                        ...acc,
                                        ['Gateway']: 'N/A'
                                    }
                                }
                            } else {
                                acc = {
                                    ...acc,
                                    ['DHCP_Server']: 'N/A'
                                }
                            }
    
                            return acc
                            
                        }, network)
                    } else {
                        network = {
                            ...network,
                            ['Gateway']: 'N/A'
                        }
                    }
                    
                    if(dhcpServers.length > 0) {
                        network = dhcpServers.reduce((acc, elem) => {
                            if(network.Id_Network === elem.Id_Network) {
                                acc = {
                                    ...acc,
                                    ['DHCP_Server']: elem.DHCP_Server
                                }
                            } else if(acc.DHCP_Server) {
                                if(acc.DHCP_Server !== 'N/A') {
                                    
                                } else {
                                    acc = {
                                        ...acc,
                                        ['DHCP_Server']: 'N/A'
                                    }
                                }
                            } else {
                                acc = {
                                    ...acc,
                                    ['DHCP_Server']: 'N/A'
                                }
                            }
    
                            return acc
                        }, network)
                    } else {
                        network = {
                            ...network,
                            ['DHCP_Server']: 'N/A'
                        }
                    }

                    networks.push(network)
                })
            }

            const initialProperties = await getProperties(address)
            const properties = initialProperties.reduce((acc, elem) => {
                acc.push({
                    Id_Property: elem.Id_Property,
                    Property: `${elem.Property_Code} ${elem.Name}`
                })
                return acc
            }, [])

            setState({
                ...state,
                ['networks']: networks,
                ['properties']: properties
            })
        }

        getInitialData()
    }, [])

    //useEffect used to search networks
    useEffect(() => {

        const getData = async () => {
            let initialNetworks = await getNetworks(address)
            const dhcpServers = await getNetworksDHCPServers(address)
            const gateways = await getGateways(address)
            const networks = []

            initialNetworks = initialNetworks.reduce((acc, network) => {
                const property = `${network.Property_Code} - ${network.Property_Name}`

                delete network.Property_Code
                delete network.Property_Name

                network = {
                    ['Id_Network']: network.Id_Network,
                    ['Property']: property,
                    ...network
                }

                acc.push(network)
                return acc
            }, [])

            if(initialNetworks.length > 0) {
                initialNetworks.map(network => {
                    if(gateways.length > 0) {
                        network = gateways.reduce((acc, elem) => {
                            if(network.Id_Network === elem.Id_Network) {
                                acc = {
                                    ...acc,
                                    ['Gateway']: elem.Gateway
                                }
                            } else if(acc.Gateway) {
                                if(acc.Gateway !== 'N/A') {
                                    
                                } else {
                                    acc = {
                                        ...acc,
                                        ['Gateway']: 'N/A'
                                    }
                                }
                            } else {
                                acc = {
                                    ...acc,
                                    ['DHCP_Server']: 'N/A'
                                }
                            }
    
                            return acc
                            
                        }, network)
                    } else {
                        network = {
                            ...network,
                            ['Gateway']: 'N/A'
                        }
                    }
                    
                    if(dhcpServers.length > 0) {
                        network = dhcpServers.reduce((acc, elem) => {
                            if(network.Id_Network === elem.Id_Network) {
                                acc = {
                                    ...acc,
                                    ['DHCP_Server']: elem.DHCP_Server
                                }
                            } else if(acc.DHCP_Server) {
                                if(acc.DHCP_Server !== 'N/A') {
                                    
                                } else {
                                    acc = {
                                        ...acc,
                                        ['DHCP_Server']: 'N/A'
                                    }
                                }
                            } else {
                                acc = {
                                    ...acc,
                                    ['DHCP_Server']: 'N/A'
                                }
                            }
    
                            return acc
                        }, network)
                    } else {
                        network = {
                            ...network,
                            ['DHCP_Server']: 'N/A'
                        }
                    }

                    networks.push(network)
                })
            }

            const initialProperties = await getProperties(address)
            const properties = initialProperties.reduce((acc, elem) => {
                acc.push({
                    Id_Property: elem.Id_Property,
                    Property: `${elem.Property_Code} ${elem.Name}`
                })
                return acc
            }, [])
            
            return [ networks, properties ]
        }

        const searchFunction = async () => {
            if(state.search !== '') {
                const [ networks ] = await getData()
                const newTempListNetworks = networks.map( network => {
                    let include = false;
                    const networksKeys = Object.keys(network)

                    networksKeys.forEach( key => {
                        if(!include) {
                            if(network[key].toString().toLowerCase().includes(state.search.toLowerCase())) {
                                include = true
                            }
                        }
                    })

                    if(include) {
                        return network
                    }
                })

                const newNetworkList = newTempListNetworks.reduce((acc, elem) => {
                    if(elem !== undefined) {
                        acc.push(elem)
                        return acc
                    } else {
                        return acc
                    }
                }, [])

                setState({
                    ...state,
                    ['networks']: newNetworkList
                })
            } else {
                const [ networks, properties ] = await getData()
                setState({
                    ...state,
                    ['networks']: networks,
                    ['properties']: properties
                })
            }
        }
        searchFunction()

    }, [state.search])

    //useEffect used to delete networks
    useEffect(() => {
        const fn = async () => {
            switch(state.deletePhase) {
                case 'first': 
                    const relations = await getRelations(address, state.selectedRow.Id_Network)
                    if(relations.length > 0) {
                        setState({
                            ...state,
                            ['readyToDelete']: false,
                            ['selectedDelete']: true,
                            ['networkRelations']: relations
                        })
                    } else {
                        setState({
                            ...state,
                            ['readyToDelete']: true,
                            ['selectedDelete']: true,
                            ['networkRelations']: relations
                        })
                    }
                    break
                case 'last':
                    const response = await deleteNetwork(address, { "id": state.selectedRow.Id_Network })
                    if(response.ok) {
                        let initialNetworks = await getNetworks(address)
                        const dhcpServers = await getNetworksDHCPServers(address)
                        const gateways = await getGateways(address)
                        const networks = []

                        initialNetworks = initialNetworks.reduce((acc, network) => {
                            const property = `${network.Property_Code} - ${network.Property_Name}`
            
                            delete network.Property_Code
                            delete network.Property_Name
            
                            network = {
                                ['Id_Network']: network.Id_Network,
                                ['Property']: property,
                                ...network
                            }
            
                            acc.push(network)
                            return acc
                        }, [])

                        if(initialNetworks.length > 0) {
                            initialNetworks.map(network => {
                                if(gateways.length > 0) {
                                    network = gateways.reduce((acc, elem) => {
                                        if(network.Id_Network === elem.Id_Network) {
                                            acc = {
                                                ...acc,
                                                ['Gateway']: elem.Gateway
                                            }
                                        } else if(acc.Gateway) {
                                            if(acc.Gateway !== 'N/A') {
                                                
                                            } else {
                                                acc = {
                                                    ...acc,
                                                    ['Gateway']: 'N/A'
                                                }
                                            }
                                        } else {
                                            acc = {
                                                ...acc,
                                                ['DHCP_Server']: 'N/A'
                                            }
                                        }
                
                                        return acc
                                        
                                    }, network)
                                } else {
                                    network = {
                                        ...network,
                                        ['Gateway']: 'N/A'
                                    }
                                }
                                
                                if(dhcpServers.length > 0) {
                                    network = dhcpServers.reduce((acc, elem) => {
                                        if(network.Id_Network === elem.Id_Network) {
                                            acc = {
                                                ...acc,
                                                ['DHCP_Server']: elem.DHCP_Server
                                            }
                                        } else if(acc.DHCP_Server) {
                                            if(acc.DHCP_Server !== 'N/A') {
                                                
                                            } else {
                                                acc = {
                                                    ...acc,
                                                    ['DHCP_Server']: 'N/A'
                                                }
                                            }
                                        } else {
                                            acc = {
                                                ...acc,
                                                ['DHCP_Server']: 'N/A'
                                            }
                                        }
                
                                        return acc
                                    }, network)
                                } else {
                                    network = {
                                        ...network,
                                        ['DHCP_Server']: 'N/A'
                                    }
                                }

                                networks.push(network)
                            })
                        }

                        const eventData = {
                            "event": "Eliminación de Red",
                            "event_date": currentDate,
                            "details": "Eliminación de Red " + state.selectedRow['Network_Name'] + " con dirección " + state.selectedRow['Network_Address'] + ", por usuario " + cookies.get('Windows_User'),
                            "user": Number(cookies.get('Id_System_User')),
                        }

                        await addGenericEvent(address, eventData)

                        setState({
                            ...state,
                            ['deletePhase']: '',
                            ['networks']: networks,
                            ['readyToDelete']: false,
                            ['selectedDelete']: false,
                            ['networkRelations']: null,
                            ['deleteSuccessfuly']: true,
                            ['deleteFailed']: false
                        })

                        setTimeout(() => {
                            setState({
                                ...state,
                                ['deletePhase']: '',
                                ['networks']: networks,
                                ['readyToDelete']: false,
                                ['selectedDelete']: false,
                                ['networkRelations']: null,
                                ['deleteSuccessfuly']: false,
                                ['deleteFailed']: false
                            })
                        }, 1000)
                    } else {
                        setState({
                            ...state,
                            ['deletePhase']: '',
                            ['readyToDelete']: false,
                            ['selectedDelete']: false,
                            ['networkRelations']: null,
                            ['deleteSuccessfuly']: false,
                            ['deleteFailed']: true
                        })

                        setTimeout(() => {
                            setState({
                                ...state,
                                ['deletePhase']: '',
                                ['readyToDelete']: false,
                                ['selectedDelete']: false,
                                ['networkRelations']: null,
                                ['deleteSuccessfuly']: false,
                                ['deleteFailed']: false
                            })
                        }, 1000)
                    }
                    break
            }
        }

        if(state.selectedRow !== null) {
            fn()
        }
    }, [state.deletePushed])

    //useEffect used to add networks
    useEffect(() => {
        const addNetworkFunctionEvent = async () => {
            const networkData = {
                "network_name": state.Network_Name,
                "ip_address": state.Network_Address,
                "subnet_mask": state.Subnet_Mask,
                "property": state.Property
            }
            
            const addNetworkResponse = await addNetwork(address, networkData);

            //Get networklist again
            const getNetworkList = async () => {
                let initialNetworks = await getNetworks(address)
                const dhcpServers = await getNetworksDHCPServers(address)
                const gateways = await getGateways(address)
                const networks = []

                initialNetworks = initialNetworks.reduce((acc, network) => {
                    const property = `${network.Property_Code} - ${network.Property_Name}`
    
                    delete network.Property_Code
                    delete network.Property_Name
    
                    network = {
                        ['Id_Network']: network.Id_Network,
                        ['Property']: property,
                        ...network
                    }
    
                    acc.push(network)
                    return acc
                }, [])

                if(initialNetworks.length > 0) {
                    initialNetworks.map(network => {
                        if(gateways.length > 0) {
                            network = gateways.reduce((acc, elem) => {
                                if(network.Id_Network === elem.Id_Network) {
                                    acc = {
                                        ...acc,
                                        ['Gateway']: elem.Gateway
                                    }
                                } else if(acc.Gateway) {
                                    if(acc.Gateway !== 'N/A') {
                                        
                                    } else {
                                        acc = {
                                            ...acc,
                                            ['Gateway']: 'N/A'
                                        }
                                    }
                                } else {
                                    acc = {
                                        ...acc,
                                        ['DHCP_Server']: 'N/A'
                                    }
                                }
        
                                return acc
                                
                            }, network)
                        } else {
                            network = {
                                ...network,
                                ['Gateway']: 'N/A'
                            }
                        }
                        
                        if(dhcpServers.length > 0) {
                            network = dhcpServers.reduce((acc, elem) => {
                                if(network.Id_Network === elem.Id_Network) {
                                    acc = {
                                        ...acc,
                                        ['DHCP_Server']: elem.DHCP_Server
                                    }
                                } else if(acc.DHCP_Server) {
                                    if(acc.DHCP_Server !== 'N/A') {
                                        
                                    } else {
                                        acc = {
                                            ...acc,
                                            ['DHCP_Server']: 'N/A'
                                        }
                                    }
                                } else {
                                    acc = {
                                        ...acc,
                                        ['DHCP_Server']: 'N/A'
                                    }
                                }
        
                                return acc
                            }, network)
                        } else {
                            network = {
                                ...network,
                                ['DHCP_Server']: 'N/A'
                            }
                        }

                        networks.push(network)
                    })
                }
                return networks
            }
            const networks = await getNetworkList(address)

            //Get Properties
            const getPropertiesList = async () => {
                const initialProperties = await getProperties(address)
                const properties = initialProperties.reduce((acc, elem) => {
                acc.push({
                    Id_Property: elem.Id_Property,
                    Property: `${elem.Property_Code} ${elem.Name}`
                })
                return acc
                }, [])
                return properties
            }
            const properties = await getPropertiesList()


            if(addNetworkResponse.ok) {
                setState({
                    ...state,
                    ['selectedNew']: false,
                    ['properties']: properties,
                    ['networks']: networks,
                    ['Property']: '',
                    ['Network_Name']: '',
                    ['Network_Address']: '',
                    ['Subnet_Mask']: '',
                    ['Property_Input_Changed']: false,
                    ['Network_Name_Input_Changed']: false,
                    ['Network_Address_Input_Changed']: false,
                    ['Subnet_Mask_Input_Changed']: false,
                    ['addedSuccessfuly']: true,
                })
    
                setTimeout(() => {
                    setState({
                        ...state,
                        ['selectedNew']: false,
                        ['properties']: properties,
                        ['networks']: networks,
                        ['Property']: '',
                        ['Network_Name']: '',
                        ['Network_Address']: '',
                        ['Subnet_Mask']: '',
                        ['Property_Input_Changed']: false,
                        ['Network_Name_Input_Changed']: false,
                        ['Network_Address_Input_Changed']: false,
                        ['Subnet_Mask_Input_Changed']: false,
                        ['addedSuccessfuly']: false,
                    }) 
                }, 1000)
            } else {
                setState({
                    ...state,
                    ['selectedNew']: false,
                    ['properties']: properties,
                    ['networks']: networks,
                    ['Property']: '',
                    ['Network_Name']: '',
                    ['Network_Address']: '',
                    ['Subnet_Mask']: '',
                    ['Property_Input_Changed']: false,
                    ['Network_Name_Input_Changed']: false,
                    ['Network_Address_Input_Changed']: false,
                    ['Subnet_Mask_Input_Changed']: false,
                    ['addFailed']: true,
                })
    
                setTimeout(() => {
                    setState({
                        ...state,
                        ['selectedNew']: false,
                        ['properties']: properties,
                        ['networks']: networks,
                        ['Property']: '',
                        ['Network_Name']: '',
                        ['Network_Address']: '',
                        ['Subnet_Mask']: '',
                        ['Property_Input_Changed']: false,
                        ['Network_Name_Input_Changed']: false,
                        ['Network_Address_Input_Changed']: false,
                        ['Subnet_Mask_Input_Changed']: false,
                        ['addFailed']: false
                    }) 
                }, 1000) 
            }
        }

        if(state.selectedNew) {
            addNetworkFunctionEvent()
        }

    }, [state.addButtonPushed])

    const updatePropertyFunctionEvent = () => {

    }

    const exitUpdatePropertyForm = () => {

    }
    
    const exitNewNetworkForm = () => {
        setState({
            ...state,
            ['Property_Input_Changed']: false,
            ['Network_Name_Input_Changed']: false,
            ['Network_Address_Input_Changed']: false,
            ['Subnet_Mask_Input_Changed']: false,
            ['Property']: '',
            ['Network_Name']: '',
            ['Network_Address']: '',
            ['Subnet_Mask']: '',
            ['selectedNew']: false
        })
    }

    return (
        <div>
            {state.addedSuccessfuly
                ? <NotificationMessange type='successful'>{language.network_added_successfuly}</NotificationMessange>
                : null
            }

            {state.addFailed
                ? <NotificationMessange type='failed'>{language.add_network_failed}</NotificationMessange>
                : null
            }

            {state.deleteSuccessfuly
                ? <NotificationMessange type='successful'>{language.network_deleted_successfuly}</NotificationMessange>
                : null
            }
            
            {state.deleteFailed
                ? <NotificationMessange type='failed'>{language.network_delete_failed}</NotificationMessange>
                : null
            }

            {state.selectedNew
                ? <InteractionBox>
                    <NewContent
                        title={language.new_network}
                        fieldsContent={[
                            {label: language.property, inputName: 'Property', inputType: 'select', inputValues: state.properties, restriction: true, typeRestrictions: ['empty']},
                            {label: language.network_name, inputName: 'Network_Name', inputType: 'text', restriction: true, typeRestrictions: ['empty']},
                            {label: language.network_address, inputName: 'Network_Address', inputType: 'text', restriction: true, typeRestrictions: ['empty', 'isIp'], ipObject: ip},
                            {label: language.subnet_mask, inputName: 'Subnet_Mask', inputType: 'text', restriction: true, typeRestrictions: ['empty', 'isMask'], ipObject: ip}
                        ]}
                        listData={state.networks}
                        value={state}
                        handleChange={handleChange}
                        setValue={setState}
                        exitFunction={exitNewNetworkForm}
                    />
                </InteractionBox>
                : null
            }

            {state.selectedDetails && state.selectedRow !== null
                ? <InteractionBox>
                    <DetailsContent
                        title={language.details}
                        labels={[
                            language.property,
                            language.network_name,
                            language.subnet_mask,
                            'CIDR',
                            language.network_address,
                            'Broadcast',
                            language.host_amount,
                            language.length,
                            language.gateway,
                            language.dhcp_server
                        ]}
                        data={state.selectedRow}
                        value={state}
                        setValue={setState}
                    />
                </InteractionBox>
                : null
            }

            {state.selectedEdit
                ? <InteractionBox>
                    <UpdateContent
                        title={language.update_network}
                        fieldsContent={[
                            {label: language.code, inputName: 'Property_Code', restriction: true, typeRestrictions: ['empty', 'onlyNumbers', 'unique']},
                            {label: language.name, inputName: 'Name', restriction: true, typeRestrictions: ['empty']}
                        ]}
                        selectedRow={state.selectedRow}
                        listData={state.networks}
                        handleChange={handleChange}
                        updateFunction={updatePropertyFunctionEvent}
                        exitFunction={exitUpdatePropertyForm}
                    />
                </InteractionBox>
                : null
            }

            {state.selectedDelete
                ? <InteractionBox>
                    <DeleteContent
                        title={language.delete_network}
                        value={state}
                        setValue={setState}
                        readyToDelete={state.readyToDelete}
                        notReadyTitle={`${language.you_cant_delete_network} ${state.selectedRow.Network_Name} (${state.selectedRow.Network_Address}/${state.selectedRow.CIDR})`}
                        readyTitle={`${language.are_you_sure_you_want_to_delete_network} "${state.selectedRow.Network_Name} (${state.selectedRow.Network_Address}/${state.selectedRow.CIDR})"?`}
                        relations={state.networkRelations}
                        selectedRow={state.selectedRow}
                    />
                </InteractionBox>
                : null
            }
            <Header />
            <ContentContiner>
                <NavigationMenu />
                <PageContent>
                    <div>
                        <SubHeaderContainer>
                            <PageIcon>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-topology-star-ring-3" width="80" height="80" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M10 19a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z" />
                                    <path d="M18 5a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z" />
                                    <path d="M10 5a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z" />
                                    <path d="M6 12a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z" />
                                    <path d="M18 19a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z" />
                                    <path d="M14 12a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z" />
                                    <path d="M22 12a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z" />
                                    <path d="M6 12h4" />
                                    <path d="M14 12h4" />
                                    <path d="M15 7l-2 3" />
                                    <path d="M9 7l2 3" />
                                    <path d="M11 14l-2 3" />
                                    <path d="M13 14l2 3" />
                                    <path d="M10 5h4" />
                                    <path d="M10 19h4" />
                                    <path d="M17 17l2 -3" />
                                    <path d="M19 10l-2 -3" />
                                    <path d="M7 7l-2 3" />
                                    <path d="M5 14l2 3" />
                                </svg>
                            </PageIcon>
                            <Title>{language.networks}</Title>
                        </SubHeaderContainer>
                    </div>
                    <div className='properties-search-box-content'>
                        {state.networks !== null
                            ? <InformationBar label1={state.networks.length} label2={language.networks}/>
                            : null
                        }
                        <div className='properties-search-box'>
                            <TertiaryButton onClick={ () => setState({ ...state, ['selectedNew']: true })}>{language.new}</TertiaryButton>
                            <div>
                                <SubLabel>{language.search}</SubLabel> 
                                <InputText name='search' type='text' value={state.search} onChange={handleChange}/>
                            </div>
                        </div>
                    </div>
                    {console.log(state.networks)}
                    {state.networks === null
                    ? <Loading />
                    : 
                    <Table
                            heads={['#.', language.property, language.network_name, language.subnet_mask, 'CIDR', language.network_address, 'Broadcast', language.host_amount, language.length, language.gateway, language.dhcp_server]}
                            data={state.networks}
                            tableName={'networks-table'}
                            value={state}
                            setValue={setState}
                    />
                    }
                </PageContent>
            </ContentContiner>
        </div>
    );
}

export default Networks;