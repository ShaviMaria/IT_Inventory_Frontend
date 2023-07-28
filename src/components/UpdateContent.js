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
import '../css/UpdateContent.css'

const UpdateContent = ({ title, fieldsContent, selectedRow, listData, handleChange, updateFunction, exitFunction }) => {
    const [ state, setState ] = useState({ buttonDisabled: true, currentElement: JSON.parse(JSON.stringify(selectedRow)), restrictsStatus: []})
    const cookies = new Cookies()
    const language = useLanguageContent(cookies.get('Language'))
    const selectedRowKeys =  Object.keys(selectedRow)
    const restrictsStatus = []
    selectedRowKeys.shift()

    const updateContentFormClass = fieldsContent.length > 4
        ? 'update-content-form-container update-content-form-container-big'
        : 'update-content-form-container'

    useEffect(() => {
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
    }, [selectedRow])

    return(
        <div className='update-content-container'>
            <div className='update-title-button-content'>
                <SubTitle>{title}</SubTitle>
                <XButton onClick={ () => {
                    exitFunction()
                }}/>
            </div>
            <div className={updateContentFormClass}>

                {fieldsContent.map((field, index) => {
                    const restrictMessages = []
                    if(field.restriction){
                        field.typeRestrictions.map(restriction => {
                            switch(restriction){
                                case 'empty':
                                    if(selectedRow[field.inputName] === '') {
                                        restrictsStatus.push(true)
                                        restrictMessages.push(<TextError key={`update-restrict-empty-input-${field.inputName}`}>{language.field_required}</TextError>)
                                    }
                                    break
                                case 'onlyNumbers':
                                    if(isNaN(Number(selectedRow[field.inputName]))){
                                        restrictsStatus.push(true)
                                        restrictMessages.push(<TextError key={`update-restrict-only-numbers-input-${field.inputName}`}>{language.only_numbers}</TextError>)
                                    }
                                    break
                                case 'unique':
                                    const unique = listData.reduce((acc, elem) => {
                                        if(acc) {
                                            return (
                                                elem[field.inputName] === selectedRow[field.inputName]
                                                &&
                                                elem[field.inputName] !== state.currentElement[field.inputName]
                                                ? false
                                                : true
                                            )
                                        } else {
                                            return false
                                        }
                                    }, true)
                                    if(!unique){
                                        restrictsStatus.push(true)
                                        restrictMessages.push(<TextError key={`update-restrict-unique-input-${field.inputName}`}>{`${field.label} ${language.already_exist}`}</TextError>)
                                    }
                                    break
                                case 'isIp':
                                    if(field.ipObject.isV4Format(selectedRow[field.inputName]) && selectedRow[field.inputName] !== '') {
                                        if(!field.ipObject.isPrivate(selectedRow[field.inputName])) {
                                            restrictsStatus.push(true)
                                            restrictMessages.push(<TextError key={`update-restrict-is-ip-input-${field.inputName}`}>{`${field.label} ${language.only_private_ip}`}</TextError>)
                                        }
                                    } else if(selectedRow[field.inputName] !== '') {
                                        restrictsStatus.push(true)
                                        restrictMessages.push(<TextError key={`update-restrict-is-ip-input-${field.inputName}`}>{`${field.label} ${language.invalid_ip_format}`}</TextError>)
                                    }
                                    break
                                case 'isMask':
                                    if(!field.ipObject.isMask(selectedRow[field.inputName]) && selectedRow[field.inputName] !== '') {
                                        restrictsStatus.push(true)
                                        restrictMessages.push(<TextError key={`update-restrict-is-mask-input-${field.inputName}`}>{`${field.label} ${language.not_valid}`}</TextError>)
                                    }
                                    break
                            }
                        })
                    }

                    let input = undefined
                    switch(field.inputType) {
                        case 'text':
                            input = <div>
                                        <InputText name={field.inputName} type={field.inputType} value={selectedRow[selectedRowKeys[index]]} onChange={handleChange} disabled={field.inputDisabled}/>
                                        {restrictMessages}
                                    </div>
                            break
                        case 'select':
                            input = <div>
                                        <select name={field.inputName} value={selectedRow[selectedRowKeys[index]]} onChange={handleChange} disabled={field.inputDisabled}>
                                            <option value=''>{language.select}</option>
                                            {field.inputValues.map(e => {
                                                const eKeys = Object.keys(e)
                                                return <option value={e[eKeys[0]]} key={`update-element-form-select-${e[eKeys[0]]}-${e[eKeys[1]]}`}>{e[eKeys[1]]}</option>
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
                        <div key={`update-content-input-${field.label}`}>
                            <Label>{field.label}</Label>
                            {input}
                        </div>
                    )

                    //return(
                        //<div key={`update-content-input-${field.label}`}>
                            //<Label>{field.label}</Label>
                            //<InputText name={field.inputName} type={field.inputType} value={selectedRow[selectedRowKeys[index]]} onChange={handleChange}/>
                            
                        //</div>
                    //)
                })}
            </div>
            <div className='update-content-buttons-container'>
                <Button onClick={ () => updateFunction() } disabled={state.buttonDisabled}>{language.update}</Button>
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

export default UpdateContent