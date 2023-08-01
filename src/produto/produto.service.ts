import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaProdutoDTO } from './dto/ListaProduto.dto';
import { ProdutoEntity } from './produto.entity';
import { Repository } from 'typeorm';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async criaProduto(dadosProduto: CriaProdutoDTO) {
    const produtoEntity = new ProdutoEntity();

    Object.assign(produtoEntity, dadosProduto as ProdutoEntity);

    return this.produtoRepository.save(produtoEntity);
  }

  async listaProdutos() {
    const produtosSalvos = await this.produtoRepository.find({
      relations: {
        imagens: true,
        caracteristicas: true,
      },
    });
    const produtosLista = produtosSalvos.map(
      (produto) =>
        new ListaProdutoDTO(
          produto.id,
          produto.nome,
          produto.caracteristicas,
          produto.imagens,
        ),
    );
    return produtosLista;
  }

  async listaUmProduto(id: string) {
    const produtoSalvo = await this.produtoRepository.findOne({
      where: { id },
      relations: {
        imagens: true,
        caracteristicas: true,
      },
    });

    if (produtoSalvo === null) {
      throw new NotFoundException('O produto não foi encontrado');
    }

    const listaProduto = new ListaProdutoDTO(
      produtoSalvo.id,
      produtoSalvo.nome,
      produtoSalvo.caracteristicas,
      produtoSalvo.imagens,
    );

    return listaProduto;
  }

  async atualizaProduto(id: string, novosDados: AtualizaProdutoDTO) {
    const entityName = await this.produtoRepository.findOneBy({ id });

    if (entityName === null) {
      throw new NotFoundException('O produto não foi encontrado');
    }

    Object.assign(entityName, novosDados as ProdutoEntity);

    return this.produtoRepository.save(entityName);
  }

  async deletaProduto(id: string) {
    const produto = await this.produtoRepository.findOneBy({ id });

    if (!produto) {
      throw new NotFoundException('O produto não foi encontrado');
    }

    await this.produtoRepository.delete(produto.id);

    return produto;
  }
}
