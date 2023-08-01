import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

class ItemPedidoDTO {
  @IsUUID()
  produtoId: string;
  @IsInt()
  @Min(1, { message: 'A quantidade solicitada deve ser maior que zero' })
  quantidade: number;
}

export class CriaPedidoDTO {
  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemPedidoDTO)
  itensPedido: ItemPedidoDTO[];
}
