//import axios from '../../utility/axiosInstance';
import { getData, setData } from '../../utility/localStorageHelper'
//-----------------------------View Archive---------------------$
export const setArchive = data => {
  return {
    type: 'setArchive',
    data
  }
}


//-----------------------------SUCCESS---------------------
export const resetSuccess = () => {
  return {
    type: 'resetSuccess'
  }
}

export const success = () => {
  return {
    type: 'success'
  }
}

export const successAt = data => {
  return {
    type: 'successAt',
    data
  }
}

//-----------------------LOADING---------------------------
export const loadStart = () => {
  return {
    type: 'loadStart'
  }
}

export const loadStop = () => {
  return {
    type: 'loadStop'
  }
}

//---------------------------------------ALERT----------------------
export const alertStart = () => {
  return {
    type: 'alertStart'
  }
}

export const alertStop = () => {
  return {
    type: 'alertStop'
  }
}

export const alertMsg = data => {
  return {
    type: 'updateAlertMsg',
    data
  }
}

export const alertAt = data => { //topic, todo+id, edit+id
  return {
    type: 'alertAt',
    data
  }
}


//-----------------------LOAD TOPIC AND TODOS--------------------------------
export const loadAll = data => {
  return {
    type: 'loadAll',
    data
  }
}


export const autoGetAll = () => {
  return async dispatch => {
    const data = getData()
    dispatch(loadAll(data))
  }
}

export const getAll = () => {
  return async dispatch => {
    const data = getData()
    dispatch(loadAll(data))
  }
}

export const addTopic = title => {
  return async dispatch => {
    title = title.trim()
    const data = getData()
    let index = data.findIndex(item => item.title === title)
    dispatch(loadStart());
    if (title === '') {
      dispatch(loadStop())
      dispatch(alertAt('topic'))
      dispatch(alertMsg('Please enter a valid topic'))
      dispatch(alertStart())
      setTimeout(() => { dispatch(alertStop()) }, 3000)
    } else if (index > -1) {
      dispatch(loadStop())
      dispatch(alertAt('topic'))
      dispatch(alertMsg(`Topic already exist ${data[index].archive ? 'in archived' : ''}`))
      dispatch(alertStart())
      setTimeout(() => { dispatch(alertStop()) }, 3000)
    } else {
      const id = Math.random().toString(36).substring(2)
      setData([{ id, title, archive: false, todos: { "completed": [], "incomplete": [] } }, ...data])
      dispatch(loadStop())
      dispatch(success())
      dispatch(successAt('topic' + title))
      dispatch(getAll())
    }
  }
}

export const archiveTopic = (topicId, archive) => {
  return async dispatch => {
    const data = getData()
    dispatch(loadStart());
    dispatch(resetSuccess());
    let index = data.findIndex(item => item.id === topicId)
    if (index > -1) {
      data[index].archive = archive
      let tempo = data[index]
      data.splice(index, 1)
      data.unshift(tempo)
      if (!data.some(item => item.archive)) {
        dispatch(setArchive(false))
      }
    }
    setData(data)
    dispatch(loadStop())
    dispatch(successAt('topicarchive' + topicId))
    dispatch(success())
    dispatch(getAll())
    dispatch(resetSuccess());
  }
}

export const renameTopic = (topicId, title) => {
  return async dispatch => {
    const data = getData()
    let index = data.findIndex(item => item.title === title)
    dispatch(loadStart());
    dispatch(resetSuccess());
    if (index > -1) {
      dispatch(alertAt('topictitle' + topicId))
      dispatch(alertMsg(`Topic already exist ${data[index].archive ? 'in archived' : ''}`))
      dispatch(alertStart())
      setTimeout(() => { dispatch(alertStop()) }, 3000)
      dispatch(loadStop())
    } else {
      index = data.findIndex(item => item.id === topicId)
      if (index > -1) {
        data[index].title = title.trim()
      }
      setData(data)
      dispatch(getAll())
      dispatch(loadStop())
      dispatch(success())
      dispatch(successAt('topictitle' + topicId))
    }
    setTimeout(() => {
      dispatch(resetSuccess());
    }, 50)

  }
}

export const duplicateTopic = topicId => {
  return async dispatch => {
    const data = getData()
    dispatch(loadStart());
    dispatch(resetSuccess())
    let dup = null
    for (let i = 0; i < data.length; i++) {
      let item = data[i]
      if (item.id === topicId) {
        dup = JSON.parse(JSON.stringify(item))
        break
      }
    }
    let index = 1
    while (true) {
      let exist = false
      let title = `(${index}) ${dup.title}`

      for (let i = 0; i < data.length; i++) {
        if (data[i].title === title) {
          exist = true
          break
        }
      }
      if (!exist) {
        dup.title = title
        dup.id = Math.random().toString(36).substring(2)
        data.unshift(dup)
        break;
      }
      index++
    }
    setData(data)
    dispatch(loadStop())
    dispatch(success())
    dispatch(successAt('topicduplicate' + topicId))
    dispatch(getAll())
    setTimeout(() => {
      dispatch(resetSuccess());
    }, 50)
  }
}

export const deleteTopic = topicId => {
  return async dispatch => {
    const data = getData()
    dispatch(loadStart());
    let index = data.findIndex(item => item.id === topicId)
    if (index > -1) {
      data.splice(index, 1)
      if (!data.some(item => item.archive)) {
        dispatch(setArchive(false))
      }
      setData(data)
    }
    dispatch(loadStop())
    dispatch(success())
    dispatch(getAll())
  }
}

//this part onwards is done differently from the server sided ver
export const addTodo = (topicId, content) => {
  return async dispatch => {
    const data = getData()
    dispatch(loadStart());
    dispatch(resetSuccess());
    let index = data.findIndex(item => item.id === topicId)
    if (index === -1) {
      dispatch(loadStop())
      return
    }
    const allTodos = [...data[index].todos.completed, ...data[index].todos.incomplete]
    if (allTodos.some(todo => todo.content === content.trim())) {
      dispatch(alertAt('todo' + topicId))
      dispatch(alertMsg('Todo already exist~'))
      dispatch(alertStart())
      setTimeout(() => { dispatch(alertStop()) }, 3000)
      dispatch(loadStop())
    } else {
      const newTodo = { id: Math.random().toString(36).substring(2), content }
      data[index].todos.incomplete.unshift(newTodo)
      setData(data)
      dispatch(loadStop())
      dispatch(successAt('addtodo' + topicId))
      dispatch(success())
      dispatch(getAll())
      setTimeout(() => {
        dispatch(resetSuccess());
      }, 50)
    }
  }
}

export const editTodos = (topicId, contents, action) => { // action = ['completed', 'incomplete', 'delete']
  return async dispatch => {
    const data = getData()
    dispatch(loadStart());
    dispatch(resetSuccess());
    let index = data.findIndex(item => item.id === topicId)
    if (index === -1) {
      dispatch(loadStop())
      return
    }

    if (action === 'incomplete' || action === 'completed') {
      let originType = action === 'incomplete' ? 'completed' : 'incomplete'
      contents.forEach(content => {
        let itemIndex = data[index]['todos'][originType].findIndex(item => item.content === content.trim())
        if (itemIndex === -1) {
          dispatch(loadStop())
          return
        }
        let item = data[index]['todos'][originType][itemIndex]
        data[index]['todos'][action].unshift({ ...item })
        data[index]['todos'][originType].splice(itemIndex, 1)
      });
    } else {
      contents.forEach(content => {
        const newIncomplete = data[index]['todos']['incomplete'].filter(todo => todo.content !== content.trim())
        const newCompleted = data[index]['todos']['completed'].filter(todo => todo.content !== content.trim())
        data[index]['todos']['incomplete'] = newIncomplete
        data[index]['todos']['completed'] = newCompleted
      })
    }
    setData(data)
    dispatch(loadStop())
    dispatch(successAt('edittodo' + topicId))
    dispatch(success())
    dispatch(getAll())
  }
}
