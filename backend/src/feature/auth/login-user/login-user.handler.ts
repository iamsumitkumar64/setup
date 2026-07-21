import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRepository } from "src/infrastructure/repository/user.repo";
import { BcryptService } from "src/infrastructure/service/bcrypt.service";
import { JwtHelperService } from "src/infrastructure/service/jwt.service";
import { LoginDto } from "./login-user.dto";

@Injectable()
export class LoginUserHandler {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly jwtHelperService: JwtHelperService,
        private readonly bcryptService: BcryptService
    ) { }

    async handle(body: LoginDto) {
        //check if already exists using this email
        const isUserExists = await this.userRepo.findByEmail(body.email);
        if (!isUserExists.length) {
            throw new BadRequestException('User not Exists with this Email ');
        }

        //matching password
        const isValid = await this.bcryptService.verifyPassword(body.password, isUserExists[0].password);
        if (!isValid) {
            throw new BadRequestException('Mismatched email or password');
        }

        const token = await this.jwtHelperService.generateJwtToken(isUserExists[0]);
        return {
            message: "Logged In User",
            access_token: token,
            user: {
                name: isUserExists[0].name,
                email: isUserExists[0].email,
                role: isUserExists[0].role,
                uid: isUserExists[0].uuid,
            }
        }
    }
}
