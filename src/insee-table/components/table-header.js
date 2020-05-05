import React from 'react'
import { TableHead, TableRow, TableCell } from '@material-ui/core'
import { columnsProps } from './commons-props'

/** */
const Header = React.memo(function Header({ columns }) {
    return (
        <TableHead>
            <TableRow>
                {columns.map(function ({ label }, i) {
                    return <TableCell key={i}>{label}</TableCell>
                })}
            </TableRow>
        </TableHead>
    )
})

Header.propTypes = { columns: columnsProps.isRequired }

export default React.memo(Header)
