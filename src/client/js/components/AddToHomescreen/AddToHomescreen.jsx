import React, { useState, useEffect } from 'react'
import env from 'exenv'
import Prompt from './Prompt'
import { useBeforeInstallPrompt } from '../../hooks'

function AddToHomescreen() {
  const { prompt, promptToInstall, nativeSupport } = useBeforeInstallPrompt()
  const [render, setRender] = useState(false)
  const [displayPrompt, setDisplayPrompt] = useState(false)
  const isMobile = env.canUseDOM
    ? Boolean(navigator.userAgent.match(/Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i))
    : false

  // this causes that render is not set on the server
  // therefore we first render null on both server and client
  useEffect(() => {
    setRender(true)
  }, [])

  useEffect(
    () => {
      if (prompt || (!nativeSupport && isMobile && !navigator.standalone)) {
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
      nativeSupport={nativeSupport}
    />
  ) : null
}

export default AddToHomescreen
