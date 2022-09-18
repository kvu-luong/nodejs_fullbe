import { TCreatePost, TPostModel } from '../../types/index';

const PostService = {
  getPostById: (getPostById: Function, id: string): Promise<TPostModel> => {
    return getPostById(id);
  },
  createPost: (createPost: Function, data: TCreatePost): Promise<TPostModel> => {
    return createPost(data);
  },
  getAllPost: (getAllPost: Function): Promise<TPostModel[]> => {
    return getAllPost();
  },
  updatePostById: (updatePostById: Function, data: TCreatePost & { id: string }): Promise<Boolean> => {
    return updatePostById(data);
  },
  deletePostById: (deletePostById: Function, id: string): Promise<TPostModel> => {
    return deletePostById(id);
  },
};

export default PostService;
