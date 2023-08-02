import { Module } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoController } from './autenticacao.controller';

@Module({
  controllers: [AutenticacaoController],
  providers: [AutenticacaoService]
})
export class AutenticacaoModule {}
