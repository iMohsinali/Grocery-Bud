import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'
import { useGlobalContext } from './Contex'



function App() {

  const {
    ref,
    name,
    setname,
    list,
    handle, isEditing, remove, edit, alert, clearlist
  } = useGlobalContext();


  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])
  return (
    <section className='section-center'>
      <form className='grocery-form ' onSubmit={handle}>
        {
          alert.show && <Alert {...alert} />}

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
