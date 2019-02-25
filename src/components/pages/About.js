import React from 'react'

export default (props) => {
  return (
    <div>
      <h1 className='display-4'>About Contact Manager</h1>
      <p className='lead'>Simple appm to manage contacts.</p>
      {/* <p className='text-primary'>params is ({props.match.params.id})</p> */}
      <p className="text-success">Version 1.0.3</p>
    </div>
  )
}
