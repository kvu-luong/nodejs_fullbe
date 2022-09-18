import { ObjectId } from 'mongodb';
import _map from 'lodash/map';
import { Collection } from '../utils/constants';
import { getDb } from '../helpers/dbConnect';
import { TCreatePost, TPostModel } from '../types/index';

export const PostModel = {
  getPostById: async (id: string) => {
    try {
      const connectDb = await getDb();
      const filter = { _id: new ObjectId(id) };
      return await connectDb.collection(Collection.post).findOne({ ...filter });
    } catch (error: any) {
      throw new Error(error);
    }
  },
  getAllPost: async () => {
    try {
      const connectDb = await getDb();
      let posts = await connectDb.collection(Collection.post).find().toArray();
      let final;
      if (posts) {
        final = _map(posts, (element: TPostModel) => {
          return {
            id: element._id,
            title: element.title,
            context: element.context,
            ...(element?.createdAt ? { createdAt: element.createdAt } : {createdAt: new Date()}),
          };
        });
      }
      return final || [];
    } catch (error: any) {
      throw new Error(error);
    }
  },
  createPost: async (data: TCreatePost) => {
    try {
      const connectDb = await getDb();
      const Post = await connectDb.collection(Collection.post).insertOne({ ...data });
      if (Post.insertedId) return connectDb.collection(Collection.post).findOne({ _id: Post.insertedId });
      throw new Error('Create Post Unpected Error');
    } catch (error: any) {
      throw new Error(error);
    }
  },
  updatePost: async ({ id, title, context }: TCreatePost & { id: string }) => {
    try {
      const connectDb = await getDb();
      const filter = { _id: new ObjectId(id) };

      const update = {
        $set: {
          ...(title ? { title } : {}),
          ...(context ? { context } : {}),
        },
      };

      let result = await connectDb.collection(Collection.user).updateOne(filter, update);
      if (result.modifiedCount) return true;
      return false;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  deletePost: async (id: string) => {
    try {
      const connectDb = await getDb();
      const condition = { _id: new ObjectId(id) };
      return await connectDb.collection(Collection.post).deleteOne(condition);
    } catch (error: any) {
      throw new Error(error);
    }
  },
};
