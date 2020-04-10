import React, { useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import { Table, TableBody } from '@material-ui/core'
import { columnsProps } from './commons-props'
import Header from './table-header'
import Rows from './table-rows'
import Pager from './table-pager'
import { reducer, initialState, actions } from './manage-state'

/** */
function InseeTable({ fetch, columns }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { start, rows, maxRows, data } = state
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
                rowsPerPageOptions={[3, 4]}
                start={start}
                rows={rows}
                maxRows={maxRows}
                onChangePage={function (_, newPage) {
                    dispatch(actions.onChangePage(newPage))
                }}
                onChangeRowsPerPage={function () {}}
            />
        </>
    )
}

InseeTable.propTypes = {
    fetch: PropTypes.func,
    columns: columnsProps,
}
InseeTable.defaultProps = { fetch: undefined }

export default InseeTable
