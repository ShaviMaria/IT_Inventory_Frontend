import '../css/InputText.css'

const InputText = ({ ...properties }) => {
    return (
        <input className='input-text' {...properties}/>
    )
}

export default InputText