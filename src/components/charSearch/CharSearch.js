import {useState} from 'react';
import Spinner from "../spinner/Spinner";
import { Formik ,Form,Field,ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import useMarvelService from '../service/MarvelService';

import './CharSearch.scss';
import { Link } from 'react-router-dom';


const CharSearch=()=>{
    const [data,setData]= useState(null);
    const[loading,setLoading]= useState(false);
    const [updated,setUpdated] = useState(false);
    const [error, setError] = useState(false);
    const {getCharByName} = useMarvelService();

    const onCharExist= async(name)=>{
            setLoading(true);
            if(name!==''){
                const data=  await getCharByName(name); 
                setLoading(false);
                setError(false)
                setData(data);
                setUpdated(true)
            }else{
                setLoading(false);
                setError(true);
            }
        
    }

    const view= updated && !error && !loading ? 
        (data ? 
            <div className='search__error_grid'>
                <div className='search__title search__title_error'>
                    There is! Visit {data.name} page?
                    
                </div>
                <Link 
                    to={`/${data.name}`}
                    className="button button__secondary search__bar_button search__bar_button_secondary"
                 >
                    <div className="inner">To Page</div>
                </Link>
                
            </div>
            
             : <div className='search__title search__title_error'>The character was not found. Check the name and try again</div>)
        : null;  
    
    const spinner= loading && !error ? <Spinner/> : null;

    return(
        <div className="search">
            <div className="search__title">
                Or find a character by name:
            </div>
            <Formik
            initialValues={{
                name: ''
            }}
            validationSchema={Yup.object({
                name : Yup.string()
                        
            })}
            onSubmit={values => onCharExist(JSON.parse(JSON.stringify(values, null, 2)).name)}>

                <Form >
                    <Field
                        id="name"
                        name='name'
                        type="text"
                        placeholder='Enter name'
                        className="search__bar" />
                    <button type="submit" className="button button__main search__bar_button">
                        <div className="inner">Find</div>
                    </button>
                    <div className='search_spinner'>
                        {spinner}
                    </div>
                    
                    {view}
                    <FormikErrorMessage component='div' className="search__title search__title_error" name='name'/>
                
                </Form>
            </Formik>
            
        </div>
    )
}

export default CharSearch;