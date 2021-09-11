import React, { useEffect } from 'react'

const Alert = ({ type, mesg, removealert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removealert()
    }, 3000)
    return () => clearTimeout(timeout)
  }, [list]
  )
  return <p className={` alert alert-${type}`}>{mesg} </p>
}

export default Alert
