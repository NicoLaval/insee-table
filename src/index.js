import React from 'react'
import ReactDOM from 'react-dom'
import Table from './insee-table'
import { fetchPage, CustomCell } from './utils'

ReactDOM.render(
    <React.StrictMode>
        <Table
            start={1}
            fetch={fetchPage}
            rows={4}
            rowsPerPageOptions={[2, 3, 4, 5]}
            columns={[
                { key: 'name', label: 'Nom' },
                { key: 'gender', label: 'Genre' },
                { key: 'isActive', label: 'Etat', component: CustomCell },
            ]}
        />
    </React.StrictMode>,
    document.getElementById('root')
)
