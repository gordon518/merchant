import * as acttype from './action-type'

let defaultState = {
  isFetching: false,  //if on remote operation
  list: [],   // merchant list
  userInfo: {}
}

// user message
export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case acttype.SET_FETCH:
      return {
        ...state, 
		isFetching: action.isFetching
      };
    case acttype.SAVE_USERINFO:
      return {
        ...state,
        userInfo: action.userInfo
      }
    case acttype.SAVE_ATTRINFO:
      return {...state, ...{[action.datatype]: action.value}};
    case acttype.MODIFY_USERINFO:
      return {...state, userInfo: {...state.userInfo, [action.key]: action.value}};
    case acttype.SET_LIST:
      return {...state, list: action.list};
      /*
      return {
        ...state, 
        list: state.list.map(
          (item, i) => i === action.index ? {...item, [action.key]: action.value}
          : item
        )
      }*/
    default:
      return state
  }
}