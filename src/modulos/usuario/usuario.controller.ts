import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { HashearSenhaPipe } from '../../recursos/pipes/hashear-senha.pipe';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post()
  async criaUsuario(
    @Body() { senha, ...dadosDoUsuario }: CriaUsuarioDTO,
    @Body('senha', HashearSenhaPipe) senhaHasheada: string,
  ) {
    const usuarioCriado = await this.usuarioService.criaUsuario({
      ...dadosDoUsuario,
      senha: senhaHasheada,
    });

    return {
      messagem: 'usuário criado com sucesso',
      usuario: new ListaUsuarioDTO(usuarioCriado.id, usuarioCriado.nome),
    };
  }

  @Get()
  async listUsuarios() {
    const usuariosSalvos = await this.usuarioService.listUsuarios();

    return {
      mensagem: 'Usuários obtidos com sucesso.',
      usuarios: usuariosSalvos,
    };
  }

  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() novosDados: AtualizaUsuarioDTO,
  ) {
    const usuarioAtualizado = await this.usuarioService.atualizaUsuario(
      id,
      novosDados,
    );

    return {
      messagem: 'usuário atualizado com sucesso',
      usuario: usuarioAtualizado,
    };
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    const usuarioRemovido = await this.usuarioService.deletaUsuario(id);

    return {
      messagem: 'usuário removido com suceso',
      usuario: usuarioRemovido,
    };
  }
}
