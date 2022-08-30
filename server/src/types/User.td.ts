import { ObjectId } from "mongodb";
export type UserModel = {
    _id?: ObjectId;
    username: string;
    password: string;
    createAt?: Date;
    updateAt?: Date;
}