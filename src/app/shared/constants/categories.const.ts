import { Category } from "../models/model";

const EX = 'expense';
const IN = 'income';

export const CATEGORY_INCOME: Category[] = [
    {
        defined_id: 1,
        type: IN,
        name: 'Salary',
        icon: 'bi bi-cash',
        isPredefined: true
    }
]

export const CATEGORY_EXPENSES: Category[] = [
    {
        defined_id: 11,
        type: EX,
        name: 'Housing',
        icon: 'bi bi-house',
        isPredefined: true
    },
    {
        defined_id: 12,
        type: EX,
        name: 'Electric Bill',
        icon: 'bi bi-lightning',
        isPredefined: true
    },
    {
        defined_id: 13,
        type: EX,
        name: 'Water Bill',
        icon: 'bi bi-droplet',
        isPredefined: true
    },
    {
        defined_id: 14,
        type: EX,
        name: 'Internet Bill',
        icon: 'bi bi-router',
        isPredefined: true
    },
    {
        defined_id: 15,
        type: EX,
        name: 'Phone Bill',
        icon: 'bi bi-telephone',
        isPredefined: true
    },
    {
        defined_id: 16,
        type: EX,
        name: 'Car',
        icon: 'bi bi-car-front',
        isPredefined: true
    },
    {
        defined_id: 17,
        type: EX,
        name: 'Public Transpo',
        icon: 'bi bi-train-front',
        isPredefined: true
    },
    {
        defined_id: 18,
        type: EX,
        name: 'Groceries',
        icon: 'bi bi-cart4',
        isPredefined: true
    },
    {
        defined_id: 19,
        type: EX,
        name: 'Shopping',
        icon: 'bi bi-cart',
        isPredefined: true
    },
    {
        defined_id: 20,
        type: EX,
        name: 'Cable, Streaming Services',
        icon: 'bi bi-tv',
        isPredefined: true
    },
    {
        defined_id: 21,
        type: EX,
        name: 'Debt Payments',
        icon: 'bi bi-credit-card',
        isPredefined: true
    },
    {
        defined_id: 22,
        type: EX,
        name: 'Membership, Subscriptions',
        icon: 'bi bi-people',
        isPredefined: true
    },
    {
        defined_id: 23,
        type: EX,
        name: 'Child Care',
        icon: '',
        isPredefined: true
    },
    {
        defined_id: 24,
        type: EX,
        name: 'Health Care',
        icon: 'bi bi-bandaid',
        isPredefined: true
    },
    {
        defined_id: 25,
        type: EX,
        name: 'Emergeny Fund',
        icon: 'bi bi-hospital',
        isPredefined: true
    },
    {
        defined_id: 26,
        type: EX,
        name: 'Retirement',
        icon: '',
        isPredefined: true
    },
    {
        defined_id: 27,
        type: EX,
        name: 'Travel',
        icon: 'bi bi-airplane',
        isPredefined: true
    },
    {
        defined_id: 28,
        type: EX,
        name: 'Others',
        icon: '',
        isPredefined: true
    }
]