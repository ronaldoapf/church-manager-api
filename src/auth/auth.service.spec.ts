import { ConflictException, Injectable } from '@nestjs/common'
import type { JwtService } from '@nestjs/jwt'
import bcrypt from 'bcryptjs'
import { RegisterDto } from './dto/register-dto'
import { UserService } from 'src/user/user.service'

// auth.service.ts
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UserService,
  ) {}

  // Método de registro (criação de novo membro)
  async register(registerDto: RegisterDto) {
    const { email, password, name, birthDate, address, phone } = registerDto

    // Verifica se o membro já existe
    const existingUser = await this.usersService.findByEmail(email)
    if (existingUser) {
      throw new ConflictException('Member with this email already exists')
    }

    // Criptografa a senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10)

    // Cria o membro no banco de dados
    const newMember = await this.usersService.create({
      name,
      email,
      password: hashedPassword,
      birthDate,
      address,
      birthMonth: new Date(birthDate).getMonth() + 1,
      phone, // Não é obrigatório, mas você pode passar
    })

    // Verifica se o membro foi criado com sucesso
    if (!newMember) {
      throw new ConflictException('Failed to create a new member')
    }

    // Gerar o token JWT para o novo membro
    const payload = { sub: newMember.id, email: newMember.email }
    const accessToken = await this.jwtService.signAsync(payload)

    // Retornar o novo membro junto com o token JWT
    return {
      newMember,
      access_token: accessToken,
    }
  }
}
