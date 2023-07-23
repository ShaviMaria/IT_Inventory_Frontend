import '../css/SecondaryButton.css'

const SecondaryButton = ({ children, ...rest }) => {
    return (
        <button className='component-secondary-button' {...rest}>{children}</button>
    )
}

export default SecondaryButton