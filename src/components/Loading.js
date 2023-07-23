import Cookies from 'universal-cookie'
import useLanguageContent from '../hooks/useLanguageContent'
import '../css/Loading.css'

const Loading = () => {
    const cookies = new Cookies()
    const language = useLanguageContent(cookies.get('Language'))
    return(
        <div className="loading">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mood-happy" width="56" height="56" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M9 9l.01 0" />
                <path d="M15 9l.01 0" />
                <path d="M8 13a4 4 0 1 0 8 0h-8" />
            </svg>
            <p>{language.loading}...</p>
        </div>
    )
}

export default Loading