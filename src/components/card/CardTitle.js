import React, {useState, useEffect, useRef, useCallback } from 'react'
import { css } from 'aphrodite';
import { connect } from 'react-redux'

import { deleteTopic, renameTopic, duplicateTopic, archiveTopic } from '../../redux/actions';
import { toTitleCase } from '../../utility/textHelper';
import styles from '../../utility/styles';

const CardTitle = props => {
  const { id, title, success, successAt, deleteTopic, renameTopic, duplicateTopic, alert, alertAt, alertMessage, archiveTopic, viewArchive } = props
  const [clickedTitle, setClickedTitle] = useState(false)
  const [deleteTopicBtn, setDeleteTopicBtn] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [renameTopicBtn, setRenameTopicBtn] = useState(null)
  const [duplicateTopicBtn, setDuplicateTopicBtn] = useState(null)
  const [renameTitle, setRenameTitle] = useState(title)
  const [archiveTopicBtn, setArchiveTopicBtn] = useState(null)
  const [unArchiveTopicBtn, setUnArchiveTopicBtn] = useState(null)

  const inputNode = useRef(false)

  const handleReset = useCallback(() => {
    setRenameTopicBtn(null)
    setDeleteTopicBtn(null)
    setDuplicateTopicBtn(null)
    setClickedTitle(false)
    setRenameTitle(title)
  }, [title])

  const handleClickedTitle = () => {
    if (clickedTitle) {
      handleReset()
    } else {
      setClickedTitle(true)
    }
  }

  const handleDeleteTopic = () => {
    if (deleteTopicBtn === null) {
      setDeleteTopicBtn(false)
    } else if (deleteTopicBtn === false) {
      setDeleting(true)
      deleteTopic(id)
    }
  }

  const handleRenameTopic = () => {
    if (renameTopicBtn === null) {
      setRenameTopicBtn(false)
    } else if (renameTopicBtn === false) {
      renameTopic(id, toTitleCase(renameTitle.trim()))
    }
  }

  const handleArchiveTopic = () => {
    if (archiveTopicBtn === null) {
      setArchiveTopicBtn(false)
    } else if (archiveTopicBtn === false) {
      archiveTopic(id, true)
    }
  }

  const handleUnArchiveTopic = () => {
    if (unArchiveTopicBtn === null) {
      setUnArchiveTopicBtn(false)
    } else if (unArchiveTopicBtn === false) {
      archiveTopic(id, false)
      setClickedTitle(false)
    }
  }

  const handleDuplicateTopic = () => {
    if (duplicateTopicBtn === null) {
      setDuplicateTopicBtn(false)
    } else if (duplicateTopicBtn === false) {
      duplicateTopic(id)
    }
  }

  useEffect(() => {
    if (renameTopicBtn === false) {
      inputNode.current.focus()
    }
  }, [renameTopicBtn])

  useEffect(() => {
    if (success && (successAt === `topictitle${id}` || successAt === `topicduplicate${id}`)) {
      handleReset()
    }
    // eslint-disable-next-line
  }, [success, successAt])

  useEffect(() => {
    setRenameTitle(title)
  }, [title])

  return (
    <div className={`card shadow-sm border-0 ${css(styles.radius, styles.title, styles.pointer, styles.titleTransition)}`} >
      <div className="card-body p-3 text-center">
        {renameTopicBtn != null ?
          <>
            <input
              className={`form-control text-center ${alert && alertAt === `topictitle${id}` ? `is-invalid ${css(styles.invalid)}` : ''} `}
              type="text" placeholder="Rename your topic~~" value={renameTitle} onChange={e => setRenameTitle(e.target.value)}
              onKeyPress={(ev) => ev.key === 'Enter' && title !== renameTitle.trim() && renameTitle.trim() !== '' ? handleRenameTopic() : null} ref={inputNode} />
            {alert && alertAt === `topictitle${id}` ? <div className="invalid-feedback"> {alertMessage} </div> : null}
          </>
          : <h4 className={`mb-0 text-center select-none ${css(styles.fontTitan, styles.textBlack)}`}
            onClick={() => handleClickedTitle()}>{title}
          </h4>
        }
        {
          clickedTitle && !viewArchive && renameTopicBtn === null && deleteTopicBtn === null && duplicateTopicBtn == null && archiveTopicBtn == null ?
            <div className="mt-2">
              <button className={`btn mr-2 btn-warning mt-2 ${css(styles.radius, styles.bounceInFast, styles.shadow)}`}
                onClick={() => handleRenameTopic()}>
                <span className="fas fa-edit"></span>
              </button>
              <button className={`btn mr-2 btn-primary mt-2 ${css(styles.radius, styles.bounceInFast, styles.shadow)}`}
                onClick={() => handleDuplicateTopic()}>
                <span className="fas fa-copy"></span>
              </button>
              <button className={`btn mr-2 btn-info mt-2 ${css(styles.radius, styles.bounceInFast, styles.shadow)}`}
                onClick={() => handleArchiveTopic()}>
                <span className="fas fa-box"></span>
              </button>
              <button className={`btn btn-secondary mt-2 ${css(styles.radius, styles.bounceInFast, styles.shadow)}`}
                onClick={() => handleDeleteTopic()}>
                <span className="fas fa-trash"></span>
              </button>
            </div>
            : clickedTitle && !viewArchive && renameTopicBtn === false && deleteTopicBtn === null && duplicateTopicBtn == null && archiveTopicBtn == null ?
              <div className="mt-2">
                {
                  title !== renameTitle.trim() && renameTitle.trim() !== '' ?
                    <button className={`btn mr-2 btn-warning mt-2 ${css(styles.radius, styles.bounceInFast, styles.shadow)}`}
                      onClick={() => handleRenameTopic()}>
                      <>
                        <span className="mr-1">Rename this topic</span>
                        <span className="fas fa-check"></span>
                      </>
                    </button> : null
                }
                <button className={`btn btn-secondary mt-2 ${css(styles.radius, styles.bounceInFast, styles.shadow)}`}
                  onClick={() => setRenameTopicBtn(null)}>
                  <span className="mr-1">Cancel</span>
                  <span className="fas fa-times"></span>
                </button>
              </div>
              : clickedTitle && !viewArchive && renameTopicBtn === null && deleteTopicBtn === false && duplicateTopicBtn == null && archiveTopicBtn == null ?
                <div className="mt-2">
                  <button className={`btn mr-2 btn-secondary mt-2 ${css(styles.radius, styles.bounceInFast, styles.shadow)}`}
                    onClick={() => handleDeleteTopic()}
                    disabled={deleting}>
                    {deleting ?
                      <span>Deleting...</span> :
                      <>
                        <span className="mr-1">Delete this topic</span>
                        <span className="fas fa-check"></span>
                      </>
                    }
                  </button>
                  {deleting ? null :
                    <button className={`btn mr-2 btn-secondary mt-2 ${css(styles.radius, styles.bounceInFast, styles.shadow)}`}
                      onClick={() => setDeleteTopicBtn(null)}>
                      <span className="mr-1">Cancel</span>
                      <span className="fas fa-times"></span>
                    </button>
                  }
                </div>
                : clickedTitle && !viewArchive && renameTopicBtn === null && deleteTopicBtn === null && duplicateTopicBtn === false && archiveTopicBtn === null ?
                  <div className="mt-2">
                    <button className={`btn mr-2 btn-primary mt-2 ${css(styles.radius, styles.bounceInFast, styles.shadow)}`}
                      onClick={() => handleDuplicateTopic()}>
                      <span className="mr-1">Duplicate this topic</span>
                      <span className="fas fa-check"></span>
                    </button>
                    <button className={`btn mr-2 btn-secondary mt-2 ${css(styles.radius, styles.bounceInFast, styles.shadow)}`}
                      onClick={() => setDuplicateTopicBtn(null)}>
                      <span className="mr-1">Cancel</span>
                      <span className="fas fa-times"></span>
                    </button>
                  </div>
                  : clickedTitle && !viewArchive && renameTopicBtn === null && deleteTopicBtn === null && duplicateTopicBtn === null && archiveTopicBtn === false ?
                    <div className="mt-2">
                      <button className={`btn mr-2 btn-info mt-2 ${css(styles.radius, styles.bounceInFast, styles.shadow)}`}
                        onClick={() => handleArchiveTopic()}>
                        <span className="mr-1">Archive this topic</span>
                        <span className="fas fa-check"></span>
                      </button>
                      <button className={`btn mr-2 btn-secondary mt-2 ${css(styles.radius, styles.bounceInFast, styles.shadow)}`}
                        onClick={() => setArchiveTopicBtn(null)}>
                        <span className="mr-1">Cancel</span>
                        <span className="fas fa-times"></span>
                      </button>
                    </div>
                    : clickedTitle && viewArchive && unArchiveTopicBtn == null && deleteTopicBtn === null ?
                      <div className="mt-2">
                        <button className={`btn mr-2 btn-info mt-2 ${css(styles.radius, styles.bounceInFast, styles.shadow)}`}
                          onClick={() => handleUnArchiveTopic()}>
                          <span className="fas fa-box-open"></span>
                        </button>
                        <button className={`btn mr-2 btn-secondary mt-2 ${css(styles.radius, styles.bounceInFast, styles.shadow)}`}
                          onClick={() => handleDeleteTopic()}>
                          <span className="fas fa-trash"></span>
                        </button>
                      </div>
                      : clickedTitle && viewArchive && unArchiveTopicBtn === false && deleteTopicBtn === null ?
                        <div className="mt-2">
                          <button className={`btn mr-2 btn-info mt-2 ${css(styles.radius, styles.bounceInFast, styles.shadow)}`}
                            onClick={() => handleUnArchiveTopic()}>
                            <span className="mr-1">Unarchive this topic</span>
                            <span className="fas fa-check"></span>
                          </button>
                          <button className={`btn mr-2 btn-secondary mt-2 ${css(styles.radius, styles.bounceInFast, styles.shadow)}`}
                            onClick={() => setUnArchiveTopicBtn(null)}>
                            <span className="mr-1">Cancel</span>
                            <span className="fas fa-times"></span>
                          </button>
                        </div>
                        : clickedTitle && viewArchive && unArchiveTopicBtn == null && deleteTopicBtn === false ?
                          <div className="mt-2">
                            <button className={`btn mr-2 btn-secondary mt-2 ${css(styles.radius, styles.bounceInFast, styles.shadow)}`}
                              onClick={() => handleDeleteTopic()}
                              disabled={deleting}>
                              {deleting ?
                                <span>Deleting...</span> :
                                <>
                                  <span className="mr-1">Delete this topic</span>
                                  <span className="fas fa-check"></span>
                                </>
                              }
                            </button>
                            {deleting ? null :
                              <button className={`btn mr-2 btn-secondary mt-2 ${css(styles.radius, styles.bounceInFast, styles.shadow)}`}
                                onClick={() => setDeleteTopicBtn(null)}>
                                <span className="mr-1">Cancel</span>
                                <span className="fas fa-times"></span>
                              </button>
                            }
                          </div>
                          : null
        }
      </div>
    </div>
  )
}


const mapStateToProps = state => ({
  ...state.Misc
});

const mapDispatchToProps = dispatch => ({
  deleteTopic: topicId => dispatch(deleteTopic(topicId)),
  renameTopic: (topicId, title) => dispatch(renameTopic(topicId, title)),
  duplicateTopic: topicId => dispatch(duplicateTopic(topicId)),
  archiveTopic: (topicId, archive) => dispatch(archiveTopic(topicId, archive))
});


CardTitle.defaultProps = {
  title: '...',
  id: 0,
  clickedTitle: false
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardTitle);