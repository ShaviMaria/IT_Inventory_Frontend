import { useSelector } from 'react-redux'
import '../css/PageContent.css'

const PageContent = ({children}) => {
    const menuState = useSelector(state => state.menu)
    let className = 'page-content'

    switch(menuState.open) {
        case true:
            className += ' page-content-menu-open'
    }
    return(
        <div className={className}>{children}</div>
    )
}

export default PageContent