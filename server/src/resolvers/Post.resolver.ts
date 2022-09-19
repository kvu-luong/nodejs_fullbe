import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import _pick from 'lodash/pick';
import _map from 'lodash/map';
import { ResponseBuilder } from '../helpers/responseBuilder';
import { ValidateArgs } from '../middlewares/validateResouces';
import { CreatePostRequestSchema, UpdateRequestSchema } from '../schema';
import { logger } from '../helpers/logger';
import { CreatePostInput, PostMutationResponse, PostQueryAllResponse, UpdatePostInput } from '../types/Post.td';
import PostEntity from '../services/Post';

@Resolver()
export class PostResolver {
  @Query(() => PostMutationResponse)
  async getSinglePost(@Arg('id', () => String) idInput: string): Promise<PostMutationResponse> {
    const response = new ResponseBuilder();
    try {
      const Post = await PostEntity.getPostById(idInput);
      const { _id: id, title, context, createdAt } = _pick(Post, ['_id', 'title', 'context', 'createdAt']);
      return response.setCode(200).setMessage('SUCCESS').setResult({ id, title, context, createdAt }).build();
    } catch (error: any) {
      logger.error(`Query Single Post: ${error.stack}`);
    }
    return response.setCode(500).setMessage('UNEXPECTED ERROR').build();
  }

  @Query(() => PostQueryAllResponse)
  async getAllPost(): Promise<PostQueryAllResponse> {
    const response = new ResponseBuilder();
    try {
      const posts = await PostEntity.getAllPost();
       response.setCode(200).setMessage('SUCCESS').setResult(posts).build();
       console.log(response, 'mkkk');
       return response;
    } catch (error: any) {
      logger.error(`Query All Post: ${error.stack}`);
    }
    return response.setCode(500).setMessage('UNEXPECTED ERROR').build();
  }

  @Mutation(() => PostMutationResponse)
  @ValidateArgs(CreatePostRequestSchema)
  async createPost(
    @Arg('createPostInput', () => CreatePostInput) { title, context }: CreatePostInput
  ): Promise<PostMutationResponse> {
    const response = new ResponseBuilder();
    try {
      const Post = await PostEntity.createPost({
        title,
        context,
        createdAt: new Date(),
      });
      return response
        .setCode(200)
        .setMessage('SUCCESS')
        .setResult({ id: Post._id, title, context, createdAt: Post.createdAt })
        .build();
    } catch (error: any) {
      logger.error(`Mutation Create Post: ${error.stack}`);
    }
    return response.setCode(500).setMessage('UNEXPECTED ERROR').build();
  }

  @Mutation(() => Boolean)
  @ValidateArgs(UpdateRequestSchema)
  async updatePost(
    @Arg('updatePostInput', () => UpdatePostInput) { id, title, context }: UpdatePostInput
  ): Promise<Boolean> {
    try {
      const postStatus = await PostEntity.updatePost({
        title,
        context,
        id
      });
      return postStatus;
    } catch (error: any) {
      logger.error(`Mutation Update Post: ${error.stack}`);
    }
    return false;
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg('id', () => String) id: string): Promise<Boolean> {
    try{
      return await PostEntity.deletePost(id);
    } catch (error: any) {
      logger.error(`Mutation Delete Post: ${error.stack}`);
    }
    return false;
  }

}
