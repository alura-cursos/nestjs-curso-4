import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { ProdutoImagemEntity } from './produto-imagem.entity';
import { ProdutoCaracteristicaEntity } from './produto-caracteristica.entity';
import { ItemPedidoEntity } from '../pedido/itempedido.entity';

@Entity({ name: 'produtos' })
export class ProdutoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'valor', nullable: false })
  valor: number;

  @Column({ name: 'quantidade_disponivel', nullable: false })
  quantidadeDisponivel: number;

  @Column({ name: 'descricao', length: 255, nullable: false })
  descricao: string;

  @Column({ name: 'categoria', length: 100, nullable: false })
  categoria: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @OneToMany(
    () => ProdutoImagemEntity,
    (produtoImagemEntity) => produtoImagemEntity.produto,
    { cascade: true, eager: true },
  )
  imagens: ProdutoImagemEntity[];

  @OneToMany(
    () => ProdutoCaracteristicaEntity,
    (produtoCaracteristicaEntity) => produtoCaracteristicaEntity.produto,
    { cascade: true, eager: true },
  )
  caracteristicas: ProdutoCaracteristicaEntity[];

  @OneToMany(() => ItemPedidoEntity, (itemPedido) => itemPedido.produto)
  itensPedido: ItemPedidoEntity[];
}
