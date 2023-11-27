import { User, Product } from '../../../data/models.js';

const clearData = async () => {
    await User.deleteMany();
    await Product.deleteMany();
};

export default clearData;

// in series
    // return User.deleteMany()
    //     .then(() => Product.deleteMany())

    // in parallel (faster)
    // return Promise.all([
    //     User.deleteMany(),
    //     Product.deleteMany()
    // ])