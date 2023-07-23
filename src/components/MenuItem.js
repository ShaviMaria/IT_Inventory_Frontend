import '../css/MenuItem.css';

const MenuItem = ({ children, onClick, main, open, level, levelOpen, selected }) => {
    let className = 'menu-item';

    const setClassName = () => {
        switch(main) {
            case true:
                className += ' menu-item-main';
                break;
        }
        switch(open) {
            case false:
                if(!main){
                    className += ' menu-item-invisible';
                }
            break;
        }
        switch(levelOpen) {
            case false:
                className += ' menu-item-invisible';
                break;
        }
        switch(level) {
            case 1:
                className += ' menu-item-level1';
                break;
            case 2:
                className += ' menu-item-level2';
                break;
            case 3:
                className += ' menu-item-level3';
                break;
        }
        switch(selected) {
            case true:
                switch(level) {
                    case 1:
                        className += ' menu-item-selected-level1'
                        break;
                    case 2:
                        className += ' menu-item-selected-level2'
                        break;
                    case 3:
                        className += ' menu-item-selected-level3'
                        break;
                }
                break;
        }
    }

    setClassName();

    /*const isVisible = main || open
                        ? 'menu-item'
                        : 'menu-item menu-item-invisible'*/

    return ( 
        <div className={className} onClick={onClick}>{children}</div>
    )
}

export default MenuItem;