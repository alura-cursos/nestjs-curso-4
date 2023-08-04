import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export interface UsuarioPayload {
  sub: string;
  nomeUsuario: string;
}

@Injectable()
export class AutenticacaoService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, senhaInserida: string) {
    const usuario = await this.usuarioService.buscaPorEmail(email);

    const usuarioFoiAutenticado = await bcrypt.compare(
      senhaInserida,
      usuario.senha,
    );

    if (!usuarioFoiAutenticado) {
      throw new UnauthorizedException('O email ou a senha está incorreto.');
    }

    const payload: UsuarioPayload = {
      sub: usuario.id, // subject = sujeito
      nomeUsuario: usuario.nome,
    };

    return {
      token_acesso: await this.jwtService.signAsync(payload),
    };
  }
}
