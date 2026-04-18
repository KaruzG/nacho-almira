import { useState, useEffect } from "react"

interface UseHandleScrollProps {
    threshold: number
}

export const useHandleScroll = ({threshold}: UseHandleScrollProps) => {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > threshold)
        }
        
        handleScroll()
        
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [threshold])

    return scrolled
}

export default useHandleScroll
