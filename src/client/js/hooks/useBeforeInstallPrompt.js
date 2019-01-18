import { useState, useEffect } from 'react'
import env from 'exenv'

export default function useBeforeInstallPrompt() {
  const [prompt, setPrompt] = useState(null)

  const promptToInstall = () => {
    if (prompt) {
      return prompt.prompt()
    }
    return Promise.reject(new Error('Tried installing before browser sent "beforeinstallprompt" event'))
  }

  useEffect(() => {
    const ready = e => {
      e.preventDefault()
      setPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', ready)
    return () => window.removeEventListener('beforeinstallprompt', ready)
  }, [])

  return {
    prompt,
    promptToInstall,
    nativeSupport: env.canUseDOM && !!window.BeforeInstallPromptEvent,
  }
}
