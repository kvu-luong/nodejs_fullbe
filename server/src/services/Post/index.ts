import { TCreatePost, TPostModel } from '../../types/index';
import { PostModel } from '../../models/index';
import PostService from './Post.service';

const PostEntity = {
  getPostById: (id: string): Promise<TPostModel> => {
    const user = PostService.getPostById(PostModel.getPostById, id);
    return user;
  },
  getAllPost: (): Promise<TPostModel[]> => {
    return PostService.getAllPost(PostModel.getAllPost);
  },
  createPost: (data: TCreatePost): Promise<TPostModel> => {
    return PostService.createPost(PostModel.createPost, data);
  },
  updatePost: (data: TCreatePost & { id: string }) => {
    return PostService.updatePostById(PostModel.updatePost, data);
  },
  deletePost: (id: string) => {
    return PostService.deletePostById(PostModel.deletePost, id);
  },
};

export default PostEntity;
