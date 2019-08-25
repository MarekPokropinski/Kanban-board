import { createStore, applyMiddleware } from 'redux'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'
import reducer from './reducer'

const client = axios.create({
  baseURL: 'http://localhost:8000/',
  responseType: 'json',
})

export default function configureStore(initialState = {}) {
  return createStore(reducer, initialState, applyMiddleware(axiosMiddleware(client)))
}
