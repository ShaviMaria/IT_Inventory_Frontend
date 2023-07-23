import Cookies from 'universal-cookie'
import SubTitle from './SubTitle'
import Label from './Label'
import Text from './Text'
import Button from './Button'
import XButton from './XButton'
import useLanguageContent from '../hooks/useLanguageContent'
import '../css/DetailsContent.css'

const DetailsContent = ({ title, labels, data, value, setValue }) => {
    const cookies = new Cookies()
    const language = useLanguageContent(cookies.get('Language'))
    const dataKeys = Object.keys(data)
    let informationContentClass = 'details-content-information-container'
    dataKeys.shift()

    if(labels.length > 4) {
        informationContentClass += ' details-content-information-container-grid'
    }

    return(
        <div className='details-content'>
            <div className='details-title-button-content'>
                <SubTitle>{title}</SubTitle>
                <XButton onClick={ () => {
                    setValue({ ...value, ['selectedDetails']: false })}}
                />
            </div> 
            <div className={informationContentClass}>
                {labels.map((label, index) => {
                    return(
                        <div key={`detail-label-container-${data[0]}-${label}`}>
                            <Label>{label}</Label>
                            <Text>{data[dataKeys[index]]}</Text>
                        </div>
                    )
                })}
            </div>
            <Button onClick={() => {
                    setValue({ ...value, ['selectedDetails']: false })}}
            >
                {language.accept}
            </Button>
        </div>
    )
}

export default DetailsContent