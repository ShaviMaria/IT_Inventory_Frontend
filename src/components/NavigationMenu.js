import { useState } from 'react'
import MenuItem from "./MenuItem"
import Cookies from 'universal-cookie'
import BurgerIcon from "./BurgerIcon"
import MenuItemContent from './MenuItemContent'
import useLanguageContent from '../hooks/useLanguageContent'
import { changeOpen } from '../redux/slices/menuSlice'
import { useDispatch } from 'react-redux'
import '../css/NavigationMenu.css'

const NavigationMenu = () => {
    let className = 'navigation-menu' 
    const cookies = new Cookies()
    const language = useLanguageContent(cookies.get('Language'))
    const dispatch = useDispatch()
    
    const openOrCloseMenu = () => {
        dispatch(changeOpen()) 
    }

    const [ state, setState ] = useState({
        open: false,
        groups: {
            home: {
                selected: false
            },
            properties: {
                selected: false
            },
            networks: {
                selected: false
            },
            departaments: {
                selected: false
            },
            users: {
                selected: false
            },
            trademarks: {
                selected: false
            },
            accounts: {
                open: false,
                selected: false,
                apple_selected: false,
                google_selected: false
            },
            phone_lines: {
                selected: false
            },
            extensions: {
                selected: false
            },
            hostnames: {
                selected: false
            },
            phones: {
                open: false,
                selected: false,
                mobiles: {
                    open: false,
                    selected: false,
                    mobiles_selected: false,
                    models_selected: false
                },
                landline: {
                    open: false,
                    selected: false,
                    landline_selected: false,
                    models_selected: false
                }
            },
            tablets: {
                open: false,
                selected: false,
                tablets_selected: false,
                models_selected: false
            },
            computers: {
                open: false,
                selected: false,
                computers_selected: false,
                models_selected: false
            },
            operating_systems: {
                selected: false,
            },
            monitors: {
                open: false,
                selected: false,
                monitors_selected: false,
                models_selected: false
            },
            printers: {
                open: false,
                selected: false,
                printers_selected: false,
                models_selected: false
            },
            switches: {
                open: false,
                selected: false,
                switches_selected: false,
                models_selected: false
            },
            routers: {
                open: false,
                selected: false,
                routers_selected: false,
                models_selected: false
            },
            ups: {
                open: false,
                selected: false,
                ups_selected: false,
                models_selected: false
            },
            servers: {
                open: false,
                selected: false,
                servers_selected: false
            },
            events: {
                selected: false
            }
        }
    });

    switch(state.open) {
        case true:
            className += ' navigation-menu-open'
            break
    }

    const changeGroupProperty = (group, element, value) => {
        setState({
            ...state,
            ['groups']: {
                ...state.groups,
                [group]: {
                    ...state.groups[group],
                    [element]: value
                }
            }
        });
    }

    //This function is used to change a group property, you need especify the group,
    //the property and the property value
    const changeGroupElementProperty = (group, groupProperty, groupPropertyValue) => {
        setState({
            ...state,
            ['groups']: {
                ...state.groups,
                [group]: {
                    ...state.groups[group],
                    [groupProperty]: groupPropertyValue
                }
            }
        })
    }

    //This function is used to change two group property, you need especify the group,
    //the property and the property value
    const changeTwoGroupElementProperty = (group, groupPropertyOne, groupPropertyValueOne, groupPropertyTwo, groupPropertyValueTwo) => {
        setState({
            ...state,
            ['groups']: {
                ...state.groups,
                [group]: {
                    ...state.groups[group],
                    [groupPropertyOne]: groupPropertyValueOne,
                    [groupPropertyTwo]: groupPropertyValueTwo
                }
            }
        })
    }
    
    /*This function is used to open or close a group in the menu, this function change
    all groups open properties to false and the group that you send as parameter change him
    open property to contrary current value*/
    const openOrCloseGroupLevel1 = group => {
        const tempStr = JSON.stringify(state);
        const tempObj = JSON.parse(tempStr);
        Object.keys(state.groups).forEach(x => {

            const xKeys = Object.keys(tempObj.groups[x]);
            if(x != group && xKeys.length > 1) {
                tempObj.groups[x].open = false;
                //changeGroupElementProperty(x, 'open', false);
            }

            //Make false all open properties of subgroups except subgroup in argument
            Object.keys(tempObj.groups[x]).forEach(y => {
                if(typeof(tempObj.groups[x][y]) === 'object') {
                    tempObj.groups[x][y].open = false;
                    //const yKeys = Object.keys(tempObj.groups[x][y]);
                    //yKeys.forEach(p => {
                        //if(p != 'selected') {
                            //tempObj.group[x][y][p] = false;
                        //}
                    //});
                    
                }
            });
        });
        
        tempObj.open = true;
        tempObj.groups[group].open = !tempObj.groups[group].open;
        setState(tempObj);
        //changeGroupElementProperty(group, 'open', !state.groups[group].open);
    }

    const openOrCloseGroupLevel2 = (group, subgroup) => {
        const tempStr = JSON.stringify(state);
        const tempObj = JSON.parse(tempStr);

        Object.keys(state.groups).forEach(x => {
            //Make false all open properties of groups except group in argument
            const xKeys = Object.keys(tempObj.groups[x]);
            if(x != group && xKeys.length > 1) {
                tempObj.groups[x].open = false;
            }

            //Make false all open properties of subgroups except subgroup in argument
            Object.keys(tempObj.groups[x]).forEach(y => {
                if(typeof(tempObj.groups[x][y]) === 'object' && y != subgroup) {
                    tempObj.groups[x][y].open = false;
                    //const yKeys = Object.keys(tempObj.groups[x][y]);
                    //yKeys.forEach(p => {
                        //if(p != 'selected') {
                            //tempObj.group[x][y][p] = false;
                        //}
                    //});
                    
                }
            });
        });

        tempObj.groups[group][subgroup].open = !tempObj.groups[group][subgroup].open;
        tempObj.groups[group].open = true;

        setState(tempObj);
    }

    const closeAllGroups = () => {
        const tempStr = JSON.stringify(state);
        const tempObj = JSON.parse(tempStr);
 
        Object.keys(tempObj.groups).map(group => {
            Object.keys(tempObj.groups[group]).map(element => {
                if(typeof(tempObj.groups[group][element]) === 'object') {
                    tempObj.groups[group][element].open = false;
                } else if (element === 'open') {
                    tempObj.groups[group][element] = false;
                } 
            })
        })
        console.log('CLOSE ALL GRUPS:')
        console.log(tempObj)
        setState(tempObj);
    }
    
    const selectGroup = (group, subgroup, element) => {
        const tempStr = JSON.stringify(state);
        const tempObj = JSON.parse(tempStr);

        Object.keys(tempObj.groups).forEach(x => {
            if(Object.keys(tempObj.groups[x]).length == 1) {
                tempObj.groups[x].selected = false;
            } else {
                Object.keys(tempObj.groups[x]).forEach(y => {
                    if(y != 'open' && typeof(tempObj.groups[x][y]) != 'object') {
                        tempObj.groups[x][y] = false;
                    } else if(y != 'open' && typeof(tempObj.groups[x][y]) == 'object') {
                        Object.keys(tempObj.groups[x][y]).forEach(z => {
                            if(z != 'open') {
                                tempObj.groups[x][y][z] = false;
                            }
                        });
                    }
                });
            }
        });

        if(subgroup == undefined && element == undefined) {
            tempObj.groups[group].selected = true;
        } else if(element == undefined) {
            tempObj.groups[group].selected = true;
            tempObj.groups[group][subgroup] = true;
        } else {
            tempObj.groups[group].selected = true;
            tempObj.groups[group][subgroup].selected = true;
            tempObj.groups[group][subgroup][element] = true;
        }
        console.log('SELECT GROUP')
        console.log(tempObj)
        setState(tempObj);
    }

    const openMenu = () => {
        dispatch(changeOpen())
        setState({
            ...state,
            ['open']: !state.open
        })
    }

    return (
        <div className={className}>
            {/*Burger element*/}
            <MenuItem
                onClick={openMenu}
                main={true}
                open={state.open}
                level={0}
            >
                <BurgerIcon open={state.open}/>
            </MenuItem>

            {/*Home*/}
            <MenuItem
                onClick={() => {
                    selectGroup('home', undefined, undefined);
                    window.location.href = './Home';
                }}
                main={false}
                open={state.open}
                level={1}
                selected={state.groups.home.selected}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-home" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <polyline points="5 12 3 12 12 3 21 12 19 12" />
                            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                            <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                        </svg>
                    }
                    text={language.home}
                    level={1}                
                    open={state.open}
                />
            </MenuItem>

            {/*Properties*/}
            <MenuItem
                onClick={() => {
                    selectGroup('properties', undefined, undefined);
                    window.location.href = './Properties';
                }}
                main={false}
                open={state.open}
                level={1}
                selected={state.groups.properties.selected}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-building-skyscraper" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <line x1="3" y1="21" x2="21" y2="21" />
                            <path d="M5 21v-14l8 -4v18" />
                            <path d="M19 21v-10l-6 -4" />
                            <line x1="9" y1="9" x2="9" y2="9.01" />
                            <line x1="9" y1="12" x2="9" y2="12.01" />
                            <line x1="9" y1="15" x2="9" y2="15.01" />
                            <line x1="9" y1="18" x2="9" y2="18.01" />
                        </svg>
                    }
                    text={language.properties}
                    level={1}
                    open={state.open}
                />
            </MenuItem>

            {/*Networks*/}
            <MenuItem
                onClick={() => {
                        selectGroup('networks', undefined, undefined)
                        window.location.href='/Networks'
                    }
                }
                main={false}
                open={state.open}
                level={1}
                selected={state.groups.networks.selected}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-topology-star-ring-3" width="52" height="52" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
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
                    }
                    text={language.networks}
                    level={1}
                    open={state.open}
                />
            </MenuItem>

            {/*Departaments*/}
            <MenuItem
                onClick={() => {
                        selectGroup('departaments', undefined, undefined)
                        window.location.href='./Departaments'
                    }
                }
                main={false}
                open={state.open}
                level={1}
                selected={state.groups.departaments.selected}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-sitemap" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <rect x="3" y="15" width="6" height="6" rx="2" />
                            <rect x="15" y="15" width="6" height="6" rx="2" />
                            <rect x="9" y="3" width="6" height="6" rx="2" />
                            <path d="M6 15v-1a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v1" />
                            <line x1="12" y1="9" x2="12" y2="12" />
                        </svg>
                    }
                    text={language.departaments}
                    level={1}
                    open={state.open}
                />
            </MenuItem>

            {/*Users*/}
            <MenuItem
                onClick={() => {
                        selectGroup('users', undefined, undefined)
                        window.location.href = '/Users'
                    }
                }
                main={false}
                open={state.open}
                level={1}
                selected={state.groups.users.selected}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-users" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <circle cx="9" cy="7" r="4" />
                            <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                        </svg>
                    }
                    text={language.users}
                    level={1}
                    open={state.open}
                />
            </MenuItem>
            
            {/*Trademarks*/}
            <MenuItem
                onClick={() => {
                        selectGroup('trademarks', undefined, undefined)
                        window.location.href = '/Trademarks'
                    }
                }
                main={false}
                open={state.open}
                level={1}
                selected={state.groups.trademarks.selected}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trademark" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M4.5 9h5m-2.5 0v6" />
                            <path d="M13 15v-6l3 4l3 -4v6" />
                        </svg>
                    }
                    text={language.trademarks}
                    level={1}
                    open={state.open}
                />
            </MenuItem>

            {/*Accounts*/}
            <MenuItem
                onClick={() => {openOrCloseGroupLevel1('accounts')}}
                main={false}
                open={state.open}
                level={1}
                selected={state.groups.accounts.selected}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-credit-card" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <rect x="3" y="5" width="18" height="14" rx="3" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                            <line x1="7" y1="15" x2="7.01" y2="15" />
                            <line x1="11" y1="15" x2="13" y2="15" />
                        </svg>
                    }
                    text={language.accounts}
                    level={1}
                    open={state.open}
                />
            </MenuItem>

            {/*Accounts > Apple*/}
            <MenuItem
                onClick={() => {
                        selectGroup('accounts', 'apple_selected', undefined)
                        window.location.href = '/Appleid'
                    }
                }
                main={false}
                open={state.open}
                level={2}
                levelOpen={state.groups.accounts.open}
                selected={state.groups.accounts.apple_selected}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-apple" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M9 7c-3 0 -4 3 -4 5.5c0 3 2 7.5 4 7.5c1.088 -.046 1.679 -.5 3 -.5c1.312 0 1.5 .5 3 .5s4 -3 4 -5c-.028 -.01 -2.472 -.403 -2.5 -3c-.019 -2.17 2.416 -2.954 2.5 -3c-1.023 -1.492 -2.951 -1.963 -3.5 -2c-1.433 -.111 -2.83 1 -3.5 1c-.68 0 -1.9 -1 -3 -1z" />
                            <path d="M12 4a2 2 0 0 0 2 -2a2 2 0 0 0 -2 2" />
                        </svg>
                    }
                    text={language.appleid}
                    level={2}
                />
            </MenuItem>

            {/*Accounts > Google*/}
            <MenuItem
                onClick={() => {
                        selectGroup('accounts', 'google_selected', undefined)
                        window.location.href = '/Google'
                    }
                }
                main={false}
                open={state.open}
                level={2}
                levelOpen={state.groups.accounts.open}
                selected={state.groups.accounts.google_selected}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-google" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8" />
                        </svg>
                    }
                    text={language.google}
                    level={2}
                />
            </MenuItem>
                    
            {/*Phone Lines*/}
            <MenuItem
                onClick={() => {
                        selectGroup('phone_lines', undefined, undefined);
                        //closeAllGroups();
                    }
                }
                main={false}
                open={state.open}
                level={1}
                selected={state.groups.phone_lines.selected}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-phone-call" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                            <path d="M15 7a2 2 0 0 1 2 2" />
                            <path d="M15 3a6 6 0 0 1 6 6" />
                        </svg>
                    }
                    text={language.phone_lines}
                    level={1}
                    open={state.open}
                />
            </MenuItem>
            
            {/*Extensions*/}
            <MenuItem
                onClick={() => {selectGroup('extensions', undefined, undefined)}}
                main={false}
                open={state.open}
                level={1}
                selected={state.groups.extensions.selected}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-list-details" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M13 5h8" />
                            <path d="M13 9h5" />
                            <path d="M13 15h8" />
                            <path d="M13 19h5" />
                            <rect x="3" y="4" width="6" height="6" rx="1" />
                            <rect x="3" y="14" width="6" height="6" rx="1" />
                        </svg>
                    }
                    text={language.extensions}
                    level={1}
                    open={state.open}
                />
            </MenuItem>

            {/*Hostnames*/}
            <MenuItem
                onClick={() => {selectGroup('hostnames', undefined, undefined)}}
                main={false}
                open={state.open}
                level={1}
                selected={state.groups.hostnames.selected}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-aspect-ratio" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <rect x="3" y="5" width="18" height="14" rx="2" />
                            <path d="M7 12v-3h3" />
                            <path d="M17 12v3h-3" />
                        </svg>
                    }
                    text={language.hostnames}
                    level={1}
                    open={state.open}
                />
            </MenuItem>
            
            {/*Phones*/}
            <MenuItem
                onClick={() => {openOrCloseGroupLevel1('phones')}}
                main={false}
                open={state.open}
                level={1}
                selected={state.groups.phones.selected}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-phone" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                        </svg>
                    }
                    text={language.phones}
                    level={1}
                    open={state.open}
                />
            </MenuItem>

            {/*Phones > Mobiles*/}
            <MenuItem
                onClick={() => {openOrCloseGroupLevel2('phones', 'mobiles')}}
                main={false}
                open={state.open}
                level={2}
                levelOpen={state.groups.phones.open}
                selected={state.groups.phones.mobiles.selected}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-device-mobile" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <rect x="7" y="4" width="10" height="16" rx="1" />
                            <line x1="11" y1="5" x2="13" y2="5" />
                            <line x1="12" y1="17" x2="12" y2="17.01" />
                        </svg>
                    }
                    text={language.mobiles}
                    level={2}
                />
            </MenuItem>
            
            {/*Phones > Mobiles > Mobiles*/}
            <MenuItem
                onClick={() => {selectGroup('phones', 'mobiles', 'mobiles_selected')}}
                main={false}
                open={state.open}
                level={3}
                levelOpen={state.groups.phones.mobiles.open}
                selected={state.groups.phones.mobiles.mobiles_selected}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-device-mobile" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <rect x="7" y="4" width="10" height="16" rx="1" />
                            <line x1="11" y1="5" x2="13" y2="5" />
                            <line x1="12" y1="17" x2="12" y2="17.01" />
                        </svg>
                    }
                    text={language.mobiles}
                    level={3}
                />
            </MenuItem>
            
            {/*Phones > Mobiles > Models*/}
            <MenuItem
                onClick={() => {selectGroup('phones', 'mobiles', 'models_selected')}}
                main={false}
                open={state.open}
                level={3}
                levelOpen={state.groups.phones.mobiles.open}
                selected={state.groups.phones.mobiles.models_selected}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-puzzle" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
                        </svg>
                    }
                    text={language.models}
                    level={3}
                />
            </MenuItem>
            
            {/*Phones > Landline*/}
            <MenuItem
                onClick={() => {openOrCloseGroupLevel2('phones', 'landline')}}
                main={false}
                open={state.open}
                level={2}
                levelOpen={state.groups.phones.open}
                selected={state.groups.phones.landline.selected}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-phone-call" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                            <path d="M15 7a2 2 0 0 1 2 2" />
                            <path d="M15 3a6 6 0 0 1 6 6" />
                        </svg>
                    }
                    text={language.fixed}
                    level={2}
                />
            </MenuItem>
            
            {/*Phones > Landline > Landline*/}
            <MenuItem
                onClick={() => {selectGroup('phones', 'landline', 'landline_selected')}}
                main={false}
                open={state.open}
                level={3}
                levelOpen={state.groups.phones.landline.open}
                selected={state.groups.phones.landline.landline_selected}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-phone-call" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                            <path d="M15 7a2 2 0 0 1 2 2" />
                            <path d="M15 3a6 6 0 0 1 6 6" />
                        </svg>
                    }
                    text={language.fixed}
                    level={3}
                />
            </MenuItem>
            
            {/*Phones > Landline > Models*/}
            <MenuItem
                onClick={() => {selectGroup('phones', 'landline', 'models_selected')}}
                main={false}
                open={state.open}
                level={3}
                levelOpen={state.groups.phones.landline.open}
                selected={state.groups.phones.landline.models_selected}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-puzzle" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
                        </svg>
                    }
                    text={language.models}
                    level={3}
                />
            </MenuItem>

            {/*Tablets*/}
            <MenuItem
                onClick={() => {openOrCloseGroupLevel1('tablets')}}
                main={false}
                open={state.open}
                level={1}
                selected={state.groups.tablets.selected}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-device-tablet" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <rect x="5" y="3" width="14" height="18" rx="1" />
                            <circle cx="12" cy="17" r="1" />
                        </svg>
                    }
                    text={language.tablets}
                    level={1}
                    open={state.open}
                />
            </MenuItem>
            
            {/*Tablets > Tablets*/}
            <MenuItem
                onClick={() => {selectGroup('tablets', 'tablets_selected', undefined)}}
                main={false}
                open={state.open}
                level={2}
                levelOpen={state.groups.tablets.open}
                selected={state.groups.tablets.tablets_selected}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-device-tablet" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <rect x="5" y="3" width="14" height="18" rx="1" />
                            <circle cx="12" cy="17" r="1" />
                        </svg>
                    }
                    text={language.tablets}
                    level={2}
                />
            </MenuItem>
            
            {/*Tablets > Models*/}
            <MenuItem
                onClick={() => {selectGroup('tablets', 'models_selected', undefined)}}
                main={false}
                open={state.open}
                level={2}
                levelOpen={state.groups.tablets.open}
                selected={state.groups.tablets.models_selected}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-puzzle" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
                        </svg>
                    }
                    text={language.models}
                    level={2}
                />
            </MenuItem>

            {/*Computers*/}
            <MenuItem
                onClick={() => {openOrCloseGroupLevel1('computers')}}
                main={false}
                open={state.open}
                level={1}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-devices-2" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M10 15h-6a1 1 0 0 1 -1 -1v-8a1 1 0 0 1 1 -1h6" />
                            <rect x="13" y="4" width="8" height="16" rx="1" />
                            <line x1="7" y1="19" x2="10" y2="19" />
                            <line x1="17" y1="8" x2="17" y2="8.01" />
                            <circle cx="17" cy="16" r="1" />
                            <line x1="9" y1="15" x2="9" y2="19" />
                        </svg>
                    }
                    text={language.computers}
                    level={1}
                    open={state.open}
                />
            </MenuItem>
            
            {/*Computers > Computers*/}
            <MenuItem
                main={false}
                open={state.open}
                level={2}
                levelOpen={state.groups.computers.open}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-devices-2" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M10 15h-6a1 1 0 0 1 -1 -1v-8a1 1 0 0 1 1 -1h6" />
                            <rect x="13" y="4" width="8" height="16" rx="1" />
                            <line x1="7" y1="19" x2="10" y2="19" />
                            <line x1="17" y1="8" x2="17" y2="8.01" />
                            <circle cx="17" cy="16" r="1" />
                            <line x1="9" y1="15" x2="9" y2="19" />
                        </svg>
                    }
                    text={language.computers}
                    level={2}
                />
            </MenuItem>
            
            {/*Computers > Models*/}
            <MenuItem
                main={false}
                open={state.open}
                level={2}
                levelOpen={state.groups.computers.open}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-puzzle" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
                        </svg>
                    }
                    text={language.models}
                    level={2}
                />
            </MenuItem>

            {/*Operating Systems*/}
            <MenuItem
                main={false}
                open={state.open}
                level={1}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-windows" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M17.8 20l-12 -1.5c-1 -.1 -1.8 -.9 -1.8 -1.9v-9.2c0 -1 .8 -1.8 1.8 -1.9l12 -1.5c1.2 -.1 2.2 .8 2.2 1.9v12.1c0 1.2 -1.1 2.1 -2.2 1.9z" />
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="4" y1="12" x2="20" y2="12" />
                        </svg>
                    }
                    text={language.operating_Systems}
                    level={1}
                    open={state.open}
                />
            </MenuItem>

            {/*Monitors*/}
            <MenuItem
                onClick={() => {openOrCloseGroupLevel1('monitors')}}
                main={false}
                open={state.open}
                level={1}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-device-desktop-analytics" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <rect x="3" y="4" width="18" height="12" rx="1" />
                            <path d="M7 20h10" />
                            <path d="M9 16v4" />
                            <path d="M15 16v4" />
                            <path d="M9 12v-4" />
                            <path d="M12 12v-1" />
                            <path d="M15 12v-2" />
                            <path d="M12 12v-1" />
                        </svg>
                    }
                    text={language.monitors}
                    level={1}
                    open={state.open}
                />
            </MenuItem>
            
            {/*Monitors > Monitors*/}
            <MenuItem
                main={false}
                open={state.open}
                level={2}
                levelOpen={state.groups.monitors.open}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-device-desktop-analytics" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <rect x="3" y="4" width="18" height="12" rx="1" />
                            <path d="M7 20h10" />
                            <path d="M9 16v4" />
                            <path d="M15 16v4" />
                            <path d="M9 12v-4" />
                            <path d="M12 12v-1" />
                            <path d="M15 12v-2" />
                            <path d="M12 12v-1" />
                        </svg>
                    }
                    text={language.monitors}
                    level={2}
                />
            </MenuItem>

            {/*Monitors > Models*/}
            <MenuItem
                main={false}
                open={state.open}
                level={2}
                levelOpen={state.groups.monitors.open}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-puzzle" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
                        </svg>
                    }
                    text={language.models}
                    level={2}
                />
            </MenuItem>
            
            {/*Printers*/}
            <MenuItem
                onClick={() => {openOrCloseGroupLevel1('printers')}}
                main={false}
                open={state.open}
                level={1}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-printer" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" />
                            <path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" />
                            <rect x="7" y="13" width="10" height="8" rx="2" />
                        </svg>
                    }
                    text={language.printers}
                    level={1}
                    open={state.open}
                />
            </MenuItem>
            
            {/*Printers > Printers*/}
            <MenuItem
                main={false}
                open={state.open}
                level={2}
                levelOpen={state.groups.printers.open}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-printer" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" />
                            <path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" />
                            <rect x="7" y="13" width="10" height="8" rx="2" />
                        </svg>
                    }
                    text={language.printers}
                    level={2}
                />
            </MenuItem>

            {/*Printers > Models*/}
            <MenuItem
                main={false}
                open={state.open}
                level={2}
                levelOpen={state.groups.printers.open}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-puzzle" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
                        </svg>
                    }
                    text={language.models}
                    level={2}
                />
            </MenuItem>
            
            {/*Switches*/}
            <MenuItem
                onClick={() => {openOrCloseGroupLevel1('switches')}}
                main={false}
                open={state.open}
                level={1}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-switch-3" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M3 17h2.397a5 5 0 0 0 4.096 -2.133l.177 -.253m3.66 -5.227l.177 -.254a5 5 0 0 1 4.096 -2.133h3.397" />
                            <path d="M18 4l3 3l-3 3" />
                            <path d="M3 7h2.397a5 5 0 0 1 4.096 2.133l4.014 5.734a5 5 0 0 0 4.096 2.133h3.397" />
                            <path d="M18 20l3 -3l-3 -3" />
                        </svg>
                    }
                    text={language.switches}
                    level={1}
                    open={state.open}
                />
            </MenuItem>

            {/*Switches > Switches*/}
            <MenuItem
                main={false}
                open={state.open}
                level={2}
                levelOpen={state.groups.switches.open}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-switch-3" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M3 17h2.397a5 5 0 0 0 4.096 -2.133l.177 -.253m3.66 -5.227l.177 -.254a5 5 0 0 1 4.096 -2.133h3.397" />
                            <path d="M18 4l3 3l-3 3" />
                            <path d="M3 7h2.397a5 5 0 0 1 4.096 2.133l4.014 5.734a5 5 0 0 0 4.096 2.133h3.397" />
                            <path d="M18 20l3 -3l-3 -3" />
                        </svg>
                    }
                    text={language.switches}
                    level={2}
                />
            </MenuItem>

            {/*Switches > Models*/}
            <MenuItem
                main={false}
                open={state.open}
                level={2}
                levelOpen={state.groups.switches.open}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-puzzle" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
                        </svg>
                    }
                    text={language.models}
                    level={2}
                />
            </MenuItem>

            {/*UPS*/}
            <MenuItem
                onClick={() => {openOrCloseGroupLevel1('ups')}}
                main={false}
                open={state.open}
                level={1}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-recharging" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M7.038 4.5a9 9 0 0 0 -2.495 2.47" />
                            <path d="M3.186 10.209a9 9 0 0 0 0 3.508" />
                            <path d="M4.5 16.962a9 9 0 0 0 2.47 2.495" />
                            <path d="M10.209 20.814a9 9 0 0 0 3.5 0" />
                            <path d="M16.962 19.5a9 9 0 0 0 2.495 -2.47" />
                            <path d="M20.814 13.791a9 9 0 0 0 0 -3.508" />
                            <path d="M19.5 7.038a9 9 0 0 0 -2.47 -2.495" />
                            <path d="M13.791 3.186a9 9 0 0 0 -3.508 -.02" />
                            <path d="M12 8l-2 4h4l-2 4" />
                            <path d="M12 21a9 9 0 0 0 0 -18" />
                        </svg>
                    }
                    text={language.UPS}
                    level={1}
                    open={state.open}
                />
            </MenuItem>

            {/*UPS > UPS*/}
            <MenuItem
                main={false}
                open={state.open}
                level={2}
                levelOpen={state.groups.ups.open}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-recharging" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M7.038 4.5a9 9 0 0 0 -2.495 2.47" />
                            <path d="M3.186 10.209a9 9 0 0 0 0 3.508" />
                            <path d="M4.5 16.962a9 9 0 0 0 2.47 2.495" />
                            <path d="M10.209 20.814a9 9 0 0 0 3.5 0" />
                            <path d="M16.962 19.5a9 9 0 0 0 2.495 -2.47" />
                            <path d="M20.814 13.791a9 9 0 0 0 0 -3.508" />
                            <path d="M19.5 7.038a9 9 0 0 0 -2.47 -2.495" />
                            <path d="M13.791 3.186a9 9 0 0 0 -3.508 -.02" />
                            <path d="M12 8l-2 4h4l-2 4" />
                            <path d="M12 21a9 9 0 0 0 0 -18" />
                        </svg>
                    }
                    text={language.UPS}
                    level={2}
                />
            </MenuItem>

            {/*UPS > Models*/}
            <MenuItem
                main={false}
                open={state.open}
                level={2}
                levelOpen={state.groups.ups.open}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-puzzle" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
                        </svg>
                    }
                    text={language.models}
                    level={2}
                />
            </MenuItem>
            
            {/*Servers*/}
            <MenuItem
                onClick={() => {openOrCloseGroupLevel1('servers')}}
                main={false}
                open={state.open}
                level={1}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-server" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <rect x="3" y="4" width="18" height="8" rx="3" />
                            <rect x="3" y="12" width="18" height="8" rx="3" />
                            <line x1="7" y1="8" x2="7" y2="8.01" />
                            <line x1="7" y1="16" x2="7" y2="16.01" />
                        </svg>
                    }
                    text={language.servers}
                    level={1}
                    open={state.open}
                />
            </MenuItem>

            {/*Servers > Servers*/}
            <MenuItem
                main={false}
                open={state.open}
                level={2}
                levelOpen={state.groups.servers.open}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-server" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <rect x="3" y="4" width="18" height="8" rx="3" />
                            <rect x="3" y="12" width="18" height="8" rx="3" />
                            <line x1="7" y1="8" x2="7" y2="8.01" />
                            <line x1="7" y1="16" x2="7" y2="16.01" />
                        </svg>
                    }
                    text={language.servers}
                    level={2}
                />
            </MenuItem>

            {/*Servers > Models*/}
            <MenuItem
                main={false}
                open={state.open}
                level={2}
                levelOpen={state.groups.servers.open}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-puzzle" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
                        </svg>
                    }
                    text={language.models}
                    level={2}
                />
            </MenuItem>

            {/*Events*/}
            <MenuItem
                main={false}
                open={state.open}
                level={1}
            >
                <MenuItemContent
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-speakerphone" width="48" height="48" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M18 8a3 3 0 0 1 0 6" />
                            <path d="M10 8v11a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1v-5" />
                            <path d="M12 8h0l4.524 -3.77a0.9 .9 0 0 1 1.476 .692v12.156a0.9 .9 0 0 1 -1.476 .692l-4.524 -3.77h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h8" />
                        </svg>
                    }
                    text={language.events}
                    level={1}
                    open={state.open}
                />
            </MenuItem>
        </div>
    )   
}

export default NavigationMenu;