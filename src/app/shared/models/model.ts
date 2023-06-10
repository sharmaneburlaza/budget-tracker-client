export interface LoginInfo {
    email: string,
    password: string
}

export interface RegisterInfo extends LoginInfo {
    firstName: string,
    lastName: string
}

export interface User extends RegisterInfo {
    loginType: string,
    profilePic: string,
    categories: Category[],
    records: Record[]
}

export interface Category {
    name: string,
    type: string,
    id?: string | undefined
}

export interface Record {
    categoryName: string,
    categoryType: string,
    categoryId?: string
    description: string,
    amount: number,
    balance?: number,
    createdOn?: Date | string,
    isDeleted?: boolean
}