import React from 'react'
import { TableCell } from '@material-ui/core'
import PropTypes from 'prop-types'
import { columnsProps } from './commons-props'

/**
 * TODO plus complet
 * @param {*} value
 */
function getContent(column, row) {
    const { component: CustomRendering, key } = column
    const type = typeof CustomRendering
    if (type === 'function' || type === 'object') {
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
        return 'undefined'
    }
    const type = typeof value
    if (type === 'boolean') {
        return value.toString()
    }
    return value
}

/** */
function Cells({ columns = [], row }) {
    return columns.map((column, i) => (
        <TableCell key={i}>{getContent(column, row)}</TableCell>
    ))
}

Cells.propTypes = { columns: columnsProps.isRequired, rows: PropTypes.object }
Cells.defaultProps = { row: undefined }

export default React.memo(Cells)
