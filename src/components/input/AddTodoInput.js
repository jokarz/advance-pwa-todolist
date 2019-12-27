import React, { useState, useEffect } from 'react'
import { bounceIn, headShake } from 'react-animations'
import { StyleSheet, css } from 'aphrodite'
import { connect } from 'react-redux'

import { toCapFirst } from '../../utility/textHelper'
import { addTodo } from '../../redux/actions'

const styles = StyleSheet.create({
  radius: {
    borderRadius: '25px'
  },
  animateInRight: {
    animationName: bounceIn,
    animationDuration: '0.2s'
  },
  invalid: {
    animationName: headShake,
    animationDuration: '.5s'
  },
  borderRightRadius: {
    borderTopRightRadius: '0.4rem',
    borderBottomRightRadius: '0.4rem'
  }
})

const AddTodoInput = props => {
  const { addTodo, alert, alertAt, alertMessage, success, successAt, id, countList, setHideFab, className } = props
  const uid = 'todo' + id
  const [content, setContent] = useState('')
  const handleInput = e => {
    setContent(e.target.value)
  }

  const handleAddTodo = () => {
    const con = content.trim()
    if (con) {
      addTodo(id, toCapFirst(con))
    }
  }

  useEffect(() => {
    if (success && successAt === `addtodo${id}`) {
      setContent('')
    }
  }, [success, successAt, id])

  return (
    <div className={`card-body pb-0 ${className}`}>
      <div className={`input-group ${alert && alertAt === uid ? css(styles.invalid) : ''}`}>
        <input
          className={`form-control ${alert && alertAt === uid ? 'is-invalid' : ''} `}
          type='text' placeholder={countList ? 'Add another todo...' : 'Add a todo...'} value={content} onChange={handleInput}
          onKeyPress={(ev) => { if (ev.key === 'Enter') { handleAddTodo() } }} onFocus={(e) => { setHideFab(true) }} onBlur={(e) => { setHideFab(false) }}
        />

        {
          content
            ? <div className={`test input-group-append ${css(styles.animateInRight, styles.borderRightRadius)}`}>
              <button
                className={`btn ${alert && alertAt === uid ? 'btn-secondary' : 'btn-primary'} ${css(styles.borderRightRadius)}`} type='button'
                onClick={handleAddTodo}
              >
                <span className='fas fa-plus' />
              </button>
              </div> : null
        }
        {alert && alertAt === uid ? <span className='invalid-feedback'> {alertMessage} </span> : null}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  ...state.Misc
})

const mapDispatchToProps = dispatch => ({
  addTodo: (topicId, todoContent) => dispatch(addTodo(topicId, todoContent))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTodoInput)
