import { User } from "../../../data/models.js"

interface UserProps {
    name: string
    email: string
    password: string
    avatar: string
    cart: Array<any>
}

export default async (_users: UserProps) => await User.insertMany(_users)