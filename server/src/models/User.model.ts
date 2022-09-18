import { Collection } from '../utils/constants';
import { getDb } from '../helpers/dbConnect';
import { RegiserInputType } from '../types/index';

export const UserModel = {
  findOne: async (email: string) => {
    try {
      const connectDb = await getDb();
      const filter = { email };
      const user = connectDb.collection(Collection.user).findOne({ ...filter });
      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  save: async(data: RegiserInputType) => {
    const connectDb = await getDb();
    const newUser = connectDb.collection(Collection.user).insertOne({ ...data });
    return newUser;
  }
};
