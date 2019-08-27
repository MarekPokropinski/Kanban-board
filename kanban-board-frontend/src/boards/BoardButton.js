import React from 'react'

export default props => {
  const { title, ...divprops } = props

  return <div {...divprops}>{title}</div>
}
