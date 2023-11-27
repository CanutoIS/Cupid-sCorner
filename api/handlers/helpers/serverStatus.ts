import handleErrors from './handleErrors.js'

export default handleErrors(async (req, res) => {
    res.send('Server UP')
})