import * as actions from './actions'

function reducer(state, { type, payload }) {
    switch (type) {
        case actions.ON_LOAD_PAGE:
            const { data, maxRows } = payload
            return { ...state, data, maxRows }

        case actions.ON_CHANGE_PAGE:
            const { start } = payload
            return { ...state, start }

        case actions.ON_CHANGE_ROWS: {
            const { rows } = payload
            return { ...state, rows }
        }

        default:
            return state
    }
}

export default reducer
