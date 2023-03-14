import AppBanner from "../appBanner/AppBanner";
import SingleCharPage from "../singleCharPage/SingleCharPage";

const SingleItemPage=({param})=>{
    return (
        <>

            <AppBanner/>
            <SingleCharPage param={param}/>
        </>
    )
}

export default SingleItemPage;
