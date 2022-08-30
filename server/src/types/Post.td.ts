import { ObjectId } from "mongodb";
export type PostModel = {
    _id?: ObjectId;
    title: string;
    text: string;
    createAt?: Date;
    updateAt?: Date;
}