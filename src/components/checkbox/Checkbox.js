import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, css } from 'aphrodite'

const styles = StyleSheet.create({

  pointer: {
    cursor: 'pointer'
  },
  control: {
    paddingLeft: '1.8rem'
  },
  controlOffline: {
    paddingLeft: '0.5rem'
  },
  textBlack: {
    color: '#5a5a5a'
  },
  formGroup: {
    ':last-child': {
      marginBottom: 0
    }
  },
  controlLabel: {
    fontSize: '1.3rem',
    fontWeight: 'normal',
    lineHeight: '1.4',
    ':before': {
      width: '1.3rem',
      height: '1.3rem',
      left: '-1.8rem'
    },
    ':after': {
      width: '1.3rem',
      height: '1.3rem',
      left: '-1.8rem'
    }
  },
  controlLabelOffline: {
    color: '#5a5a5a',
    fontSize: '1.3rem',
    fontWeight: 'normal',
    lineHeight: '1.4',
    marginBottom: '0'
  }

})

// const guidGenerator = () => {
//     let S4 = function() {
//        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
//     };
//     return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
// }

const Checkbox = props => {
  const { text, clickOption, topicId, id, viewArchive } = props
  const [checked, setChecked] = useState(false)

  const click = useCallback(() => {
    clickOption(text, checked)
    // eslint-disable-next-line
  }, [checked, text])

  useEffect(() => {
    click()
  }, [click])

  return (
    <div className={`form-group ${css(styles.formGroup)}`}>
      <div className={`custom-control custom-checkbox ${!viewArchive ? css(styles.control) : css(styles.controlOffline)}`}>
        {
          !viewArchive
            ? <input type='checkbox' className='custom-control-input d-none' id={topicId + id} onChange={() => setChecked(!checked)} checked={checked} />
            : null
        }

        <label className={!viewArchive ? `custom-control-label select-none ${css(styles.controlLabel, styles.textBlack, styles.pointer)}` : `${css(styles.controlLabelOffline)}`} htmlFor={topicId + id}>
          {viewArchive
            ? <>
              <span className='fas fa-circle fa-xs mr-2' />
              {text}
              </> : <>{text}</>}
        </label>
      </div>
    </div>
  )
}

Checkbox.defaultProps = {
  id: 0,
  topicId: 0,
  clickOption: () => null,
  text: '...',
  viewArchive: false
}

export default Checkbox
