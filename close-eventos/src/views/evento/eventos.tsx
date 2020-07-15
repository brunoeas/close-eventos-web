import React, { useState } from 'react';
import Card from '../../components/card/card';
import { useStyles } from './evento.styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Create';
import AddIcon from '@material-ui/icons/Add';
import clsx from 'clsx';
import ButtonFAB from '../../components/buttonfab/button-fab';
import Evento from '../../models/evento';
import CardEvento from '../../components/cardevento/card-evento';
import Usuario from '../../models/usuario';
import TipoSexoEnum from '../../enumerations/tipo-sexo-enum';

const administrador: Usuario = {
  nmUsuario: 'Murilo Xelemper',
  dsEmail: 'rilodamae@gmail.com',
  nrTelefone: '(46) 9 9923-6314',
  tpSexo: TipoSexoEnum.FEMININO,
  dtNascimento: '2000-03-22',
};

const fakeData: Evento[] = [
  {
    dsTitulo: 'Surubão de Noronha',
    dsEvento: 'Dedo no cu e gritaria',
    dtInicio: '2020-07-20',
    nrDuracao: 4,
    dsRua: 'Rua Ameixeira de Flor',
    dsBairro: 'Bairro Nossa Senhora Aparecida',
    nrEndereco: 2201,
    nrCep: '85660-000',
    administrador,
  },
  {
    dsTitulo: 'Surubão na Colombia',
    dsEvento: 'Comi o cu de quem ta lendo',
    dtInicio: '2020-07-22',
    nrDuracao: 8,
    dsRua: 'Rua Bambino',
    dsBairro: 'Bairro Mamma Mia Rola',
    nrEndereco: 4301,
    nrCep: '85660-000',
    administrador,
  },
  {
    dsTitulo: 'Surubão de Noronha',
    dsEvento: 'Dedo no cu e gritaria',
    dtInicio: '2020-07-20',
    nrDuracao: 4,
    dsRua: 'Rua Ameixeira de Flor',
    dsBairro: 'Bairro Nossa Senhora Aparecida',
    nrEndereco: 2201,
    nrCep: '85660-000',
    administrador,
  },
  {
    dsTitulo: 'Surubão na Colombia',
    dsEvento: 'Comi o cu de quem ta lendo',
    dtInicio: '2020-07-22',
    nrDuracao: 8,
    dsRua: 'Rua Bambino',
    dsBairro: 'Bairro Mamma Mia Rola',
    nrEndereco: 4301,
    nrCep: '85660-000',
    administrador,
  },
  {
    dsTitulo: 'Surubão de Noronha',
    dsEvento: 'Dedo no cu e gritaria',
    dtInicio: '2020-07-20',
    nrDuracao: 4,
    dsRua: 'Rua Ameixeira de Flor',
    dsBairro: 'Bairro Nossa Senhora Aparecida',
    nrEndereco: 2201,
    nrCep: '85660-000',
    administrador,
  },
  {
    dsTitulo: 'Surubão na Colombia',
    dsEvento: 'Comi o cu de quem ta lendo',
    dtInicio: '2020-07-22',
    nrDuracao: 8,
    dsRua: 'Rua Bambino',
    dsBairro: 'Bairro Mamma Mia Rola',
    nrEndereco: 4301,
    nrCep: '85660-000',
    administrador,
  },
  {
    dsTitulo: 'Surubão de Noronha',
    dsEvento: 'Dedo no cu e gritaria',
    dtInicio: '2020-07-20',
    nrDuracao: 4,
    dsRua: 'Rua Ameixeira de Flor',
    dsBairro: 'Bairro Nossa Senhora Aparecida',
    nrEndereco: 2201,
    nrCep: '85660-000',
    administrador,
  },
  {
    dsTitulo: 'Surubão na Colombia',
    dsEvento: 'Comi o cu de quem ta lendo',
    dtInicio: '2020-07-22',
    nrDuracao: 8,
    dsRua: 'Rua Bambino',
    dsBairro: 'Bairro Mamma Mia Rola',
    nrEndereco: 4301,
    nrCep: '85660-000',
    administrador,
  },
  {
    dsTitulo: 'Surubão de Noronha',
    dsEvento: 'Dedo no cu e gritaria',
    dtInicio: '2020-07-20',
    nrDuracao: 4,
    dsRua: 'Rua Ameixeira de Flor',
    dsBairro: 'Bairro Nossa Senhora Aparecida',
    nrEndereco: 2201,
    nrCep: '85660-000',
    administrador,
  },
  {
    dsTitulo: 'Surubão na Colombia',
    dsEvento: 'Comi o cu de quem ta lendo',
    dtInicio: '2020-07-22',
    nrDuracao: 8,
    dsRua: 'Rua Bambino',
    dsBairro: 'Bairro Mamma Mia Rola',
    nrEndereco: 4301,
    nrCep: '85660-000',
    administrador,
  },
  {
    dsTitulo: 'Surubão de Noronha',
    dsEvento: 'Dedo no cu e gritaria',
    dtInicio: '2020-07-20',
    nrDuracao: 4,
    dsRua: 'Rua Ameixeira de Flor',
    dsBairro: 'Bairro Nossa Senhora Aparecida',
    nrEndereco: 2201,
    nrCep: '85660-000',
    administrador,
  },
  {
    dsTitulo: 'Surubão na Colombia',
    dsEvento: 'Comi o cu de quem ta lendo',
    dtInicio: '2020-07-22',
    nrDuracao: 8,
    dsRua: 'Rua Bambino',
    dsBairro: 'Bairro Mamma Mia Rola',
    nrEndereco: 4301,
    nrCep: '85660-000',
    administrador,
  },
  {
    dsTitulo: 'Surubão de Noronha',
    dsEvento: 'Dedo no cu e gritaria',
    dtInicio: '2020-07-20',
    nrDuracao: 4,
    dsRua: 'Rua Ameixeira de Flor',
    dsBairro: 'Bairro Nossa Senhora Aparecida',
    nrEndereco: 2201,
    nrCep: '85660-000',
    administrador,
  },
  {
    dsTitulo: 'Surubão na Colombia',
    dsEvento: 'Comi o cu de quem ta lendo',
    dtInicio: '2020-07-22',
    nrDuracao: 8,
    dsRua: 'Rua Bambino',
    dsBairro: 'Bairro Mamma Mia Rola',
    nrEndereco: 4301,
    nrCep: '85660-000',
    administrador,
  },
  {
    dsTitulo: 'Surubão de Noronha',
    dsEvento: 'Dedo no cu e gritaria',
    dtInicio: '2020-07-20',
    nrDuracao: 4,
    dsRua: 'Rua Ameixeira de Flor',
    dsBairro: 'Bairro Nossa Senhora Aparecida',
    nrEndereco: 2201,
    nrCep: '85660-000',
    administrador,
  },
  {
    dsTitulo: 'Surubão na Colombia',
    dsEvento: 'Comi o cu de quem ta lendo',
    dtInicio: '2020-07-22',
    nrDuracao: 8,
    dsRua: 'Rua Bambino',
    dsBairro: 'Bairro Mamma Mia Rola',
    nrEndereco: 4301,
    nrCep: '85660-000',
    administrador,
  },
  {
    dsTitulo: 'Surubão de Noronha',
    dsEvento: 'Dedo no cu e gritaria',
    dtInicio: '2020-07-20',
    nrDuracao: 4,
    dsRua: 'Rua Ameixeira de Flor',
    dsBairro: 'Bairro Nossa Senhora Aparecida',
    nrEndereco: 2201,
    nrCep: '85660-000',
    administrador,
  },
  {
    dsTitulo: 'Surubão na Colombia',
    dsEvento: 'Comi o cu de quem ta lendo',
    dtInicio: '2020-07-22',
    nrDuracao: 8,
    dsRua: 'Rua Bambino',
    dsBairro: 'Bairro Mamma Mia Rola',
    nrEndereco: 4301,
    nrCep: '85660-000',
    administrador,
  },
  {
    dsTitulo: 'Surubão de Noronha',
    dsEvento: 'Dedo no cu e gritaria',
    dtInicio: '2020-07-20',
    nrDuracao: 4,
    dsRua: 'Rua Ameixeira de Flor',
    dsBairro: 'Bairro Nossa Senhora Aparecida',
    nrEndereco: 2201,
    nrCep: '85660-000',
    administrador,
  },
  {
    dsTitulo: 'Surubão na Colombia',
    dsEvento: 'Comi o cu de quem ta lendo',
    dtInicio: '2020-07-22',
    nrDuracao: 8,
    dsRua: 'Rua Bambino',
    dsBairro: 'Bairro Mamma Mia Rola',
    nrEndereco: 4301,
    nrCep: '85660-000',
    administrador,
  },
  {
    dsTitulo: 'Surubão de Noronha',
    dsEvento: 'Dedo no cu e gritaria',
    dtInicio: '2020-07-20',
    nrDuracao: 4,
    dsRua: 'Rua Ameixeira de Flor',
    dsBairro: 'Bairro Nossa Senhora Aparecida',
    nrEndereco: 2201,
    nrCep: '85660-000',
    administrador,
  },
  {
    dsTitulo: 'Surubão na Colombia',
    dsEvento: 'Comi o cu de quem ta lendo',
    dtInicio: '2020-07-22',
    nrDuracao: 8,
    dsRua: 'Rua Bambino',
    dsBairro: 'Bairro Mamma Mia Rola',
    nrEndereco: 4301,
    nrCep: '85660-000',
    administrador,
  },
  {
    dsTitulo: 'Surubão de Noronha',
    dsEvento: 'Dedo no cu e gritaria',
    dtInicio: '2020-07-20',
    nrDuracao: 4,
    dsRua: 'Rua Ameixeira de Flor',
    dsBairro: 'Bairro Nossa Senhora Aparecida',
    nrEndereco: 2201,
    nrCep: '85660-000',
    administrador,
  },
  {
    dsTitulo: 'Surubão na Colombia',
    dsEvento: 'Comi o cu de quem ta lendo',
    dtInicio: '2020-07-22',
    nrDuracao: 8,
    dsRua: 'Rua Bambino',
    dsBairro: 'Bairro Mamma Mia Rola',
    nrEndereco: 4301,
    nrCep: '85660-000',
    administrador,
  },
  {
    dsTitulo: 'Surubão de Noronha',
    dsEvento: 'Dedo no cu e gritaria',
    dtInicio: '2020-07-20',
    nrDuracao: 4,
    dsRua: 'Rua Ameixeira de Flor',
    dsBairro: 'Bairro Nossa Senhora Aparecida',
    nrEndereco: 2201,
    nrCep: '85660-000',
    administrador,
  },
  {
    dsTitulo: 'Surubão na Colombia',
    dsEvento: 'Comi o cu de quem ta lendo',
    dtInicio: '2020-07-22',
    nrDuracao: 8,
    dsRua: 'Rua Bambino',
    dsBairro: 'Bairro Mamma Mia Rola',
    nrEndereco: 4301,
    nrCep: '85660-000',
    administrador,
  },
  {
    dsTitulo: 'Surubão de Noronha',
    dsEvento: 'Dedo no cu e gritaria',
    dtInicio: '2020-07-20',
    nrDuracao: 4,
    dsRua: 'Rua Ameixeira de Flor',
    dsBairro: 'Bairro Nossa Senhora Aparecida',
    nrEndereco: 2201,
    nrCep: '85660-000',
    administrador,
  },
  {
    dsTitulo: 'Surubão na Colombia',
    dsEvento: 'Comi o cu de quem ta lendo',
    dtInicio: '2020-07-22',
    nrDuracao: 8,
    dsRua: 'Rua Bambino',
    dsBairro: 'Bairro Mamma Mia Rola',
    nrEndereco: 4301,
    nrCep: '85660-000',
    administrador,
  },
  {
    dsTitulo: 'Surubão de Noronha',
    dsEvento: 'Dedo no cu e gritaria',
    dtInicio: '2020-07-20',
    nrDuracao: 4,
    dsRua: 'Rua Ameixeira de Flor',
    dsBairro: 'Bairro Nossa Senhora Aparecida',
    nrEndereco: 2201,
    nrCep: '85660-000',
    administrador,
  },
  {
    dsTitulo: 'Surubão na Colombia',
    dsEvento: 'Comi o cu de quem ta lendo',
    dtInicio: '2020-07-22',
    nrDuracao: 8,
    dsRua: 'Rua Bambino',
    dsBairro: 'Bairro Mamma Mia Rola',
    nrEndereco: 4301,
    nrCep: '85660-000',
    administrador,
  },
  {
    dsTitulo: 'Surubão de Noronha',
    dsEvento: 'Dedo no cu e gritaria',
    dtInicio: '2020-07-20',
    nrDuracao: 4,
    dsRua: 'Rua Ameixeira de Flor',
    dsBairro: 'Bairro Nossa Senhora Aparecida',
    nrEndereco: 2201,
    nrCep: '85660-000',
    administrador,
  },
  {
    dsTitulo: 'Surubão na Colombia',
    dsEvento: 'Comi o cu de quem ta lendo',
    dtInicio: '2020-07-22',
    nrDuracao: 8,
    dsRua: 'Rua Bambino',
    dsBairro: 'Bairro Mamma Mia Rola',
    nrEndereco: 4301,
    nrCep: '85660-000',
    administrador,
  },
];

export type EventosPropTypes = {};

/**
 * Listagem de eventos
 *
 * @param {EventosPropTypes} props
 * @returns {JSX.Element}
 */
function Eventos(props: EventosPropTypes): JSX.Element {
  const classes = useStyles(props);

  const [eventoList, setEventoList] = useState<Evento[]>(fakeData);
  const [selected, setSelected] = useState<Evento | null>(null);

  return (
    <>
      <Card
        className={classes.card}
        contentContainerDivProps={{ style: { padding: 0 } }}
        head={
          <Grid container>
            <Grid item xs={3} style={{ display: 'flex', alignItems: 'center' }}>
              Eventos
            </Grid>

            <Grid item xs />

            <Grid item xs={2} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant='contained'
                disabled={!selected}
                className={clsx(classes.button, classes.buttonEdit)}
                classes={{ disabled: classes.buttonDisabled }}
              >
                <EditIcon color='secondary' />
              </Button>

              <Button
                variant='contained'
                disabled={!selected}
                className={clsx(classes.button, classes.buttonDelete)}
                classes={{ disabled: classes.buttonDisabled }}
              >
                <DeleteIcon color='secondary' />
              </Button>
            </Grid>
          </Grid>
        }
      >
        <div className={classes.containerScroll}>
          <div className={classes.containerCards}>
            {eventoList.map((item, i) => (
              <CardEvento key={i} evento={item} />
            ))}
          </div>
        </div>
      </Card>

      <ButtonFAB>
        <AddIcon />
      </ButtonFAB>
    </>
  );
}

export default Eventos;
