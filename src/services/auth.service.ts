import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserLoginInput, UserLoginOutput } from "../interfaces/auth.interface";
import { UserDocument, UserModel } from "../models/user.model";

// Detecta si una cadena es un hash bcrypt (comienza por $2a$, $2b$ o $2y$)
const isBcrypt = (s?: string) => !!s && /^\$2[aby]\$/.test(s);

// Servicio de autenticación: login y generación de JWT
export class AuthService {
  public async login(input: UserLoginInput): Promise<UserLoginOutput> {
    //const user: UserDocument | null = await UserModel.findOne({ email: input.email }).select("+passwordHash") (antigua línea de preubas)
    const user = await UserModel.findOne({ email: input.email }).select("+passwordHash");

    // DEBUG: muestra si se encontró el usuario y si el passwordHash parece bcrypt
    if (process.env.DEBUG_AUTH === '1') {
    console.log('[AUTH] email:', input.email, 'found:', !!user);
    if (user) console.log('[AUTH] bcrypt?', /^\$2[aby]\$/.test(user.passwordHash), 'hash:', user.passwordHash);
    }

    if (!user) throw new ReferenceError("Not Authorized");
// Verifica la password: si el hash en bd es bcrypt, usa bcrypt.compare; si no, compara directamente
    let ok = false;
    if (input.passwordHash) {
      ok = input.passwordHash === user.passwordHash;
    } else if (input.password && isBcrypt(user.passwordHash)) {
      ok = await bcrypt.compare(input.password, user.passwordHash);
    } else if (input.password) {
      ok = input.password === user.passwordHash;
    }
    if (!ok) throw new ReferenceError("Not Authorized");
// Si todo va bien, devuelve id, email, roles y token JWT válido
    return {
      id: user.id,
      email: user.email,
      roles: [user.role],
      token: this.generateToken(user)
    };
  }
// Genera un JWT con id, email y roles, válido por el tiempo establecido (10 minutos aquí), luego planeamos usar la variable de entorno JWT_EXPIRES_IN
  public generateToken(user: UserDocument): string {
    const payload = { id: user.id, email: user.email, roles: [user.role] };
    // el secret debería venir de la .env que definimos (JWT_SECRET)
    const secret = process.env.JWT_SECRET || 'defaultSecret';
    return jwt.sign(payload, secret, { expiresIn: '10m' });
  }
}

export const authService = new AuthService();
