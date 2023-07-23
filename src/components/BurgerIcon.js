import '../css/BurgerIcon.css';

const BurgerIcon = ({ open }) => {
    const isOpen = open
                    ? 'burger-icon burger-icon-open'
                    : 'burger-icon burger-icon-closed';
    return (
        <div className={isOpen}>
            <span className='burger-icon-line'></span>
            <span className='burger-icon-line'></span>
            <span className='burger-icon-line'></span>
        </div>
    ) 
}

export default BurgerIcon;