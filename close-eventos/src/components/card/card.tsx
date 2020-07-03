import React from 'react';
import MaterialUICard, { CardProps } from '@material-ui/core/Card';
import { useStyles } from './card.styles';

export type CardPropType = CardProps & {
  children?: any;
  head?: string | JSX.Element;
  titleDivProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
  contentContainerDivProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
};

/**
 * Componente para um Card customizado
 *
 * @param {CardPropType} props
 */
function Card(props: CardPropType): JSX.Element {
  const { children, head, titleDivProps = {}, contentContainerDivProps = {}, ...others } = props;
  const classes = useStyles(props);

  return (
    <MaterialUICard className={classes.card} {...others}>
      {head && (
        <div {...titleDivProps} className={`${classes.divTitulo} ${titleDivProps.className ?? ''}`}>
          {head}
        </div>
      )}

      <div
        {...contentContainerDivProps}
        className={`${classes.content} ${contentContainerDivProps.className ?? ''}`}
      >
        {children}
      </div>
    </MaterialUICard>
  );
}

export default Card;
