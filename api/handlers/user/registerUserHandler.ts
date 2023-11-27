import { handleErrors } from '../helpers/index.js'
import { registerUser } from '../../logic/index.js'

export default handleErrors((req, res) => {
  const { name, email, password, passwordConfirm } = req.body
  
  const promise = registerUser(name, email, password, passwordConfirm)

  return (async () => {
    await promise
    
    res.status(201).send()
  })()
})