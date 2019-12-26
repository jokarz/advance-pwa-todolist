import React from 'react'
import { css } from 'aphrodite';

import styles from '../../utility/styles'

const Fab = props => {
  const { setShowTopicModal } = props

  const handleNewTopicClicked = () => {
    setShowTopicModal(true)
  }

  return (
    <div className={`fixed-bottom text-center mb-5 ${css(styles.eventPassThrough, styles.bounceIn)}`}>
      <div className="row">
          <div className="col">
            <button type="button"
              className={`select-none btn shadow btn-lg rounded-circle btn-primary
              ${css(styles.fabSubButtonHover, styles.eventAuto, styles.bounceInFast, styles.fontTitanSmaller)}
              `}
              onClick={handleNewTopicClicked}
            >
              
              <span className="fas fa-plus"></span>
            </button>
          </div>
        </div>
    </div>
  )
}

Fab.defaultProps = {
  onClick: () => null,
  disabled: false
}

export default Fab;