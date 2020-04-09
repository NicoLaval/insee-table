import React, { useEffect, useReducer } from "react"
import PropTypes from "prop-types"
import { Table, TableBody, TableRow, TableCell, TablePagination } from '@material-ui/core';

/**
 * TODO plus complet
 * @param {*} value 
 */
function getContent(column, row) {
    const { component: CustomRendering, key } = column
    const type = typeof CustomRendering
    if (type === "function" || type === "object") {
        return <CustomRendering {...row} />
    }

    return getSimpleContent(row[key])
}

/**
 * TODO plus complet
 * @param {*} value 
 */
function getSimpleContent(value) {
    if (value === undefined) {
        return "undefined"
    }
    const type = typeof value;
    if (type === "boolean") {
        return value.toString()
    }
    return value
}

/** */
const Cells = React.memo(function Cells({ columns = [], row }) {
    return columns.map((column, i) => <TableCell key={i} >{getContent(column, row)}</TableCell>
    )
})

/** */
const Rows = React.memo(function Rows({ data = [], columns }) {
    return data.map(function (row, i) { return <TableRow key={i}><Cells columns={columns} row={row} /></TableRow> })
})


/* *** */

const initial = { start: 0, rows: 3, maxRows: undefined, data: [] }

const ON_LOAD_PAGE = "insee-table/on-load-page"
const onLoadPage = (data, maxRows) => ({ type: ON_LOAD_PAGE, payload: { data, maxRows } })

const ON_CHANGE_PAGE = "insee-table/on-change-page"
const onChangePage = (start) => ({ type: ON_CHANGE_PAGE, payload: { start } })

function reducer(state, { type, payload }) {
    switch (type) {
        case ON_LOAD_PAGE:
            const { data, maxRows } = payload
            return { ...state, data, maxRows }

        case ON_CHANGE_PAGE:
            const { start } = payload
            return { ...state, start }

        default: return state
    }
}

function InseeTable({ fetch, columns }) {
    const [state, dispatch] = useReducer(reducer, initial)
    const { start, rows, maxRows, data } = state;
    useEffect(function () {
        async function load() {
            if (typeof fetch === "function") {
                const res = await fetch({ start, rows })
                if (Array.isArray(res.data)) {
                    dispatch(onLoadPage(res.data, res.maxRows))
                }
            }
        }
        load();
    }, [fetch, start, rows])


    if (!maxRows) { return null }

    return (<><Table><TableBody><Rows data={data} columns={columns} /></TableBody></Table><TablePagination
        rowsPerPageOptions={[3, 4]}
        component="div"
        count={maxRows}
        rowsPerPage={rows}
        page={start}
        onChangePage={function (_, newPage) { dispatch(onChangePage(newPage)) }}
        onChangeRowsPerPage={function () { }}
    /></>)
}


InseeTable.propTypes = { fetch: PropTypes.func, columns: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string.isRequired, component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]) })).isRequired }
InseeTable.defaultProps = { fetch: undefined }

export default (InseeTable)