import React, { useState } from 'react'
import { Transition } from 'react-transition-group'
import { media, stylesheet, classes } from 'typestyle'
import { colors, buttonReset, ergonomics } from '../../styles/common'

const styles = stylesheet({
  wrapper: {
    visibility: 'hidden',
    transform: 'translateY(100%)',
    transition: 'transform .3s cubic-bezier(.25, .8, .25, 1)',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    padding: '1em',
    background: colors.LIGHTEST_GRAY,
    boxSizing: 'border-box',
  },
  title: {
    margin: 0,
    marginBottom: '1em',
    fontSize: '1em',
    fontWeight: 'normal',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    ...media(
      {
        minWidth: ergonomics.LAP.BEGINNING,
      },
      {
        flexDirection: 'row',
      }
    ),
  },
  button: {
    ...buttonReset,
    padding: '.5em 1em',
    background: colors.NEARFORM_BRAND_MAIN,
    color: 'white',
    fontSize: '1.1em',
  },
  installButton: {
    marginBottom: '.8em',
    ...media(
      {
        minWidth: ergonomics.LAP.BEGINNING,
      },
      {
        marginBottom: 0,
        marginRight: '.8em',
      }
    ),
  },
})

const promptTransition = {
  entering: { visibility: 'visible', transform: 'translateY(0)' },
  entered: { visibility: 'visible', transform: 'translateY(0)' },
  exiting: { visibility: 'visible' },
}

function Unsupported({ onDismiss }) {
  const [displayInstructions, setDisplayInstructions] = useState(false)
  const showInstructions = () => setDisplayInstructions(true)

  return (
    <>
      {displayInstructions && (
        <>
          <p>If you are using Chrome, press the Menu button in the browser and Add to homescreen.</p>
          <p>If you are using Safari, press the Share button in the browser and Add to Home Screen.</p>
          <p>If you are using Opera, press the plus sign in top left and Add to home screen.</p>
          <p>For any other browser please consult with documentation.</p>
        </>
      )}
      <div className={styles.buttons}>
        {!displayInstructions && (
          <button className={classes(styles.button, styles.installButton)} onClick={showInstructions}>
            Install
          </button>
        )}
        <button className={styles.button} onClick={onDismiss}>
          Close
        </button>
      </div>
    </>
  )
}

function Prompt({ display, onInstall, onDismiss, nativeSupport }) {
  return (
    <Transition in={display} timeout={300}>
      {state => (
        <div className={styles.wrapper} style={{ ...promptTransition[state] }}>
          <h3 className={styles.title}>This app can be installed for offline use.</h3>

          {nativeSupport && (
            <div className={styles.buttons}>
              <button className={classes(styles.button, styles.installButton)} onClick={onInstall}>
                Install
              </button>
              <button className={styles.button} onClick={onDismiss}>
                Close
              </button>
            </div>
          )}

          {!nativeSupport && <Unsupported onDismiss={onDismiss} />}
        </div>
      )}
    </Transition>
  )
}

export default Prompt
