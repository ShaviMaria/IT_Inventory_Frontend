import VerticalBar from './VerticalBar'
import '../css/InformationBar.css'

const InformationBar = ({ label1, label2 }) => {
    return(
        <div className='information-bar'>
            <VerticalBar />
            <div className='information-bar-labels-container'>
                <h2>{label1}</h2>
                <h2>{label2}</h2>
            </div>
        </div>
    )
}

export default InformationBar