import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
}

const menuSlice = createSlice({
    name: 'menu',
    initialState: initialState,
    reducers: {
        changeOpen: state => {
            return {
                ...state,
                ['open']: !state.open
            }
        }
    }
})

export const { changeOpen } = menuSlice.actions
export default menuSlice.reducer