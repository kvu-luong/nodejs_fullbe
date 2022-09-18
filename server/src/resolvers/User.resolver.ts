import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { RegisterInput, LoginInput, UserMutationResponse } from '../types/User.td';
import UserEntity from '../services/User';
import { hashPassword, verifyPasswordWithHash } from '../helpers/encrypt';
import { ResponseBuilder } from '../helpers/responseBuilder';
import { ValidateArgs } from '../middlewares/validateResouces';
import { RegisterRequestSchema } from '../schema';
import { logger } from '../helpers/logger';
import { ContextType } from '../types/Context';
import { COOKIE_NAME } from '../utils/constants';
@Resolver()
export class UserResolver {
  @Query(() => UserMutationResponse)
  hello(@Ctx() { req }: ContextType) {
    console.log(req.session.userId); // get session id from cookie
    return { code: 1, message: 'hello' };
  }

  @Mutation(() => UserMutationResponse)
  @ValidateArgs(RegisterRequestSchema)
  async register(
    @Arg('registerInput', () => RegisterInput) { email, password, username }: RegisterInput
  ): Promise<UserMutationResponse> {
    const response = new ResponseBuilder();
    try {
      const user = await UserEntity.findUser(email);
      if (user)
        return response.setCode(400).setMessage('NOT VALID REGISTER INPUT').setResult({ username, email }).build();

      const encryptedPassword = await hashPassword(password);
      await UserEntity.saveUser({
        email,
        password: encryptedPassword,
        username: username,
      });
      return response.setCode(200).setMessage('SUCCESS').setResult({ username, email }).build();
    } catch (error: any) {
      logger.error(`Mutation Register: ${error.stack}`);
    }
    return response.setCode(400).setMessage('UNEXPECTED ERROR').setResult({ username, email }).build();
  }

  @Mutation(() => UserMutationResponse)
  async login(
    @Arg('loginInput', () => LoginInput) { email, password }: LoginInput,
    @Ctx() { req }: ContextType
  ): Promise<UserMutationResponse> {
    const response = new ResponseBuilder();
    try {
      const user = await UserEntity.findUser(email);
      if (!user) return response.setCode(400).setMessage('USER NOT FOUND').build();

      const encryptedPassword = user.password;
      const isRightPassword = await verifyPasswordWithHash(password, encryptedPassword!);
      if (!isRightPassword) return response.setCode(400).setMessage('WRONG PASSWORD').build();

      // save to Session Collection and create cookie for browser
      req.session.userId = user._id!;

      return response.setCode(200).setMessage('LOGIN SUCCESS').setResult({ username: user.username, email }).build();
    } catch (error: any) {
      logger.error(`Mutation Login: ${error.stack}`);
    }
    return response.setCode(400).setMessage('UNEXPECTED ERROR').build();
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: ContextType): Promise<Boolean> {
    return new Promise((resolve, _reject) => {
      res.clearCookie(COOKIE_NAME);
      req.session.destroy((error) => {
        if(error) {
          logger.error(`Mutation Logout: ${error.stack}`);
          return resolve(false);
        }
        return resolve(true);
      })
    })
  }
}
