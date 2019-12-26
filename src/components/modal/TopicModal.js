import React, { useState, useEffect, useRef } from 'react'
import { css } from 'aphrodite';
import { connect } from 'react-redux'

import { addTopic, resetSuccess } from '../../redux/actions';
import { toTitleCase } from '../../utility/textHelper'
import styles from '../../utility/styles'

const TopicModal = props => {
  const { show, closeOption, alert, alertAt, alertMessage, addTopic, success, successAt } = props

  const inputNode = useRef(false)

  const [hide, setHide] = useState(true)
  const [topic, setTopic] = useState('')

  const handleTopicInput = e => setTopic(toTitleCase(e.target.value))
  const handleAddTopic = () => {
    addTopic(topic.trim())
  }


  useEffect(() => {
    if (!show) {
      document.documentElement.style.overflow = "auto"
      setHide(true)
    } else {
      document.documentElement.style.overflow = "hidden"
      setHide(false)
      setTimeout(() => {
        inputNode.current.focus()
      }, 50)
    }
  }, [show])

  useEffect(() => {
    if (success) {
      setTopic('')
      closeOption()
    }
    // eslint-disable-next-line
  }, [success, successAt])

  return (
    <div className={`modal ${hide ? 'd-none' : 'd-block'}`} onKeyDown={e => { if (e.keyCode === 27) { closeOption(); } }}>
      <div className={`${css(styles.backDrop, styles.modalBackground)}`} onClick={closeOption}></div>
      <div className={`modal-dialog mt-4 ${show ? css(styles.bounceInDown) : css(styles.bounceOutUp)}`}>
        <div className={`modal-content ${css(styles.radius)}`}>
          <div className="modal-header">
            <h5 className={`modal-title text-center m-auto ${css(styles.fontTitanSmaller)}`} >New Topic</h5>
          </div>
          <div className="modal-body">
            <input
              className={`form-control ${alert && alertAt === 'topic' ? 'is-invalid' : ''} ${alert ? css(styles.invalid) : ''}`}
              type="text" placeholder="What new topic you have in mind~" value={topic} onChange={handleTopicInput}
              onKeyPress={(ev) => { if (ev.key === 'Enter') { handleAddTopic(); } }} ref={inputNode} />
            {alert && alertAt === 'topic' ? <div className="invalid-feedback"> {alertMessage} </div> : null}
          </div>
          <div className="modal-footer">
            {
              topic ?
                <button type="button" className={`btn btn-primary ${css(styles.radius, styles.shadow, styles.bounceInFast)}`} onClick={handleAddTopic}>
                  <span className="mr-1">Create!</span>
                  <span className="fas fa-paper-plane"></span>
                </button> : null
            }
            <button type="button" className={`btn btn-secondary ${css(styles.radius, styles.shadow)}`} onClick={closeOption}>
              <span className="mr-1">Nahh</span>
              <span className="fas fa-times"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}



TopicModal.defaultProps = {
  show: false,
  closeOption: () => null
}

const mapStateToProps = state => ({
  ...state.Misc
});

const mapDispatchToProps = dispatch => ({
  resetSuccess: () => dispatch(resetSuccess()),
  addTopic: title => dispatch(addTopic(title))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicModal);
