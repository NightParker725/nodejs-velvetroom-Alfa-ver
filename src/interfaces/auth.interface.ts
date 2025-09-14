export interface UserLoginInput {
  email: string;
  // En login tenemos esta diferenciacion entre password (plano) y passwordHash (hasheado) mientras decidimos la estrategia en la bd para la encriptacion
  passwordHash?: string;
  password?: string;
}
export interface UserLoginOutput {
  id: string;
  email: string;
  roles: string[];
  token: string;
}
