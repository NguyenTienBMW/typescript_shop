import React from 'react'

export function HeaderItem({content} : {content: string}) {
  return (
        <h2 className='product-heading'>{content}</h2>
  )
}
