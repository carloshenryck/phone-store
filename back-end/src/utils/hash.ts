import crypto from 'crypto'

export default (password: string) => crypto.createHash('md5').update(password).digest('hex');