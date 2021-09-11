import React, { useEffect } from 'react'
import { useGlobalContext } from './Contex'
const Alert = ({ type, mesg }) => {
  const { list, showa } = useGlobalContext()

  useEffect(() => {

    const timeout = setTimeout(() => {
      showa()
    }, 3000)
    return () => clearTimeout(timeout)
  }, [list]
  )
  return <p className={` alert alert-${type}`}>{mesg} </p>
}

export default Alert
