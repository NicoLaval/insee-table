import React from 'react'
import PropTypes from 'prop-types'
import { TablePagination } from '@material-ui/core'

function Pager({
    maxRows,
    rows,
    start,
    onChangePage,
    rowsPerPageOptions,
    onChangeRowsPerPage,
}) {
    return (
        <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={maxRows}
            rowsPerPage={rows}
            page={start}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
        />
    )
}

Pager.propTypes = {
    maxRows: PropTypes.number,
    rows: PropTypes.number.isRequired,
    start: PropTypes.number.isRequired,
    rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
    onChangePage: PropTypes.func.isRequired,
    onChangeRowsPerPage: PropTypes.func.isRequired,
}

Pager.defaultProps = { maxRows: undefined }

export default Pager
