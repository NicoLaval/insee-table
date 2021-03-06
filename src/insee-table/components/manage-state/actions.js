export const ON_LOAD_PAGE = 'insee-table/on-load-page'
export const onLoadPage = (data, maxRows) => ({
    type: ON_LOAD_PAGE,
    payload: { data, maxRows },
})

export const ON_CHANGE_PAGE = 'insee-table/on-change-page'
export const onChangePage = (start) => ({
    type: ON_CHANGE_PAGE,
    payload: { start },
})

export const ON_CHANGE_ROWS = 'insee-table/on-change-rows'
export const onChangeRows = (rows) => ({
    type: ON_CHANGE_ROWS,
    payload: { rows },
})
