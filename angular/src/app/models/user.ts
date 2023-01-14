import { Token } from "./token"
export interface User {
    _id?: string
    name: string
    email: string
    password: string
    age: number
    gender: string
    userImg?: string
    tokens?: Token[]
    createdAt?: Date
    updatedAt?: Date

}
