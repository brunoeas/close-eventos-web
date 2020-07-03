import React, { ChangeEvent } from 'react';
import NumberFormat, { NumberFormatProps } from 'react-number-format';
import TextField from '../textfield/text-field';

/**
 * Tipo da máscara que vai ser aplicada: Telefone=0; CNPJ=1; Dinheiro=2; CEP=3;
 *
 * @enum {number}
 */
export enum MaskTypeEnum {
  TELEPHONE = 0,
  CNPJ = 1,
  MONEY = 2,
  CEP = 3,
}

export type MaskedTextFieldPropType = NumberFormatProps & {
  /**
   * @type {MaskTypeEnum} Tipo da máscara que será aplicada: Telefone=0; CNPJ=1; Dinheiro=2; CEP=3;
   */
  typeMask: MaskTypeEnum;
  /** @deprecated use onChangeValue */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeValue?: (value: string) => void;
  value?: string;
  /**
   * Se deve usar, por exemplo, "+55" na máscara de telefone
   */
  useRegion?: boolean;
};

/**
 * Componente TextField com máscara customizado
 *
 * @author Bruno Eduardo <bruno.soares@kepha.com.br>
 * @see https://github.com/s-yadav/react-number-format#readme
 * @param {MaskedTextFieldPropType} props
 */
function MaskedTextField(props: MaskedTextFieldPropType): JSX.Element {
  const {
    typeMask,
    onChangeValue,
    useRegion,
    thousandSeparator,
    decimalSeparator,
    style,
    value = '',
    ...others
  } = props;

  let dynamicNumberFormatProps: NumberFormatProps = { customInput: TextField };

  setPropsByMaskType();

  dynamicNumberFormatProps = {
    ...dynamicNumberFormatProps,
    ...others,
    style: { width: '100%', position: 'relative', ...style },
    value,
    onValueChange: (values) => onChangeValue && onChangeValue(values.formattedValue.trim()),
  };

  return <NumberFormat {...dynamicNumberFormatProps} />;

  /**
   * TextField com máscara para telefone
   */
  function setPropsToPhone(): void {
    let maskTelefone = value?.length === 15 ? '(##) #####-####' : '(##) ####-#####';
    if (useRegion) {
      maskTelefone = '+## (##) #####-####';
    }

    dynamicNumberFormatProps.format = maskTelefone;
  }

  /**
   * TextField com máscara para CNPJ
   */
  function setPropsToCNPJ() {
    dynamicNumberFormatProps.format = '##.###.###/####-##';
  }

  /**
   * TextField com máscara para dinheiro
   */
  function setPropsToMoney() {
    dynamicNumberFormatProps.decimalScale = 2;
    dynamicNumberFormatProps.fixedDecimalScale = true;
    dynamicNumberFormatProps.isNumericString = true;
    dynamicNumberFormatProps.thousandSeparator = thousandSeparator ?? '.';
    dynamicNumberFormatProps.decimalSeparator = decimalSeparator ?? ',';
  }

  /**
   * TextField com máscara para CEP
   */
  function setPropsToCEP() {
    dynamicNumberFormatProps.format = '#####-###';
  }

  /**
   * Valida e chama um método para settar as props do componente de acordo com o tipo de máscara
   */
  function setPropsByMaskType() {
    switch (typeMask) {
      case MaskTypeEnum.TELEPHONE:
        setPropsToPhone();
        break;
      case MaskTypeEnum.CNPJ:
        setPropsToCNPJ();
        break;
      case MaskTypeEnum.MONEY:
        setPropsToMoney();
        break;
      case MaskTypeEnum.CEP:
        setPropsToCEP();
        break;
      default:
        throw new Error(`Tipo da máscara inválida: ${typeMask}`);
    }
  }
}

export default MaskedTextField;
