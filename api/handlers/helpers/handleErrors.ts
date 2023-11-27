import { errors } from 'com'
import { Request, Response } from "express";

const { ExistenceError, DuplicityError, AuthError, ContentError } = errors

type CallbackFunction = (arg1: Request, arg2: Response) => Promise<void>

export default (callBack: CallbackFunction) => {
    return (req: Request, res: Response) => {
        try {
            const promise = callBack(req, res)

            ; (async () => {
                try {
                    await promise
                } catch (error: any) {
                    let status = 500;
                    let type = 'UnknownError';
                  
                    if (error instanceof DuplicityError) {
                      status = 409;
                      type = error.constructor.name
                    } else if (error instanceof ExistenceError) {
                      status = 404;
                      type = error.constructor.name
                    } else if (error instanceof AuthError) {
                      status = 401;
                      type = error.constructor.name
                    } else if (error instanceof ContentError) {
                      status = 406;
                      type = error.constructor.name
                    }
                  
                    res.status(status).json({ message: error.message, type })
                }
            })()
        } catch (error: any) {
            let status: number = 500
            let type: string = 'UnknownError';
        
            if(error instanceof TypeError || error instanceof ContentError || error instanceof RangeError) {
              status = 406
              type = error.constructor.name
            }
        
            res.status(status).json({ message: error.message, type })
        }  
    }
}