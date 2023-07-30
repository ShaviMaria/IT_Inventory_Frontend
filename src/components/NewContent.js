import { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import SubTitle from './SubTitle'
import XButton from './XButton'
import Label from './Label'
import InputText from './InputText'
import Button from './Button'
import SecondaryButton from './SecondaryButton'
import TextError from './TextError'
import useLanguageContent from '../hooks/useLanguageContent'
import '../css/NewContent.css'

const NewContent = ({ title, fieldsContent, listData, value, handleChange, setValue, exitFunction }) => {
    const [ state, setState ] = useState({ buttonDisabled: true, restrictsStatus: [] })
    const cookies = new Cookies()
    const language = useLanguageContent(cookies.get('Language'))
    const restrictsStatus = []

    useEffect(() => {
        const inputsChangedList = []
        fieldsContent.map(field => {
            if(`${field.inputName}_Input_Changed` in value) {
                if(value[`${field.inputName}_Input_Changed`]) {
                    inputsChangedList.push(true)
                } else {
                    inputsChangedList.push(false)
                }
            }
        })

        const inputsChangedStatus = inputsChangedList.every(elem => elem === true)

        if(inputsChangedStatus) {
            if(state.restrictsStatus.length > 0) {
                if(state.restrictsStatus.every(element => element === true)) {
                    setState({
                        ...state,
                        ['buttonDisabled']: true
                    })
                } else {
                    setState({
                        ...state,
                        ['buttonDisabled']: false
                    })
                }
            } else {
                setState({
                    ...state,
                    ['buttonDisabled']: false
                })
            }
        } else {
            setState({
                ...state,
                ['buttonDisabled']: true
            })
        }
    }, [value])

    return(
        <div className='new-content-container'>
            <div className='new-title-button-content'>
                <SubTitle>{title}</SubTitle>
                <XButton onClick={ () => {
                    exitFunction()
                }}/>
            </div>
            <div className='new-content-form-container'>
                {fieldsContent.map(field => {

                    const restrictMessages = []
                    if(field.restriction) {
                        field.typeRestrictions.map(restriction => {
                            switch(restriction){
                                case 'empty':
                                    if(value[field.inputName] === '' && value[`${field.inputName}_Input_Changed`]) {
                                        restrictsStatus.push(true)
                                        restrictMessages.push(<TextError key={`add-restrict-empty-input-${field.inputName}`}>{language.field_required}</TextError>)
                                    }
                                    break
                                case 'onlyNumbers':
                                    if(isNaN(Number(value[field.inputName]))){
                                        restrictsStatus.push(true)
                                        restrictMessages.push(<TextError key={`add-restrict-only-numbers-input-${field.inputName}`}>{language.only_numbers}</TextError>)
                                    }
                                    break
                                case 'unique':
                                    const unique = listData.reduce((acc, elem) => {
                                        if(acc) {
                                            return (
                                                elem[field.inputName] === value[field.inputName]
                                                ? false
                                                : true
                                            )
                                        } else {
                                            return false
                                        }
                                    }, true)
                                    if(!unique) {
                                        restrictsStatus.push(true)
                                        restrictMessages.push(<TextError key={`add-restrict-unique-input-${field.inputName}`}>{`${field.label} ${language.already_exist}`}</TextError>)
                                    }
                                    break
                                case 'isIp':
                                    if(field.ipObject.isV4Format(value[field.inputName]) && value[field.inputName] !== '') {
                                        if(!field.ipObject.isPrivate(value[field.inputName])) {
                                            restrictsStatus.push(true)
                                            restrictMessages.push(<TextError key={`add-restrict-is-ip-input-${field.inputName}`}>{`${field.label} ${language.only_private_ip}`}</TextError>)
                                        }
                                    } else if(value[field.inputName] !== '') {
                                        restrictsStatus.push(true)
                                        restrictMessages.push(<TextError key={`add-restrict-is-ip-input-${field.inputName}`}>{`${field.label} ${language.invalid_ip_format}`}</TextError>)
                                    }
                                    break
                                case 'isMask':
                                    if(!field.ipObject.isMask(value[field.inputName]) && value[field.inputName] !== '') {
                                        restrictsStatus.push(true)
                                        restrictMessages.push(<TextError key={`add-restrict-is-mask-input-${field.inputName}`}>{`${field.label} ${language.not_valid}`}</TextError>)
                                    }
                                    break
                            }
                        })
                    }

                    let input = undefined
                    switch(field.inputType) {
                        case 'text':
                            input = <div>
                                        <InputText name={field.inputName} type={field.inputType} value={value[field.inputName]} onChange={handleChange}/>
                                        {restrictMessages}
                                    </div>
                            break
                        case 'select':
                            input = <div>
                                        <select name={field.inputName} value={value.select_property} onChange={handleChange}>
                                            <option value=''>{language.select}</option>
                                            {field.inputValues.map(e => {
                                                const eKeys = Object.keys(e)
                                                return <option value={e[eKeys[0]]} key={`new-element-form-select-${e[eKeys[0]]}-${e[eKeys[1]]}`}>{e[eKeys[1]]}</option>
                                            })}
                                        </select>
                                        {restrictMessages}
                                    </div>
                            break
                        default:
                            input = <TextError>{language.input_error}</TextError>
                            break
                    }
                    return(
                        <div key={`new-content-input-${field.label}`}>
                            <Label>{field.label}</Label>
                            {input}
                        </div>
                    )
                })}
            </div>
            <div className='new-content-buttons-container'>
                <Button
                    onClick={ () => {
                        setValue({...value, ['addButtonPushed']: !value.addButtonPushed})
                    }}
                    disabled={state.buttonDisabled}
                >
                    {language.add}
                </Button>
                <SecondaryButton onClick={ () => exitFunction()}>{language.cancel}</SecondaryButton>
            </div>

            {restrictsStatus.length === state.restrictsStatus.length
                ? (
                    restrictsStatus.every((value, index) => value === state.restrictsStatus[index])
                        ? null
                        : setState({
                            ...state,
                            ['restrictsStatus']: restrictsStatus
                        })
                )
                : setState({
                    ...state,
                    ['restrictsStatus']: restrictsStatus
                })
            }
        </div>
    )
}

export default NewContent