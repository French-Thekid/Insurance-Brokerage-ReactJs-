import { useEffect } from 'react'

function useTitle(title = 'Printz', favicon = '/logo.svg') {
  useEffect(() => {
    document.title = title
    let link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement('link')
    link.type = 'image/x-icon'
    link.rel = 'shortcut icon'
    link.href = favicon
    document.getElementsByTagName('head')[0].appendChild(link)
  }, [title, favicon])
}

export default useTitle
