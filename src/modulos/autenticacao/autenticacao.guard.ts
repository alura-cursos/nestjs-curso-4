import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AutenticacaoGuard implements CanActivate {
  canActivate(contexto: ExecutionContext): boolean {
    return true;
  }
}
