import { Injectable } from '@nestjs/common';

@Injectable()
export class AutenticacaoService {
  login(email: string, senha: string) {
    console.log(email, senha);
  }
}
