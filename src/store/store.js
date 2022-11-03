import { legacy_createStore as createStore } from 'redux'
import { isLangRus } from '../actions/getLocal'


const defaultState = {
  isRUB: isLangRus()
}

const currReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'RUB':
      return {...state, isRUB: true}
    case 'USD':
      return {...state, isRUB: false}
    default:
      return state
  }
}
export const setCurrRUB = () => ({type: 'RUB'})
export const setCurrUSD = () => ({type: 'USD'})

export const store = createStore(currReducer)