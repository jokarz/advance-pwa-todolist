import React, { useState, useEffect } from 'react'
import Masonry from 'react-masonry-css'
import { css } from 'aphrodite'
import { connect } from 'react-redux'

import Card from '../components/card/Card'
import Fab from '../components/fab/Fab'
import TopicModal from '../components/modal/TopicModal'
import { getAll, setArchive } from '../redux/actions'
import styles from '../utility/styles'

const Main = props => {
  const { Topic, Misc, getAll, setArchive } = props
  const [showModal, setShowModal] = useState(false)
  const handleModalClose = () => setShowModal(false)
  const [hideFab, setHideFab] = useState(false)

  useEffect(() => {
    getAll()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {Topic != null && Topic.length === 0
        ? <div className='d-flex justify-content-center align-items-center height-90'>
          <h5 className={`text-center ${css(styles.fontTitan)}`}>
            Create new topic to get started
          </h5>
          </div>
        : <>
          <div className='row'>
            <div className={`col d-flex justify-content-center fixed-top ${css(styles.eventPassThrough)}`}>
              <h4
                onClick={() => setArchive(!Misc.viewArchive)}
                className={`mt-5 text-center p-3 select-none border-secondary bg-white ${css(styles.pointer, styles.radius, styles.fontTitanSmaller, styles.shadowStatic, styles.borderThicker, styles.fabSubButtonHover, styles.eventAuto, styles.bounceInFast)}`}
              >
                {Misc.viewArchive ? 'Archived' : 'Ongoing'}
                {/* {Topic != null && Topic.filter(item => Boolean(item.archive) === Misc.viewArchive).length > 1 ? 's' : ''} */}
                <span className='fas fa-sort ml-2' />
              </h4>
            </div>
          </div>
          {
            Topic != null && Topic.filter(item => Boolean(item.archive) === Misc.viewArchive).length > 0
              ? <Masonry breakpointCols={{ default: 3, 950: 3, 800: 2, 650: 1 }} className='mg pb-5' columnClassName='mg_column'>
                {Topic.filter(item => Boolean(item.archive) === Misc.viewArchive).map((item, i) => (
                  <Card
                    entrance={i * 0.001}
                    id={item.id}
                    key={item.id}
                    completed={item.todos.completed || []}
                    incomplete={item.todos.incomplete || []}
                    title={item.title}
                    setHideFab={setHideFab}
                  />
                ))}
                </Masonry>
              : Topic != null
                ? <div className={`d-flex justify-content-center align-items-center ${css(styles.altHeight)}`}>
                  <h2 className={`text-center ${css(styles.fontTitan)}`}>
                    {Misc.viewArchive
                      ? <span>
                        No archived topic found
                        </span>
                      : <span>
                        Click below to create a new topic
                        </span>}
                  </h2>
                  </div>
                : null
          }
        </>}
      {
        hideFab && window.innerWidth < 600 ? null
          : <Fab
            setShowTopicModal={setShowModal}
            setArchive={setArchive}
            archive={Misc.viewArchive}
            archiveTopicCount={Topic != null ? Topic.filter(item => Boolean(item.archive)).length : 0}
            />
      }

      <TopicModal show={showModal} closeOption={handleModalClose} />
    </>
  )
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  getAll: () => dispatch(getAll()),
  setArchive: value => dispatch(setArchive(value))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
