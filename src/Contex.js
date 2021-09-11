import React, { useState, useContext } from 'react'
import useWebAnimations, { rubberBand } from "@wellyshen/use-web-animations";

const AppContext = React.createContext();

const getlocal = () => {
    let list = localStorage.getItem('list')
    if (list) {
        return JSON.parse(localStorage.getItem('list'))
    }
    else {
        return []
    }
}
export const AppProvider = ({ children }) => {
    const { ref } = useWebAnimations({ ...rubberBand });
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
                if (item.id === editId) {
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
    return <AppContext.Provider value={
        {
            handle,
            showa,
            edit,
            clearlist,
            remove,
            HT,
            ref,
            name,
            setname,
            list,
            setlist,
            isEditing,
            setEditing,
            editId,
            seteditId,
            alert,
            setaltert
        }}>{children}</AppContext.Provider>
}


export const useGlobalContext = () => {
    return useContext(AppContext)
}

