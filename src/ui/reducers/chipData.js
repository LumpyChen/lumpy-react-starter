import undoable, { includeAction } from 'redux-undo'
import Immutable from 'immutable'

const initialState = Immutable.fromJS([
  { key: 0, label: 'immutablejs', intro: '1' },
  { key: 1, label: 'material-ui', intro: '2' },
  { key: 2, label: 'radium', intro: '3' },
  { key: 3, label: 'react', intro: '4' },
  { key: 4, label: 'react-dom', intro: '5' },
  { key: 5, label: 'react-router', intro: '6' },
  { key: 6, label: 'react-redux/redux', intro: '7' },
  { key: 7, label: 'react-router-redux', intro: '8' },
  { key: 8, label: 'redux-saga', intro: '9' },
  { key: 9, label: 'redux-undo', intro: '9' },
])

const chipData = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PACKAGE': {
      const newChip = Object.assign({ }, action.data, {
        key: state.get(state.size - 1).get('key') + 1,
      })
      return state.push(Immutable.fromJS(newChip))
    }
    case 'DEL_PACKAGE': {
      return state.filter((ele) => (
        ele.get('key') !== action.delkey
      ))
    }
    case 'CHIPDATA_RECEIVED': {
      return Immutable.fromJS(action.chipData)
    }
    default:
      return state
  }
}

export default undoable(chipData, {
  filter: includeAction(['ADD_PACKAGE', 'DEL_PACKAGE', 'CHIPDATA_RECEIVED']),
})
