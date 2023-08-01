import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { StatusPedido } from './enum/statuspedido.enum';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { PedidoEntity } from './pedido.entity';
import { ProdutoEntity } from '../produto/produto.entity';

@Entity({ name: 'itens_pedidos' })
export class ItemPedidoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'quantidade', nullable: false })
  quantidade: number;

  @Column({ name: 'preco_venda', nullable: false })
  precoVenda: number;

  @ManyToOne(() => PedidoEntity, (pedido) => pedido.itensPedido, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  pedido: PedidoEntity;

  @ManyToOne(() => ProdutoEntity, (produto) => produto.itensPedido, {
    cascade: ['update'],
  })
  produto: ProdutoEntity;
}
