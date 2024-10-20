import { prisma } from "../db";
import JWT from "jsonwebtoken";
import { GoogleUserPayload } from "../users/resolvers";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

class JwtService {
    public static async generateTokenForUser(UserDB:any) {
        const user = await prisma.user.findUnique({
            where: {
                id: UserDB.id
            }
        })
        const payload = {
            id: user?.id,
            email: user?.email
        }
        const token = JWT.sign(payload, JWT_SECRET)
        return token
    }   
}

export default JwtService