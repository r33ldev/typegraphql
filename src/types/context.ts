import { User } from './../users/schema/user.schema';
import {Request, Response} from 'express';

export interface Context {
    req: Request;
    res: Response;
    user: User | null;
}