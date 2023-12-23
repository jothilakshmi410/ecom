import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING } from '../actions/action-types/cart-actions'


const initState = {
    items: [
        {
            "id": 1,
            "title": "Smartphone Alpha",
            "desc": "High-end smartphone with advanced features",
            "price": 999,
            "img": "https://picsum.photos/200/300?random=1"
        },
        {
            "id": 2,
            "title": "Bluetooth Headphones",
            "desc": "Wireless headphones with noise cancellation",
            "price": 199,
            "img": "https://picsum.photos/200/300?random=2"
        },
        {
            "id": 3,
            "title": "Smart Watch Pro",
            "desc": "Advanced smartwatch with health tracking",
            "price": 299,
            "img": "https://picsum.photos/200/300?random=3"
        },
        {
            "id": 4,
            "title": "E-Book Reader",
            "desc": "Lightweight e-book reader with paper-like display",
            "price": 129,
            "img": "https://picsum.photos/200/300?random=4"
        },
        {
            "id": 5,
            "title": "Portable Speaker",
            "desc": "Compact and powerful portable speaker",
            "price": 89,
            "img": "https://picsum.photos/200/300?random=5"
        },
        {
            "id": 6,
            "title": "Wireless Charger",
            "desc": "Fast and convenient wireless charger",
            "price": 59,
            "img": "https://picsum.photos/200/300?random=6"
        },
        {
            "id": 7,
            "title": "Fitness Tracker",
            "desc": "Durable fitness tracker for all sports",
            "price": 79,
            "img": "https://picsum.photos/200/300?random=7"
        },
        {
            "id": 8,
            "title": "Tablet Elite",
            "desc": "Powerful tablet with high-resolution screen",
            "price": 499,
            "img": "https://picsum.photos/200/300?random=8"
        },
        {
            "id": 9,
            "title": "Virtual Reality Headset",
            "desc": "Immersive VR headset for gaming and media",
            "price": 349,
            "img": "https://picsum.photos/200/300?random=9"
        },
        {
            "id": 10,
            "title": "Gaming Console",
            "desc": "Next-gen gaming console with 4K support",
            "price": 499,
            "img": "https://picsum.photos/200/300?random=10"
        }
    ]
    
    ,
    addedItems:[],
    total: 0

}
const cartReducer= (state = initState,action)=>{
   
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
          let addedItem = state.items.find(item=> item.id === action.id)
          //check if the action id exists in the addedItems
         let existed_item= state.addedItems.find(item=> action.id === item.id)
         if(existed_item)
         {
            addedItem.quantity += 1 
             return{
                ...state,
                 total: state.total + addedItem.price 
                  }
        }
         else{
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price 
            
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
            
        }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        console.log(itemToRemove)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
          addedItem.quantity += 1 
          let newTotal = state.total + addedItem.price
          return{
              ...state,
              total: newTotal
          }
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.items.find(item=> item.id === action.id) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                total: newTotal
            }
        }
        
    }

    if(action.type=== ADD_SHIPPING){
          return{
              ...state,
              total: state.total + 6
          }
    }

    if(action.type=== 'SUB_SHIPPING'){
        return{
            ...state,
            total: state.total - 6
        }
  }
    
  else{
    return state
    }
    
}

export default cartReducer
