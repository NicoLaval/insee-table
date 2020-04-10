import * as actions from './actions'

function reducer(state, { type, payload }) {
    switch (type) {
        case actions.ON_LOAD_PAGE:
            const { data, maxRows } = payload
            return { ...state, data, maxRows }

        case actions.ON_CHANGE_PAGE:
            const { start } = payload
            return { ...state, start }

        default:
            return state
    }
}

export default reducer
