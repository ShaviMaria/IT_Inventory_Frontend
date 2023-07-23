const style = {
    fontSize: '12px'
}

const CheckboxText = ({ children }) => {
    return (
        <p className="CheckboxText" style={style}>{children}</p>
    )
}

export default CheckboxText