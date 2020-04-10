import React from 'react'
import ReactDOM from 'react-dom'
import Table from './insee-table'
import { fetchPage, CustomCell } from './utils'

ReactDOM.render(
    <React.StrictMode>
        <Table
            fetch={fetchPage}
            columns={[
                { key: 'name', label: 'Nom' },
                { key: 'gender', label: 'Genre' },
                { key: 'isActive', label: 'Etat', component: CustomCell },
            ]}
        />
    </React.StrictMode>,
    document.getElementById('root')
)
