import React from 'react'
import { css } from 'aphrodite'

import Main from './views/Main'
import styles from './utility/styles'

const App = () => {
  return (
    <div className={` bg-animation ${css(styles.transition)}`} style={{ minHeight: '100vh', width: '100%' }}>
      <div className='container pb-5' style={{ maxWidth: '1000px' }}>
        <Main />
      </div>
    </div>
  )
}

export default App
