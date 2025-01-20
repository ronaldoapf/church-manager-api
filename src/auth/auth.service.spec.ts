import { ConflictException, Injectable } from "@nestjs/common";
import type { JwtService } from "@nestjs/jwt";
import type { RegisterDto } from "src/dtos/register-dto";
import type { MembersRepository } from "src/repositories/members.repository";
import bcrypt from "bcryptjs";

// auth.service.ts
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly membersRepository: MembersRepository,
  ) {}

  // Método de registro (criação de novo membro)
  async register(registerDto: RegisterDto) {
    const { email, password, name, birthDate, address, phone } = registerDto;

    // Verifica se o membro já existe
    const existingMember = await this.membersRepository.findByEmail(email);
    if (existingMember) {
      throw new ConflictException('Member with this email already exists');
    }

    // Criptografa a senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o membro no banco de dados
    const newMember = await this.membersRepository.create({
      name,
      email,
      password: hashedPassword,
      birthDate,
      address,
      phone,  // Não é obrigatório, mas você pode passar
    });

    // Verifica se o membro foi criado com sucesso
    if (!newMember) {
      throw new ConflictException('Failed to create a new member');
    }

    // Gerar o token JWT para o novo membro
    const payload = { sub: newMember.id, email: newMember.email };
    const accessToken = await this.jwtService.signAsync(payload);

    // Retornar o novo membro junto com o token JWT
    return {
      newMember,
      access_token: accessToken,
    };
  }
}
