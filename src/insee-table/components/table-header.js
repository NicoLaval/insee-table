import React from 'react'
import { TableHead } from '@material-ui/core'
import { columnsProps } from './commons-props'

/** */
const Header = React.memo(function Header({ columns }) {
    return <TableHead></TableHead>
})

Header.propTypes = { columns: columnsProps.isRequired }

export default React.memo(Header)
