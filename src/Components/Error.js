
import {useRouteError} from 'react-router-dom'
const Error = ()=>{
    const err = useRouteError();
    return (
        <>
            <h1>Opps!!</h1>
            <h2>Something went wrong</h2>
            <h3>{err.status}....{err.data}</h3>
        </>
    )
};
export default Error;