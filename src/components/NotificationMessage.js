import '../css/NotificationMessage.css'

const NotificationMessange = ({ type, children }) => {
    let className = 'notification-message'
    switch(type) {
        case 'successful':
            className += ' notification-message-successful'
            break
        case 'failed':
            className += ' notification-message-failed'
            break
        case 'message':
            className += ' notification-message-message'
            break
    }
    return(
        <div className={className}>
            <p>{children}</p>
        </div>
    ) 
}

export default NotificationMessange