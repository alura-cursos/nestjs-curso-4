import { IsEnum } from 'class-validator';
import { StatusPedido } from '../enum/statuspedido.enum';

export class AtualizaPedidoDto {
  @IsEnum(StatusPedido)
  status: StatusPedido;
}
