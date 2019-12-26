import React, {useState, useEffect } from 'react'
import { css } from 'aphrodite';
import { connect } from 'react-redux';

import CardTitle from './CardTitle'
import { editTodos } from '../../redux/actions';
import Checkbox from '../checkbox/Checkbox';
import AddTodoInput from '../input/AddTodoInput';
import styles from '../../utility/styles';

const Card = props => {
  const { className, title, completed, incomplete, entrance, id, success, successAt, editTodos, alert, alertAt, alertMessage, viewArchive, setHideFab } = props

  const [incompleteList, setIncompleteList] = useState({})
  const [incompleteEditShow, setIncompleteEditShow] = useState(false)
  const [completedList, setCompletedList] = useState({})
  const [completedEditShow, setCompletedEditShow] = useState(false)

  const [currentTab, setCurrentTab] = useState('incomplete') //incomplete, completed

  const resetIncompleteList = () => {
    let tempIncompleteList = {}
    incomplete.forEach(item => {
      tempIncompleteList[item.content] = false
    });
    setIncompleteList(tempIncompleteList)
  }

  const resetCompletedList = () => {
    let tempCompletedList = {}
    completed.forEach(item => {
      tempCompletedList[item.content] = false
    });
    setCompletedList(tempCompletedList)
  }

  const resetAllList = () => {
    resetCompletedList()
    resetIncompleteList()
  }


  const handleIncompleteClick = (todoContent, state) => {
    let temp = { ...incompleteList }
    temp[todoContent] = state
    setIncompleteList(temp)
  }

  const handleCompletedClick = (todoContent, state) => {
    let temp = { ...completedList }
    temp[todoContent] = state
    setCompletedList(temp)
  }

  const handleMarkList = (action) => {
    let contents = []
    if (incompleteEditShow) {
      contents = Object.keys(incompleteList).filter(item => incompleteList[item])
    } else if (completedEditShow) {
      contents = Object.keys(completedList).filter(item => completedList[item])
    }
    editTodos(id, contents, action)

  }

  useEffect(() => {
    resetAllList()
    // eslint-disable-next-line
  }, [entrance])

  useEffect(() => {
    if (completed.length === 0 && currentTab === 'completed') {
      setCurrentTab('incomplete')
    }
    if (incompleteEditShow) {
      let temp = { ...incompleteList }
      let changed = incomplete.filter(item => Object.keys(incompleteList).filter(marked => incompleteList[marked]).includes(item.content)).map(item => item.content)
      Object.keys(incompleteList).forEach(marked => {
        if (!changed.includes(marked)) {
          temp[marked] = false
        }
      })
      setIncompleteList(temp)
    }

    if (completedEditShow) {
      let temp = { ...completedList }
      let changed = completed.filter(item => Object.keys(completedList).filter(marked => completedList[marked]).includes(item.content)).map(item => item.content)
      Object.keys(completedList).forEach(marked => {
        if (!changed.includes(marked)) {
          temp[marked] = false
        }
      })
      setCompletedList(temp)
    }
    // eslint-disable-next-line
  }, [incomplete, completed])


  useEffect(() => {
    let show = Object.keys(incompleteList).some(key => incompleteList[key])
    setIncompleteEditShow(show);
  }, [incompleteList])

  useEffect(() => {
    let show = Object.keys(completedList).some(key => completedList[key])
    setCompletedEditShow(show);
  }, [completedList])

  useEffect(() => {
    currentTab === 'incomplete' ? resetCompletedList() : resetIncompleteList()
    // eslint-disable-next-line
  }, [currentTab])

  useEffect(() => {
    if (success && successAt === `edittodo${id}`) {
      resetAllList()
    }
    // eslint-disable-next-line
  }, [success, successAt])

  return (
    <>
      <div className={`d-block d-sm-inline-block ${className} `} style={{ width: '100%' }}>
      {/* opacity: show ? 1 : 0,  */}
        <CardTitle id={id} title={title} />
        <div className={`card shadow-sm border-0 ${css(styles.radius)}`}>
          <div className="card-body pt-0 pb-2">
          </div>
          {completed.length ?
            <div className="card-body pb-0">
              <ul className="nav nav-pills">
                <li className="nav-item mr-2">
                  <span className={`select-none  nav-link ${css(styles.radius, styles.tab, currentTab === 'incomplete' ? styles.tabActive : '')}`}
                    onClick={() => setCurrentTab('incomplete')}>Todo!</span>
                </li>

                <li className="nav-item">
                  <span className={`select-none nav-link ${css(styles.radius, styles.tab, currentTab === 'completed' ? styles.tabActive : '')}`}
                    onClick={() => setCurrentTab('completed')}>Completed!</span>
                </li>
              </ul>
            </div> : viewArchive ?  <div className="py-2"></div> : null
          }
          {currentTab === 'incomplete' ?
            <>
              {!viewArchive ?
                <AddTodoInput className={completed.length ? '': 'pt-4'} id={id} countList={incomplete.length + completed.length} setHideFab={setHideFab}/> : null
              }

              {incomplete.length ?
                <div className={`card-body px-0 ${incompleteEditShow ? '' : 'pb-0'}`}>
                  <div className={`px-4 pt-0 ${css(styles.limitHeight)} ${incompleteEditShow ? '' : 'mb-4'}`}>
                    {incomplete.map(item => (<Checkbox key={item.id} id={item.id} topicId={id} text={item.content} clickOption={handleIncompleteClick} viewArchive={viewArchive} />))}
                  </div>
                </div>
                :
                <div className={`card-body d-flex flex-column justify-content-center align-items-center`}>
                  {completed.length ?
                    <>
                      <h1 className="fas fa-glass-cheers text-muted text-center">
                      </h1>
                      <h5 className="font-weight-light m-0 text-muted text-center">No todos left</h5>
                    </>
                    : <>
                      <h1 className="fas fa-pencil-alt text-muted text-center">
                      </h1>
                  <h5 className="font-weight-light m-0 text-muted text-center">{viewArchive ? 'No todos found' : 'Add some todos...'}</h5>
                    </>}
                </div>
              }
            </>
            :
            <>
              {completed.length ?
                <div className={`card-body px-0 ${completedEditShow ? '' : 'pb-0'}`}>
                  <div className={`px-4 pt-0 ${css(styles.limitHeight)} ${completedEditShow ? '' : 'mb-4'}`}>
                    {completed.map(item => (<Checkbox key={item.id} id={item.id} topicId={id} text={item.content} clickOption={handleCompletedClick} viewArchive={viewArchive} />))}
                  </div>
                </div> : null
              }
            </>
          }
          {
            incompleteEditShow ?
              <div className={`card-body pt-0 card-option border-top`}>
                <p className="text-center py-3 mb-0">Mark
                  {Object.keys(incompleteList).filter(key => incompleteList[key]).length === 1 ? ' this' :
                    ' these ' + Object.keys(incompleteList).filter(key => incompleteList[key]).length} as...</p>
                <div className="d-flex justify-content-around align-items-center">
                  <button onClick={() => handleMarkList('completed')}
                    className={`btn btn-primary ${css(styles.radius, styles.shadow, styles.transition, styles.bounceInFast)}`}>
                    <span className="mr-1"> Done</span>
                    <span className="fas fa-check"></span>
                  </button>
                  <span>Or</span>
                  <button onClick={() => handleMarkList('delete')}
                    className={`btn btn-secondary ${css(styles.radius, styles.shadow, styles.transition, styles.bounceInFast)}`}>
                    <span className="mr-1"> Trash it</span>
                    <span className="fas fa-trash"></span>
                  </button>
                </div>
                {alert && alertAt === `edittodo${id}` ? <p className="text-center text-danger mb-0 mt-3" style={{ fontSize: '80%' }}>{alertMessage}</p> : null}
              </div> : null
          }
          {
            completedEditShow ?
              <div className={`card-body pt-0 card-option border-top`}>
                <p className="text-center py-3 mb-0">Mark
                  {Object.keys(completedList).filter(key => completedList[key]).length === 1 ? ' this' :
                    ' these ' + Object.keys(completedList).filter(key => completedList[key]).length} as...</p>
                <div className="d-flex justify-content-around align-items-center">
                  <button onClick={() => handleMarkList('incomplete')}
                    className={`btn btn-primary ${css(styles.radius, styles.shadow, styles.transition, styles.bounceInFast)}`}>
                    <span className="mr-1"> Todo</span>
                    <span className="fas fa-edit"></span>
                  </button>
                  <span>Or</span>
                  <button onClick={() => handleMarkList('delete')}
                    className={`btn btn-secondary ${css(styles.radius, styles.shadow, styles.transition, styles.bounceInFast)}`}>
                    <span className="mr-1"> Trash it</span>
                    <span className="fas fa-trash"></span>
                  </button>
                </div>
                {alert && alertAt === `edittodo${id}` ? <p className="text-center text-danger mb-0 mt-3" style={{ fontSize: '80%' }}>{alertMessage}</p> : null}
              </div> : null
          }
        </div>
      </div>
    </>
  )
}

Card.defaultProps = {
  entrance: 0.5,
  id: 0,
  completed: [],
  incomplete: [],
  title: '...',
  className: '',
}


const mapStateToProps = state => ({
  ...state.Misc
});

const mapDispatchToProps = dispatch => ({
  editTodos: (id, contents, type) => dispatch(editTodos(id, contents, type)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card);
