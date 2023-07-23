import '../css/Button.css';

const Button = ({ children, secondButtonClassName, ...rest }) => {
    return <button className={`component-button ${secondButtonClassName}`} { ...rest }>{children}</button>
}

export default Button;