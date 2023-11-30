import { Types } from 'mongoose'

const { ObjectId } = Types

interface Generator {
    user: () => {
        name: string;
        email: string;
        password: string;
        avatar: string;
        cart: any[];
    }
    product: () => {
        author: InstanceType<typeof ObjectId>,
        name: string,
        images: string[],
        description: string,
        price: string,
        category: string
    }
}

const generate: Generator = {
    user: () => ({
        name: `name-${Math.random()}`,
        email: `email@${Math.random()}.com`,
        password: `password-${Math.random()}`,
        avatar: `avatar-${Math.random()}`,
        cart: []
    }),
    product: () => ({
        author: new ObjectId(`6102a3cbf245ef001c9a${(Math.random() * 10000).toFixed(0)}`),
        name: `name-${Math.random()}.com`,
        images: [`image-${Math.random()}`, `image-${Math.random()}`, `image-${Math.random()}`],
        description: `avatar-${Math.random()}`,
        price: (Math.random() * 100).toFixed(2),
        category: 'Jewelry'
    })
};

export default generate;
