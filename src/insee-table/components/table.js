import React, { useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import { Table, TableBody } from '@material-ui/core'
import { columnsProps } from './commons-props'
import Header from './table-header'
import Rows from './table-rows'
import Pager from './table-pager'
import { reducer, initialState, actions } from './manage-state'

function mergeOne(state, name, props) {
    if (props !== undefined) {
        return { ...state, [name]: props }
    }
    return state
}

function mergePropsWithInitialState({ start }) {
    return mergeOne(initialState, 'start', start)
}

/** */
function InseeTable(props) {
    const {
        fetch,
        columns,
        start: startFromProps,
        rows: rowsFromProps,
        rowsPerPageOptions,
    } = props
    const [state, dispatch] = useReducer(
        reducer,
        mergePropsWithInitialState(props)
    )
    const { start, rows, maxRows, data } = state

    useEffect(
        function () {
            if (startFromProps !== undefined) {
                dispatch(actions.onChangePage(startFromProps))
            }
        },
        [startFromProps]
    )

    useEffect(
        function () {
            if (rowsFromProps !== undefined) {
                dispatch(actions.onChangeRows(rowsFromProps))
            }
        },
        [rowsFromProps]
    )

    useEffect(
        function () {
            async function load() {
                if (typeof fetch === 'function') {
                    const res = await fetch({ start, rows })
                    if (Array.isArray(res.data)) {
                        dispatch(actions.onLoadPage(res.data, res.maxRows))
                    }
                }
            }
            load()
        },
        [fetch, start, rows]
    )

    if (!maxRows) {
        return null
    }

    return (
        <>
            <Table>
                <Header columns={columns} />
                <TableBody>
                    <Rows data={data} columns={columns} />
                </TableBody>
            </Table>
            <Pager
                rowsPerPageOptions={rowsPerPageOptions}
                start={start}
                rows={rows}
                maxRows={maxRows}
                onChangePage={function (_, newPage) {
                    dispatch(actions.onChangePage(newPage))
                }}
                onChangeRowsPerPage={function (e) {
                    dispatch(actions.onChangeRows(e.target.value))
                }}
            />
        </>
    )
}

InseeTable.propTypes = {
    start: PropTypes.number,
    fetch: PropTypes.func,
    columns: columnsProps,
    rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
}
InseeTable.defaultProps = { fetch: undefined, start: 0 }

export default InseeTable
