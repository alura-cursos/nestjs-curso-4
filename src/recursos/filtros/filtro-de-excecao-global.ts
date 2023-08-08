import {
  ArgumentsHost,
  Catch,
  ConsoleLogger,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class FiltroDeExcecaoGlobal implements ExceptionFilter {
  constructor(
    private adapterHost: HttpAdapterHost,
    private loggerNativo: ConsoleLogger,
  ) {}

  catch(excecao: unknown, host: ArgumentsHost) {
    this.loggerNativo.error(excecao);
    console.error(excecao);

    const { httpAdapter } = this.adapterHost;

    const contexto = host.switchToHttp();
    const resposta = contexto.getResponse();
    const requisicao = contexto.getRequest();

    if ('usuario' in requisicao) {
      this.loggerNativo.log(
        `Rota acessada pelo usuário ${requisicao.usuario.sub}`,
      );
    }

    const { status, body } =
      excecao instanceof HttpException
        ? {
            status: excecao.getStatus(),
            body: excecao.getResponse(),
          }
        : {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              timestamp: new Date().toISOString(),
              path: httpAdapter.getRequestUrl(requisicao),
            },
          };

    httpAdapter.reply(resposta, body, status);
  }
}
