import { useEffect, useState } from 'react'
import Header from '../components/Header'
import NavigationMenu from '../components/NavigationMenu'
import Cookies from 'universal-cookie'
import ContentContiner from '../components/ContentContainer'
import SubHeaderContainer from '../components/SubHeaderContainer'
import PageIcon from '../components/PageIcon'
import Title from '../components/Title'
import InformationBar from '../components/InformationBar'
import SubLabel from '../components/SubLabel'
import InputText from '../components/InputText'
import TertiaryButton from '../components/TertiaryButton'
import Loading from '../components/Loading'
import Table from '../components/Table'
import InteractionBox from '../components/InteractionBox'
import DetailsContent from '../components/DetailsContent'
import NotificationMessange from '../components/NotificationMessage'
import DeleteContent from '../components/DeleteContent'
import UpdateContent from '../components/UpdateContent'
import PageContent from '../components/PageContent'
import NewContent from '../components/NewContent'
import useLanguageContent from '../hooks/useLanguageContent'
import useObject from '../hooks/useObject'
import useDate from '../hooks/useDate'
import useProperty from '../api/useProperty'
import useServer from '../api/useServer'
import useEvent from '../api/useEvent'
import '../css/Properties.css'

const Properties = () => {
    const [ server, port ] = useServer()
    const address = `http://${server}:${port}/api`
    const [ state, setState ] = useState({
        search: '',
        properties: null,
        propertyRelations: null,
        selectedRow: null,
        selectedNew: false,
        selectedEdit: false,
        selectedDelete: false,
        selectedDetails: false,
        addButtonPushed: false,
        addedSuccessfuly: false,
        addFailed: false,
        updateSuccessfuly: false,
        updateFailed: false,
        updateDataDuplicated: false,
        propertyDuplicated: false,
        deleteSuccessfuly: false,
        deleteFailed: false,
        deletePushed: false,
        deletePhase: '',
        readyToDelete: false,
        code: '',
        name: '',
        Property_Code: '',
        Name: '',
        Property_Code_Input_Changed: false,
        Name_Input_Changed: false,
    })
    const getProperties = useProperty('getProperties')
    const getLastProperty = useProperty('getLastProperty')
    const getPropertyRelations = useProperty('getPropertyRelations')
    const addProperty = useProperty('addProperty')
    const deletePropertyById = useProperty('deletePropertyById')
    const updatePropertyById = useProperty('updatePropertyById')
    const checkAreSameObject = useObject('checkAreSameObject')
    const addPropertyEvent = useEvent('addPropertyEvent')
    const addGenericEvent = useEvent('addGenericEvent')
    const currentDate = useDate('currentFullDate') 
    const cookies = new Cookies()
    const language = useLanguageContent(cookies.get('Language'))

    useEffect(() => {
        if(!cookies.get('Windows_User')) {
            window.location.href = './';
        }
    
        if(cookies.get('User_Type') !== 'Administrator') {
            window.location.href = '/home';
        }

        const fn = async () => {
            const data = await getProperties(address)
            setState({
                ...state,
                ['properties']: data
            })
        }
        fn()
    }, []);

    useEffect(() => {
        const fn = async () => {
            if(state.search !== '') {
                const properties = await getProperties(address)
                const newTempListProperties = properties.map( property => {
                    let include = false;
                    const propertyKeys = Object.keys(property)

                    propertyKeys.forEach( key => {
                        if(!include) {
                            if(property[key].toString().toLowerCase().includes(state.search.toLowerCase())) {
                                include = true
                            }
                        }
                    })

                    if(include) {
                        return property
                    }
                })

                const newListProperties = newTempListProperties.reduce((acc, elem) => {
                    if(elem !== undefined) {
                        acc.push(elem)
                        return acc
                    } else {
                        return acc
                    }
                }, [])

                setState({
                    ...state,
                    ['properties']: newListProperties
                })
            } else {
                const properties = await getProperties(address)
                setState({
                    ...state,
                    ['properties']: properties
                })
            }
        }

        fn()

    }, [state.search])

    useEffect(() => {
        const fn = async () => {

            switch(state.deletePhase) {
                case 'first': 
                    const relations = await getPropertyRelations(address, state.selectedRow.Id_Property)
                    if(relations.length > 0) {
                        setState({
                            ...state,
                            ['readyToDelete']: false,
                            ['selectedDelete']: true,
                            ['propertyRelations']: relations
                        })
                    } else {
                        setState({
                            ...state,
                            ['readyToDelete']: true,
                            ['selectedDelete']: true,
                            ['propertyRelations']: relations
                        })
                    }
                    break
                case 'last':
                    const response = await deletePropertyById(address, { "id": state.selectedRow.Id_Property })
                    if(response.ok) {
                        const properties = await getProperties(address)

                        const eventData = {
                            "event": "Eliminación de Propiedad",
                            "event_date": currentDate,
                            "details": "Eliminación de Propiedad " + state.selectedRow['Property_Code'] + " " + state.selectedRow['Name'] + ", por usuario " + cookies.get('Windows_User'),
                            "user": Number(cookies.get('Id_System_User')),
                        }

                        await addGenericEvent(address, eventData)

                        setState({
                            ...state,
                            ['deletePhase']: '',
                            ['properties']: properties,
                            ['readyToDelete']: false,
                            ['selectedDelete']: false,
                            ['propertyRelations']: null,
                            ['deleteSuccessfuly']: true,
                            ['deleteFailed']: false
                        })

                        setTimeout(() => {
                            setState({
                                ...state,
                                ['deletePhase']: '',
                                ['properties']: properties,
                                ['readyToDelete']: false,
                                ['selectedDelete']: false,
                                ['propertyRelations']: null,
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
                            ['propertyRelations']: null,
                            ['deleteSuccessfuly']: false,
                            ['deleteFailed']: true
                        })

                        setTimeout(() => {
                            setState({
                                ...state,
                                ['deletePhase']: '',
                                ['readyToDelete']: false,
                                ['selectedDelete']: false,
                                ['propertyRelations']: null,
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

    useEffect(() => {
        const addPropertyFunctionEvent = async () => {
            let exist = false
    
            //Checks if the property code being tried to enter already exists in the property list
            const checkExiste = (propertyCode) => {
                const arr = state.properties.map(property => {
                    if(property.Property_Code === propertyCode) {
                        return true
                    }
                })
        
                if(arr.includes(true)) {
                    return true
                } else {
                    return false
                }
            }
            
            exist = checkExiste(state.Property_Code)
            
            //Delete spaces at start and end for the string
            let newName = state.Name.trimStart()
            newName = newName.trimEnd()
    
            //Transform the first letter in Uppercase
            newName = newName.charAt(0).toUpperCase() + newName.slice(1)
    
            const propertyData = {
                "code": state.Property_Code,
                "name": newName
            }
        
            if(!exist) {
                const response = await addProperty(address, propertyData)
                if(response.ok) {
                    const lastProperty = await getLastProperty(address)
    
                    //Add property event
                    const eventData = {
                        "id_property": Number(lastProperty[0].Id_Property),
                        "event": "Creación de propiedad " + state.Property_Code,
                        "event_date": currentDate,
                        "details": "Creación de propiedad " + state.Property_Code + " " + state.Name + " por usuario " + cookies.get('Windows_User'),
                        "user": Number(cookies.get('Id_System_User'))
                    }
                    await addPropertyEvent(address, eventData)
                    //*****************************************//
    
                    setState({
                        ...state,
                        ['addedSuccessfuly']: true,
                        ['selectedNew']: false,
                        ['properties']: null,
                    })
    
                    const newProperties = await getProperties(address)
    
                    setState({
                        ...state,
                        ['addedSuccessfuly']: true,
                        ['selectedNew']: false,
                        ['Name_Input_Changed']: false,
                        ['Property_Code_Input_Changed']: false,
                        ['properties']: newProperties,
                    })
    
                    setTimeout( () => {
                        setState({
                            ...state,
                            ['addedSuccessfuly']: false,
                            ['Property_Code']: '',
                            ['Name']: '',
                            ['selectedNew']: false,
                            ['Name_Input_Changed']: false,
                            ['Property_Code_Input_Changed']: false,
                            ['properties']: newProperties
                        })
                    }, 1000)
                } else {
    
                }
            } else {
                setState({
                    ...state,
                    ['propertyDuplicated']: true
                })
    
                setTimeout( () => {
                    setState({
                        ...state,
                        ['propertyDuplicated']: false
                    })
                }, 1000)
            }
        }

        if(state.selectedNew) {
            addPropertyFunctionEvent()
        }
    }, [state.addButtonPushed])

    const handleChange = e => {
        switch(e.target.name) {
            case 'Property_Code':
            case 'Name':
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

    const handleUpdateChange = e => {
        setState({
            ...state,
            ['selectedRow']: {
                ...state.selectedRow,
                [e.target.name]: e.target.value
            }
        })
    }

    const updatePropertyFunctionEvent = async () => {
        const updatePropertyData = {
            "id": state.selectedRow.Id_Property,
            "code": state.selectedRow.Property_Code,
            "name": state.selectedRow.Name
        }

        const response = await updatePropertyById(address, updatePropertyData)
        if(response.ok) {
            const newProperties = await getProperties(address)
            let indexCurrentProperty = undefined
            state.properties.map((property, index) => {
                if(property['Id_Property'] === state.selectedRow['Id_Property']) {
                    indexCurrentProperty = index
                }
            })
            if (checkAreSameObject(state.selectedRow, state.properties[indexCurrentProperty])) {

                //Add property event
                const eventData = {
                    "id_property": Number(state.selectedRow.Id_Property),
                    "event": "Actualización de propiedad " + state.selectedRow.Property_Code,
                    "event_date": currentDate,
                    "details": "Actualización de propiedad " + state.selectedRow.Property_Code + " " + state.selectedRow.Name + " por usuario " + cookies.get('Windows_User') + ", actualizó sin ralizar cambios",
                    "user": Number(cookies.get('Id_System_User'))
                }
                await addPropertyEvent(address, eventData)
                //*****************************************//


                setState({
                    ...state,
                    ['selectedEdit']: false,
                    ['updateDataDuplicated']: true,
                    ['properties']: newProperties
                })

                setTimeout(() => {
                    setState({
                        ...state,
                        ['selectedEdit']: false,
                        ['updateDataDuplicated']: false,
                        ['properties']: newProperties
                    })
                }, 2000)
            } else {

                let labelsChanged = ''
                state.properties.map(property => {
                    if(property['Id_Property'] === state.selectedRow['Id_Property']) {
                        if(property['Property_Code'] !== state.selectedRow['Property_Code']) {
                            labelsChanged += ` Actualizó Code (Valor anterior = ${property['Property_Code']}, Nuevo valor = ${state.selectedRow['Property_Code']})`
                        }

                        if(property['Name'] !== state.selectedRow['Name']) {
                            if(labelsChanged.length !== 0) {
                                labelsChanged += `, Actualizó Name (Valor anterior = ${property['Name']}, Nuevo valor = ${state.selectedRow['Name']})`
                            } else {
                                labelsChanged += ` Actualizó Name (Valor anterior = ${property['Name']}, Nuevo valor = ${state.selectedRow['Name']})`
                            }
                        }
                    }
                })

                //Add property event
                const eventData = {
                    "id_property": Number(state.selectedRow.Id_Property),
                    "event": "Actualización de propiedad " + state.selectedRow.Property_Code,
                    "event_date": currentDate,
                    "details": "Actualización de propiedad " + state.selectedRow.Property_Code + " " + state.selectedRow.Name + " por usuario " + cookies.get('Windows_User') + ", actualizó:" + labelsChanged,
                    "user": Number(cookies.get('Id_System_User'))
                }
                await addPropertyEvent(address, eventData)
                //*****************************************//

                setState({
                    ...state,
                    ['selectedEdit']: false,
                    ['updateSuccessfuly']: true,
                    ['properties']: newProperties
                })

                setTimeout(() => {
                    setState({
                        ...state,
                        ['selectedEdit']: false,
                        ['updateSuccessfuly']: false,
                        ['properties']: newProperties,
                    })
                }, 2000) 
            }
        } else {
            const newProperties = await getProperties(address)
            setState({
                ...state,
                ['selectedEdit']: false,
                ['updateFailed']: true,
                ['properties']: newProperties
            })

            setTimeout(() => {
                setState({
                    ...state,
                    ['selectedEdit']: false,
                    ['updateFailed']: false,
                    ['properties']: newProperties
                })
            }, 2000)
        }
    }
    
    const exitNewPropertyForm = () => {
        setState({
            ...state,
            ['Name']: '',
            ['Property_Code']: '',
            ['selectedNew']: false,
            ['Name_Input_Changed']: false,
            ['Property_Code_Input_Changed']: false,
        })
    }

    const exitUpdatePropertyForm = () => {
        setState({
            ...state,
            ['selectedEdit']: false
        })
    }

    return (
        <div>
            {state.addedSuccessfuly
                ? <NotificationMessange type='successful'>{language.property_added_successfuly}</NotificationMessange>
                : null
            }

            {state.addFailed
                ? <NotificationMessange type='failed'>{language.add_property_failed}</NotificationMessange>
                : null
            }

            {state.updateSuccessfuly
                ? <NotificationMessange type='successful'>{language.property_updated_successfuly}</NotificationMessange>
                : null
            }
            
            {state.updateDataDuplicated
                ? <NotificationMessange type='message'>{language.property_update_data_duplicated}</NotificationMessange>
                : null
            }

            {state.updateFailed
                ? <NotificationMessange type='failed'>{language.property_update_failed}</NotificationMessange>
                : null
            }

            {state.deleteSuccessfuly
                ? <NotificationMessange type='successful'>{language.property_deleted_successfuly}</NotificationMessange>
                : null
            }
            
            {state.deleteFailed
                ? <NotificationMessange type='failed'>{language.property_delete_failed}</NotificationMessange>
                : null
            }

            {state.propertyDuplicated
                ? <NotificationMessange type='failed'>{`${language.property} ${state.code} ${language.already_exist}`}</NotificationMessange>
                : null
            }
            {state.selectedNew
                ? <InteractionBox>
                    <NewContent
                        title={language.new_property}
                        fieldsContent={[
                            {label: language.code, inputName: 'Property_Code', inputType: 'text', restriction: true, typeRestrictions: ['empty', 'onlyNumbers', 'unique']},
                            {label: language.name, inputName: 'Name', inputType: 'text', restriction: true, typeRestrictions: ['empty']}
                        ]}
                        listData={state.properties}
                        value={state}
                        handleChange={handleChange}
                        setValue={setState}
                        exitFunction={exitNewPropertyForm}
                    />
                </InteractionBox>
                : null
            }

            {state.selectedDetails && state.selectedRow !== null
                ? <InteractionBox>
                    <DetailsContent
                        title={language.details}
                        labels={[language.code, language.name]}
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
                        title={language.update_property}
                        fieldsContent={[
                            {label: language.code, inputName: 'Property_Code', inputType: 'text', inputDisabled: false, restriction: true, typeRestrictions: ['empty', 'onlyNumbers', 'unique']},
                            {label: language.name, inputName: 'Name', inputType: 'text', inputDisabled: false, restriction: true, typeRestrictions: ['empty']}
                        ]}
                        selectedRow={state.selectedRow}
                        listData={state.properties}
                        handleChange={handleUpdateChange}
                        updateFunction={updatePropertyFunctionEvent}
                        exitFunction={exitUpdatePropertyForm}
                    />
                </InteractionBox>
                : null
            }

            {state.selectedDelete
                ? <InteractionBox>
                    <DeleteContent
                        title={language.delete_property}
                        value={state}
                        setValue={setState}
                        readyToDelete={state.readyToDelete}
                        notReadyTitle={`${language.you_cant_delete_property} "${state.selectedRow.Property_Code} ${state.selectedRow.Name}"`}
                        readyTitle={`${language.are_you_sure_you_want_to_delete_property} ${state.selectedRow.Property_Code} ${state.selectedRow.Name}?`}
                        relations={state.propertyRelations}
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
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-building-skyscraper" width="80" height="80" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M3 21l18 0" />
                                    <path d="M5 21v-14l8 -4v18" />
                                    <path d="M19 21v-10l-6 -4" />
                                    <path d="M9 9l0 .01" />
                                    <path d="M9 12l0 .01" />
                                    <path d="M9 15l0 .01" />
                                    <path d="M9 18l0 .01" />
                                </svg>
                            </PageIcon>
                            <Title>{language.properties}</Title>
                        </SubHeaderContainer>
                    </div>
                    <div className='properties-search-box-content'>
                        {state.properties !== null
                            ? <InformationBar label1={state.properties.length} label2={language.properties}/>
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
                    {state.properties === null
                        ? <Loading />
                        :
                        <Table
                            heads={['Nu.', language.code, language.name]}
                            data={state.properties}
                            tableName={'properties-table'}
                            value={state}
                            setValue={setState}
                        />
                    }
                </PageContent>
            </ContentContiner> 
        </div>
    );
}

export default Properties;