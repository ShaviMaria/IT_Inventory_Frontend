import '../css/MenuItemContent.css';

const MenuItemContent = ({ icon, text, level, open }) => {
    let className = 'menu-item-content';

    const setClassName = () => {
        switch(level) {
            case 1:
                className += ' menu-item-content-level1'
                break;
            case 2:
                className += ' menu-item-content-level2'
                break;
            case 3:
                className += ' menu-item-content-level3'
                break;
        }

        switch(open) {
            case true:
                className += ' menu-item-content-open'
                break;
            case false:
                className += ' menu-item-content-closed'
                break;
        }
    }
    setClassName();

    return (
        <div className={className}>
            <div className='menu-item-content-icon-container'>
                {icon}
            </div>
            <h2 className='menu-item-content-text'>
                {text}
            </h2>
        </div>
    )
}

export default MenuItemContent;