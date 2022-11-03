import { legacy_createStore as createStore } from 'redux'
import { isLangRus } from '../actions/getLocal'


const defaultState = {
  // т.к валюты всего две, решил использовать тип bool
  isRUB: isLangRus()
}

const currReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'setCurrency':
      return {...state, isRUB: action.payload === 'RUB'}
    default:
      return state
  }
}
export const setCurrency = (payload) => ({type: 'setCurrency', payload})

export const store = createStore(currReducer)
