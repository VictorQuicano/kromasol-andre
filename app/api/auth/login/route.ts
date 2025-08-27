import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validar que se proporcionen email y password
    if (!email || !password) {
      return Response.json(
        { message: "Email y contraseña son requeridos" },
        { status: 400 }
      );
    }

    // Buscar usuario por email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return Response.json(
        { message: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    // Verificar contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return Response.json(
        { message: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    // Generar JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET || "tu-secret-key",
      { expiresIn: "7d" }
    );

    // Respuesta exitosa
    const response = Response.json({
      message: "Login exitoso",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
    response.headers.append(
      "Set-Cookie",
      `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800`
    );
    console.log("Token Generado:", token);
    return response;
  } catch (error) {
    console.error("Error en login:", error);
    return Response.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
