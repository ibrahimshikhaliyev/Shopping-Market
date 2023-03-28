import { useHttp } from "../../hooks/useHttp";


const useRequestService=()=> {

    const {loading,error,request} = useHttp();

    const getAllProducts = async () => {
        
      const allChars = await request(
        "https://6404b4ae80d9c5c7bace8a34.mockapi.io/products/sneakers"
      );
      return allChars.map(char=>{
        return _transformState(char);
      });
    };
  

    const getProduct = async (id) => {
        
      const chars = await request(
        `https://6404b4ae80d9c5c7bace8a34.mockapi.io/products/sneakers/${id}`
      );
      // console.log(chars);
      return  _transformState(chars);
    };


    const _transformState = (char) => {
      return {
        category_id:char.category_id,
        id:char.id,
        name:char.category_name,
        title:char.title,
        price:char.price,
        description:char.description,
        images:char.images

      };
    };


    return { loading,error,getAllProducts,getProduct} ;
}
  
  export default useRequestService;
  