import React, { useState, useEffect } from 'react'
import env from 'exenv'
import Prompt from './Prompt'
import { useBeforeInstallPrompt } from '../../hooks'

const isMobile = env.canUseDOM
  ? Boolean(navigator.userAgent.match(/Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i))
  : false

function AddToHomescreen(props) {
  const { prompt, promptToInstall, promptSupported } = useBeforeInstallPrompt()
  const [render, setRender] = useState(false)
  const [displayPrompt, setDisplayPrompt] = useState(false)

  // hack to not render anything on server side
  // effects are not run on server
  useEffect(() => {
    setRender(true)
  }, [])

  useEffect(
    () => {
      if (prompt || (!promptSupported && isMobile)) {
        return setDisplayPrompt(true)
      }
    },
    [prompt]
  )

  const hidePromptUI = () => setDisplayPrompt(false)
  const promptToInstallAndHide = () => {
    promptToInstall()
    hidePromptUI()
  }

  return render ? (
    <Prompt
      display={displayPrompt}
      onInstall={promptToInstallAndHide}
      onDismiss={hidePromptUI}
      nativeSupport={promptSupported}
    />
  ) : null
}

export default AddToHomescreen
