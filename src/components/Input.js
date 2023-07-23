import '../css/Input.css';

const Input = ({ img, secondInputClassName, ...rest }) => {
    return(
        <div className='input-container'>
            <div className='icon-input-container-container'>
                <div className={`icon-input-container ${secondInputClassName}`}>
                    <img alt='Icon' src={img}></img>
                </div>
            </div>

            <input { ...rest }/>
        </div> 
    )
}

export default Input;