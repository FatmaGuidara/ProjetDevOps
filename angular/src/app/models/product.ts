export interface Product {
    _id: String
    userId: string
    categoryId: string
    title: string
    desc: string
    price: string
    productImg?: string
    createdAt?: Date
    updatedAt?: Date
}
