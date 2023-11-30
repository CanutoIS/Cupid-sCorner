import { useEffect, useState } from 'react'

const useSetStopHeight = () => {
    const [stopHeight, setStopHeight] = useState(0)

    useEffect(() => {
        window.scrollTo({ top: 0 })

        const handleScroll = () => {
            const scrollPosition = window.scrollY
            const windowHeight = window.innerHeight
            const documentHeight = document.documentElement.scrollHeight
            const remainingSpace = documentHeight - scrollPosition - windowHeight

            const bottomHeight = remainingSpace < 100 ? 100 - remainingSpace : 0

            
            setStopHeight(bottomHeight)
          }
      
          window.addEventListener('scroll', handleScroll)
      
          return () => {
            window.removeEventListener('scroll', handleScroll)
          }
    }, [])

    return stopHeight
}

export default useSetStopHeight