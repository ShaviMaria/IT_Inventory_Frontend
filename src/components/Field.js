import Input from './Input';
import '../css/Field.css';

const Field = ({ children, ...rest }) => {
    return(
        <div>
            <label className='label'>{children}</label>
            <Input {...rest}/>
        </div>
    )
}

export default Field;