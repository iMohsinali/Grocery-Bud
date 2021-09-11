import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'
import { type } from 'os'

import useWebAnimations, { rubberBand } from "@wellyshen/use-web-animations";
const getlocal = () => {
  let list = localStorage.getItem('list')
  if (list) {
    return JSON.parse(localStorage.getItem('list'))
  }
  else {
    return []
  }
}
function App() {
  const { ref, playState, getAnimation } = useWebAnimations({ ...rubberBand });
  const [name, setname] = useState('')
  const [list, setlist] = useState(getlocal)
  const [isEditing, setEditing] = useState(false)
  const [editId, seteditId] = useState(null)
  const [alert, setaltert] = useState({
    show: false, mesg: '', type: ''
  })

  const handle = (e) => {
    e.preventDefault();
    console.log('helo')
    if (!name) {
      showa(true, 'danger', 'please enter the vakue')
    }
    else if (name && isEditing) {
      setlist(list.map((item) => {
        if (item.id == editId) {
          return { ...item, title: name }
        }
        return item

      }))
      setname('')
      seteditId(null)
      setEditing(false)
      showa(true, 'success', 'value change')
    }
    else {
      const newitems = {
        id: new Date().getTime().toString(),
        title: name
      }
      setlist([...list, newitems])
      setname('')
      showa(true, 'success', 'item add to the listS')
    }
  }
  const showa = (show = false, type = ' ', mesg = '') => {
    setaltert({ show, type, mesg })
  }
  const clearlist = () => {
    showa(true, 'danger', 'empty list')
    setlist([''])

  }
  const remove = (id) => {
    showa(true, 'danger', 'item remove')
    setlist(list.filter((item) => item.id !== id))
  }
  const edit = (id) => {
    const specific = list.find((item) => item.id == id)

    setEditing(true)
    seteditId(id)
    setname(specific.title)

  }
  function HT() {
    return <h3 ref={ref} >Grocery bud</h3>
  }
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])
  return (
    <section className='section-center'>
      <form className='grocery-form ' onSubmit={handle}>
        {
          alert.show && <Alert {...alert} removealert={showa} list={list} />}
        <h3 ref={ref} >Grocery bud</h3>
        <div className='form-control'>
          <input type='text' className='grocery' placeholder='eg eggs'
            value={name} onChange={(e) => setname(e.target.value)} />
          <button type='submit' className='submit-btn'>
            {
              isEditing ? 'edit' : 'submit'
            }
          </button>


        </div>

      </form>
      {
        list.length > 0 && (
          <div className='grocery-container'  >
            <List items={list} remove={remove} edit={edit} />
            <button className='clear-btn' onClick={clearlist} > claer items</button>
          </div>
        )
      }

    </section>)
}

export default App
