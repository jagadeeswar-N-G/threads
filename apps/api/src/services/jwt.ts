import { prisma } from "../db";
import JWT from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";


class JwtService {
    public static async generateTokenForUser(userId: number){
        const user = await prisma.user.findUnique({
            where: {
                id: userId
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