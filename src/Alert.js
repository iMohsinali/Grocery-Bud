import React, { useEffect } from 'react'
import { useGlobalContext } from './Contex'
const Alert = ({ type, mesg }) => {
  const { remove, list } = useGlobalContext()

  useEffect(() => {

    const timeout = setTimeout(() => {
      remove()
    }, 3000)
    return () => clearTimeout(timeout)
  }, [list]
  )
  return <p className={` alert alert-${type}`}>{mesg} </p>
}

export default Alert
