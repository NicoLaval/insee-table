import React from 'react'
import { TableRow } from '@material-ui/core'
import PropTypes from 'prop-types'
import { columnsProps } from './commons-props'
import Cells from './table-cells'

/** */
const Rows = React.memo(function Rows({ data = [], columns }) {
    return data.map(function (row, i) {
        return (
            <TableRow key={i}>
                <Cells columns={columns} row={row} />
            </TableRow>
        )
    })
})

Rows.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    columns: columnsProps.isRequired,
}

export default React.memo(Rows)
