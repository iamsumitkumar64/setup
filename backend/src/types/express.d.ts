import 'express';
import { UserEntity } from '../../domain/user/user.entity';

declare module 'express' {
    interface Request {
        user: UserEntity;
    }
}