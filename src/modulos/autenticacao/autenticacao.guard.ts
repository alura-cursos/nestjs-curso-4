import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UsuarioPayload } from './autenticacao.service';
import { JwtService } from '@nestjs/jwt';

export interface RequisicaoComUsuario extends Request {
  usuario: UsuarioPayload;
}

@Injectable()
export class AutenticacaoGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(contexto: ExecutionContext): Promise<boolean> {
    const requisicao = contexto
      .switchToHttp()
      .getRequest<RequisicaoComUsuario>();
    const token = this.extrairTokenDoCabecalho(requisicao);
    if (!token) {
      throw new UnauthorizedException('Erro de autenticação');
    }

    try {
      const payload: UsuarioPayload = await this.jwtService.verifyAsync(token);
      requisicao.usuario = payload;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('JWT inválido');
    }
    return true;
  }
  private extrairTokenDoCabecalho(requisicao: Request): string | undefined {
    //formato do cabeçalho authorizathon: "Bearer <valor_do_jwt>" -> protocolo HTTP
    const [tipo, token] = requisicao.headers.authorization?.split(' ') ?? [];
    return tipo === 'Bearer' ? token : undefined;
  }
}
