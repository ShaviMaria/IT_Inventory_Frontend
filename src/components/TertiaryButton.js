import '../css/TertiaryButton.css'

const TertiaryButton = ({ children, ...rest }) => {
    return(
        <button className='tertiary-button' {...rest}>{children}</button>
    )
}

export default TertiaryButton