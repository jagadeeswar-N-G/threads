import { prisma } from "../db";
import JWT, { JsonWebTokenError } from "jsonwebtoken";
import { JWTUser } from "../types/interfaces";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

class JwtService {
    public static async generateTokenForUser(UserDB:any) {
        const user = await prisma.user.findUnique({
            where: {
                id: UserDB.id
            }
        })
        const payload: JWTUser = {
            id: user?.id,
            email: user?.email
        }
        const token = JWT.sign(payload, JWT_SECRET)
        return token
    }  
    public static async verifyToken(token: string) {
        try {
            return JWT.verify(token, JWT_SECRET) as JWTUser
        } catch (error) {
            throw new JsonWebTokenError("Invalid token")
        }
    }
    
}

export default JwtService