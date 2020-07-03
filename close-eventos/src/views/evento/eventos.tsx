import React from 'react';
import Card from '../../components/card/card';
import { useStyles } from './evento.styles';

export type EventosPropTypes = {};

/**
 * Listagem de eventos
 *
 * @param {EventosPropTypes} props
 * @returns {JSX.Element}
 */
function Eventos(props: EventosPropTypes): JSX.Element {
  const classes = useStyles(props);

  return (
    <Card head={<div>Header</div>} className={classes.card}>
      Eventos
    </Card>
  );
}

export default Eventos;
