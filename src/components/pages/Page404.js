import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";


const Page404=()=>{
    return(
        <>
            <ErrorMessage/>
            <p style={{'margin-top': '40px','font-weight':'bold' , 'font-size' : '28px' , 'line-height': '37px'}}>This page doesn't exist. 
                <Link to='/'> <span style={{'text-decoration':'underline'}}>Back to the main page</span> </Link>
            </p>
        </>
    )
}


export default Page404;