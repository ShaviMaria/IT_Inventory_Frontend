import Cookies from 'universal-cookie'
import '../css/Table.css'

const Table = ({ heads, data, tableName, value, setValue }) => {
    const cookies = new Cookies()
    return (
        <div className='table-container'>
            <table className='table'>
                <thead>
                    <tr>
                        {heads.map(head => <th key={`${tableName}-${head}`}>{head}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map( (item, index) => {
                        const itemKeys = Object.keys(item)
                        itemKeys.shift()
                        return(
                            <tr key={`tr-${tableName}-${item[Object.keys(item)[0]]}`}>
                                <td onClick={() => setValue({ ...value, ['selectedRow']: item, ['selectedDetails']: true })} className='td-no-table first-td-table'>{index + 1}</td>
                                {itemKeys.map( (e, index) => {
                                    return <td key={`${tableName}-tr-${index + 1}-item-id-${item[Object.keys(item)[0]]}-td-${heads[index]}`} onClick={() => setValue({ ...value, ['selectedRow']: item, ['selectedDetails']: true })} className='td-info-table' >{item[e]}</td> 
                                })}
                                {cookies.get('User_Type') !== 'Viewer'
                                    ?
                                        <td className={index === 0 ? 'td-table-button-container td-table-button-container-first' : 'td-table-button-container'}>
                                            <div>
                                                <button className='trow-table-button trow-table-button-edit' onClick={ () => setValue({ ...value, ['selectedRow']: item, ['selectedEdit']: true})}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                        <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                                                        <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                                                        <path d="M16 5l3 3" />
                                                    </svg>
                                                </button>
                                                <button className='trow-table-button' onClick={ () => setValue({ ...value, ['selectedRow']: item, ['deletePushed']: !value.deletePushed, ['deletePhase']: 'first' })}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                        <path d="M4 7l16 0" />
                                                        <path d="M10 11l0 6" />
                                                        <path d="M14 11l0 6" />
                                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                                    </svg>
                                                </button> 
                                            </div>
                                        </td>
                                    : null
                                }
                                
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Table