import React, { useState, useEffect } from "react"
import Checkbox from '@material-ui/core/Checkbox';

function CustomCell({ isActive }) {
    const [checked, setChecked] = useState(false)
    useEffect(function () {
        setChecked(isActive)
    }, [isActive])


    return <Checkbox checked={checked} onChange={function () { setChecked(!checked) }} />

}


export default React.memo(CustomCell, function (a, b) {
    return a.isActive === b.isActive && a._id === b._id
})