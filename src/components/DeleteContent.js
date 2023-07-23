import Cookies from 'universal-cookie'
import SubTitle from './SubTitle'
import XButton from './XButton'
import Label from './Label'
import InputText from './InputText'
import Button from './Button'
import SecondaryButton from './SecondaryButton'
import Text from './Text'
import useLanguageContent from '../hooks/useLanguageContent'
import '../css/DeleteContent.css'

const DeleteContent = ({ title, value, setValue, readyToDelete, notReadyTitle, readyTitle, relations, selectedRow }) => {
    const cookies = new Cookies()
    const language = useLanguageContent(cookies.get('Language'))
    let relationsStr = ''
    if(relations !== null && relations !== undefined) {
        if(relations.length > 0) {
            relationsStr = relations.reduce((acc, elem) => {
                return acc += `, ${elem}`
            }, relationsStr)
            relationsStr = relationsStr.trimStart()
            relationsStr = relationsStr.slice(1)
        }
    }

    return(
        <div className='delete-content-container'>
            <div className='delete-title-button-content'>
                <SubTitle>{title}</SubTitle>
                <XButton onClick={ () => {
                    setValue({
                        ...value,
                        ['selectedDelete']: false
                    })
                }}/>
            </div>
            {readyToDelete
                ?
                    <div className='delete-content-message-container'>
                        <h2>{readyTitle}</h2>
                        <Text>{language.this_action_cannot_be_reversed}</Text>
                    </div>
                :
                    <div className='delete-content-message-container'>
                        <h2>{notReadyTitle}</h2>
                        <Text>{`${language.there_are_still_related_elements}: ${relationsStr}`}</Text>
                    </div>
            }
            {readyToDelete
                ?
                    <div className='delete-content-buttons-container'>
                        <Button onClick={() => {
                            setValue({
                                ...value,
                                ['deletePushed']: !value.deletePushed,
                                ['deletePhase']: 'last'
                            })
                        }}>{language.delete}</Button>
                        <SecondaryButton onClick={() => {
                            setValue({
                                ...value,
                                ['deletePhase']: '',
                                ['readyToDelete']: false,
                                ['selectedDelete']: false,
                                ['propertyRelations']: null,
                                ['deleteSuccessfuly']: false,
                                ['deleteFailed']: false
                            })
                        }}>{language.cancel}</SecondaryButton>
                    </div>
                :
                    <div className='delete-content-button-accept-container'>
                        <Button onClick={() => {
                            setValue({
                                ...value,
                                ['deletePhase']: '',
                                ['readyToDelete']: false,
                                ['selectedDelete']: false,
                                ['propertyRelations']: null,
                                ['deleteSuccessfuly']: false,
                                ['deleteFailed']: false
                            })
                        }}>{language.accept}</Button>
                    </div>
            }
        </div>
    )
}

export default DeleteContent