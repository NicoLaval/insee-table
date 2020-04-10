import PropTypes from 'prop-types'

export const columnsProps = PropTypes.arrayOf(
    PropTypes.shape({
        key: PropTypes.string.isRequired,
        component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    })
)
