import axios from 'axios'
import { FETCH_USER, FETCH_SURVEYS } from './types'

export const fetchUser = () => {
    return function (dispatch) {
        axios.get('/api/v1/currentuser')
        .then(res => dispatch({ type: FETCH_USER, payload: res.data }))
        .catch(error => console.log(error))
    }
}

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/v1/stripe', token)

    dispatch({ type: FETCH_USER, payload: res.data })
}

export const submitSurvey = (values, history) => async dispatch => {
    const res = await axios.post('/api/v1/surveys', values)

    history.push('/surveys')

    dispatch({ type: FETCH_USER, payload: res.data })
}

export const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/v1/surveys')

    dispatch({ type: FETCH_SURVEYS, payload: res.data})
}