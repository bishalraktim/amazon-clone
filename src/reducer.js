export const initialState = {
  basket: [],
  user: null,
  search: null, 
};

// Selector
export const getBaskeTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  //console.log("state in reducer", state);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (items) => items.id === action.item.id
      );
      const newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Unable to remove product (id: ${action.item.id} as it is not in the basket!)`
        );
      }

      return {
        ...state,
        basket: newBasket,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
 
    case "SEARCH_TEXT":
      return {
        ...state,
        search: action.textValue.toLowerCase(),
      };

    default:
      return state; // or {...state}
  }
};

export default reducer;
