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
    _id?: string,
    defined_id?: number,
    name: string,
    type: string,
    icon?: string,
    isPredefined?: boolean
}

export interface Record {
    categoryName: string,
    categoryType: string,
    categoryId?: string
    description: string,
    amount: number,
    transactionDate: Date | string,
    balance?: number,
    createdOn?: Date | string,
    isDeleted?: boolean,
    icon?: string
}

export enum CategoryType {
    Income = 'income',
    Expense = 'expense'
}