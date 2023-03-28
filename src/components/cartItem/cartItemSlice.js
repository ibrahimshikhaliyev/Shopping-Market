import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cartItems: [],
    cartItemsLoadingStatus: 'idle',
    selected:[],
    sideBar:false,
    activeSlide:null
}



const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        cartItemsFetching: state=>{state.cartItemsLoadingStatus='loading'},
        cartItemsFetched: (state, action) => {
            state.cartItemsLoadingStatus = 'idle';
            state.cartItems = action.payload;
        },
        cartItemsDelete:state=>{state.cartItemsLoadingStatus='idle'},
        cartItemsFetchingError : state=>{state.cartItemsLoadingStatus='error'},
        selectedFethced: (state,action)=>{state.selected=[...state.selected,action.payload]},
        selectedDelete: (state,action)=>{state.selected=[...state.selected.filter(element =>action.payload !== element.id)]},
        activeSideBar: (state,action)=>{state.sideBar=action.payload},
        heroDeleted: (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload);
        },
        selectedUpdate: (state,action)=>{
            const selectedItems=state.selected.map((element) => {
                if(action.payload.id === element.id){
                    element.counter=action.payload.counter;
                    return  element;
                }
                return element;
            });

            state.selected=[...selectedItems]
            
        },
        selectActiveSlide:(state,action)=>{ state.activeSlide=action.payload}
    }
});


const {actions,reducer}=cartSlice;

export default reducer;

export const {
    cartItemsFetching,
    cartItemsFetched,
    cartItemsDelete,
    cartItemsFetchingError,
    selectedFethced,
    selectedDelete,
    activeSideBar,
    heroDeleted,
    selectedUpdate,
    selectActiveSlide

}=actions;