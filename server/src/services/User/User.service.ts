import { RegiserInputType, TUser } from "../../types/index";

const UserService = {
    findUser: async(findOne: Function, email: string): Promise<TUser> => {
        return await findOne(email);
    },
    saveUser: async(save: Function, data: RegiserInputType) : Promise<boolean> => {
        return save(data);
    }
}

export default UserService;