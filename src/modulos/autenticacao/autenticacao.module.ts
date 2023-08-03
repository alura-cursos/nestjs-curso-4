import { Module } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoController } from './autenticacao.controller';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [UsuarioModule],
  controllers: [AutenticacaoController],
  providers: [AutenticacaoService],
})
export class AutenticacaoModule {}
