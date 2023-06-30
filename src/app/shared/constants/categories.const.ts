import { Category } from "../models/model";

const EX = 'expense';

export const CATEGORY_EXPENSES: Category[] = [
    {
        type: EX,
        name: 'Housing',
        icon: 'bi bi-house',
        isPredefined: true
    },
    {
        type: EX,
        name: 'Electric Bill',
        icon: 'bi bi-lightning',
        isPredefined: true
    },
    {
        type: EX,
        name: 'Water Bill',
        icon: 'bi bi-droplet',
        isPredefined: true
    },
    {
        type: EX,
        name: 'Internet Bill',
        icon: 'bi bi-router',
        isPredefined: true
    },
    {
        type: EX,
        name: 'Phone Bill',
        icon: 'bi bi-telephone',
        isPredefined: true
    },
    {
        type: EX,
        name: 'Car',
        icon: 'bi bi-car-front',
        isPredefined: true
    },
    {
        type: EX,
        name: 'Public Transpo',
        icon: 'bi bi-train-front',
        isPredefined: true
    },
    {
        type: EX,
        name: 'Groceries',
        icon: 'bi bi-cart4',
        isPredefined: true
    },
    {
        type: EX,
        name: 'Shopping',
        icon: 'bi bi-cart',
        isPredefined: true
    },
    {
        type: EX,
        name: 'Cable, Streaming Services',
        icon: 'bi bi-tv',
        isPredefined: true
    },
    {
        type: EX,
        name: 'Debt Payments',
        icon: 'bi bi-credit-card',
        isPredefined: true
    },
    {
        type: EX,
        name: 'Membership, Subscriptions',
        icon: 'bi bi-people',
        isPredefined: true
    },
    {
        type: EX,
        name: 'Child Care',
        icon: '',
        isPredefined: true
    },
    {
        type: EX,
        name: 'Health Care',
        icon: 'bi bi-bandaid',
        isPredefined: true
    },
    {
        type: EX,
        name: 'Emergeny Fund',
        icon: 'bi bi-hospital',
        isPredefined: true
    },
    {
        type: EX,
        name: 'Retirement',
        icon: '',
        isPredefined: true
    },
    {
        type: EX,
        name: 'Travel',
        icon: 'bi bi-airplane',
        isPredefined: true
    },
    {
        type: EX,
        name: 'Others',
        icon: '',
        isPredefined: true
    }
]