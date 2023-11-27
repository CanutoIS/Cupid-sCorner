import { useAppContext } from '../hooks'

type CallbackFunction = () => void
type ErrorMap = { [key: string]:  'error' | 'warning' | 'info' }
type AlertArgs = (error: string, level: 'error' | 'warning' | 'info' ) => void

export default () => {
    const { alert, unfreeze } = useAppContext()

    return (callBack: CallbackFunction) => {
        try {
            const promise = callBack()

            ; (async () => {
                try {
                    await promise
                } catch (error) {
                    if(alert) {
                        showError(error, alert)
                        if (unfreeze && typeof unfreeze === 'function') {
                            unfreeze();
                        }
                    }
                }
            })()
        } catch (error) {
            if(alert) {
                showError(error, alert)
                if (unfreeze && typeof unfreeze === 'function') {
                    unfreeze();
                }
            }
        }
    }
}

const errorMap: ErrorMap = {
    DuplicityError: 'error',
    ExistenceError: 'error',
    AuthError: 'error',
    TypeError: 'error',
    ContentError: 'error',
    RangeError: 'error',
}

function showError<T>(error: T, alert: AlertArgs) {
    const errorType = Object.getPrototypeOf(error).constructor.name
    const level: 'error' | 'warning' | 'info' = errorMap[errorType] || 'error'
    const errorMessage = error instanceof Error ? error.message : String(error);
    alert( errorMessage, level );
}