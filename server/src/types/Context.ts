import { Request, Response } from "express";
import { Session , SessionData } from 'express-session';
import { ObjectId } from "mongodb";

export type ContextType = {
    req: Request & { session : Session & Partial<SessionData> & {userId?: ObjectId}},
    res: Response
}