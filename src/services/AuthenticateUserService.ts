import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken"
import { UsersRepositories } from "../repositories/UsersRepositories";


interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({ email, password } : IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);

        const user = await usersRepositories.findOne({
            email
        });

        if(!user) {
            throw new Error("Incorrect Email/Password");
        }

        const passwordMatches = await compare(password, user.password);

        if(!passwordMatches) {
            throw new Error("Incorrect Email/Password");
        }

        const token = sign({
            email: user.email
        }, "65730ed585e43c9188c3a4080619c86e", {
            subject: user.id,
            expiresIn: "1d"
        });

        return token;
    }
}

export { AuthenticateUserService }