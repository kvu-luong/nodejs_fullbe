import { RegiserInputType, TUser } from "../../types/User.td";
import UserModel from "../../models/User.model";
import UserService from './User.service';

const UserEntity = {
    findUser: async (email: string) : Promise<TUser> => {
        const user:TUser = await UserService.findUser(UserModel.findOne, email);
        return user;
    },
    saveUser: (data: RegiserInputType) => {
        return UserService.saveUser(UserModel.save, data);
    }
}

export default UserEntity;