import React from 'react'

export default function BoardButton(props) {
  const { title, onClick, className } = props

  return (
    <div role="button" onClick={onClick} className={className}>
      {title}
    </div>
  )
}
