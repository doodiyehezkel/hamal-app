import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';

export const useToastPortal = () => {

    const [loaded, setLoaded] = useState<boolean>(false)
    const [protalId] = useState<string>(`toast-portal-${uuidv4()}`)

    useEffect(() => {
        const div = document.createElement('div')
        div.setAttribute('id', protalId)
        div.setAttribute('style', `position: fixed; top: 13px; right: 50%; z-index: 10; transform: translateX(50%);`)
        document.getElementsByTagName('body')[0].prepend(div)
        setLoaded(true)
        return () => { document.getElementsByTagName('body')[0].removeChild(div) }
    }, [protalId])

    return {loaded ,protalId}
}