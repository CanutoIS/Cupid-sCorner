import { useContext } from "react";
import Context from '../../AppContext'

type AlertArgs = (error: string, level?: 'error' | 'warning' | 'info' ) => void

interface AppContextProperties {
    navigate?: (arg: string) => void
    alert?: AlertArgs
    freeze?: () => void
    unfreeze?: () => void
    lastUpdate?: number
    setLastUpdate?: (date: number) => void
}

export default (): AppContextProperties => useContext(Context)