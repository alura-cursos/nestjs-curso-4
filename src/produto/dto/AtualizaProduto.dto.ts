import { PartialType } from '@nestjs/mapped-types';
import { CriaProdutoDTO } from './CriaProduto.dto';

export class AtualizaProdutoDTO extends PartialType(CriaProdutoDTO) {}
