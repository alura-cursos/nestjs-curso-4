import { Injectable, NotFoundException } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsuarioService } from '../usuario.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailEhUnicoValidator implements ValidatorConstraintInterface {
  constructor(private usuarioService: UsuarioService) {}

  async validate(value: any): Promise<boolean> {
    try {
      const usuarioComEmailExiste = await this.usuarioService.buscaPorEmail(
        value,
      );

      return !usuarioComEmailExiste;
    } catch (erro) {
      if (erro instanceof NotFoundException) {
        return true;
      }

      throw erro;
    }
  }
}

export const EmailEhUnico = (opcoesDeValidacao: ValidationOptions) => {
  return (objeto: object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: EmailEhUnicoValidator,
    });
  };
};
