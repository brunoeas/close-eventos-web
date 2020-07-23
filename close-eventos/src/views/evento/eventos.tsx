import React, { useState } from 'react';
import Card from '../../components/card/card';
import { useStyles } from './evento.styles';
import AddIcon from '@material-ui/icons/Add';
import ButtonFAB from '../../components/buttonfab/button-fab';
import Evento from '../../models/evento';
import CardEvento from '../../components/cardevento/card-evento';
import DialogEvento from '../../components/dialogevento/dialog-evento';
import { useHistory } from 'react-router-dom';
import EventoAPI from '../../resources/api/evento';
import { useComponentDidMount } from '../../utils/hooks';
import Loading from '../../components/loading/loading';
import Swal from '../../components/swal/swal';

export type EventosPropTypes = {};

/**
 * Listagem de eventos
 *
 * @param {EventosPropTypes} props
 * @returns {JSX.Element}
 */
function Eventos(props: EventosPropTypes): JSX.Element {
  const classes = useStyles(props);
  const history = useHistory();

  const [eventoList, setEventoList] = useState<Evento[]>([]);
  const [selected, setSelected] = useState<Evento | null>(null);
  const [dialogIsOpen, setDialogOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);

  useComponentDidMount(() => {
    const eventoAPI = new EventoAPI();

    eventoAPI
      .findAll()
      .then((res) => setEventoList(res.data))
      .catch((err) => {
        Swal({
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: 'Ok',
          title: 'Ocorreu um erro',
          text: 'Não foi possível carregar os eventos, tente novamente',
          icon: 'error',
        });
      })
      .finally(() => setLoading(false));
  });

  return (
    <>
      <Loading show={isLoading} />

      <Card head='Eventos' className={classes.card} contentContainerDivProps={{ style: { padding: 0 } }}>
        <div className={classes.containerScroll}>
          <div className={classes.containerCards}>
            {eventoList.map((item, i) => (
              <CardEvento
                key={i}
                evento={item}
                onClickView={() => {
                  setSelected(item);
                  setDialogOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      </Card>

      <ButtonFAB title='Novo evento' onClick={() => history.push('/evento/novo')}>
        <AddIcon />
      </ButtonFAB>

      {selected && (
        <DialogEvento open={dialogIsOpen} evento={selected} onCloseDialog={() => setDialogOpen(false)} />
      )}
    </>
  );
}

export default Eventos;
