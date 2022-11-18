
const host = 'http://localhost:8000'

const buildUrl = (path: string[]) => {
    return `${host}/${path.join('/')}`
}

export const QueryAPI = {
    user: {
        all: () => buildUrl(['user']),
        single: (userId: string) => {
            return buildUrl(['user', userId])
        }
    },
    product: {
        all: () => buildUrl(['product']),
        single: (productId: string) => {
            return buildUrl(['product', productId])
        }
    },
    comment: {
        all: (productId: string) => buildUrl(['rate', 'product', productId]),
    }
}

export const Command = {
    user: {
        register: () => buildUrl(['register']),
        login: () => buildUrl(['login'])
    },
    comment: {
        add: () => buildUrl(['rate','create_rate'])
    }
}