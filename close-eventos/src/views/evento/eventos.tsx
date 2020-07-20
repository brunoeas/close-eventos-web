import React, { useState } from 'react';
import Card from '../../components/card/card';
import { useStyles } from './evento.styles';
import AddIcon from '@material-ui/icons/Add';
import ButtonFAB from '../../components/buttonfab/button-fab';
import Evento from '../../models/evento';
import CardEvento from '../../components/cardevento/card-evento';
import Usuario from '../../models/usuario';
import TipoSexoEnum from '../../enumerations/tipo-sexo-enum';
import DialogEvento from '../../components/dialogevento/dialog-evento';
import { useHistory } from 'react-router-dom';
import EventoAPI from '../../resources/api/evento';
import { useComponentDidMount } from '../../utils/hooks';
import Loading from '../../components/loading/loading';
import Swal from '../../components/swal/swal';

const administrador: Usuario = {
  nmUsuario: 'Murilo Xelemper',
  dsEmail: 'rilodamae@gmail.com',
  nrTelefone: '(46) 9 9923-6314',
  tpSexo: TipoSexoEnum.FEMININO,
  dtNascimento: '2000-03-22',
  dsSenha: '',
};

const fakeData: Evento[] = [
  {
    dsTitulo: 'Dedo no cu e gritaria',
    dsEvento:
      'Surubão de Noronha la naquele lugar longe pra caralho puta que pariu eu to escrevendo só pra encher linguiçãoe ficar um texto enorme as das da sd asd as da sd asd asdasdasd asd asd as dasdas da sd asdasdasda',
    dhInicio: '2020-07-22:15:30-0300',
    nrDuracao: 4,
    dsRua: 'Rua Ameixeira de Flor',
    dsBairro: 'Bairro Nossa Senhora Aparecida',
    dsComplemento: 'APTO 207, Perto da universidade UNISEP, num prédio que fica atrás de uma casa',
    nrEndereco: 2201,
    idMunicipio: 3304557,
    idUF: 33,
    administrador: {
      nmUsuario: 'Murilo Xelemper',
      dsEmail: 'rilodamae@gmail.com',
      nrTelefone: '(46) 9 9923-6314',
      tpSexo: TipoSexoEnum.FEMININO,
      dtNascimento: '2000-03-22',
      dsSenha: '',
      dsLinkFoto:
        'https://scontent.figu2-1.fna.fbcdn.net/v/t1.0-9/72663501_961949844167461_3866688438736519168_n.jpg?_nc_cat=108&_nc_sid=110474&_nc_eui2=AeF5X7Y-heTmvaLdl8uXTleRaroTF-K9zZlquhMX4r3NmWGVYkPrTDDmvR2sHacTz30h2hxsxmeCsB7tnFEB_gsx&_nc_ohc=vt55BYJZ7D8AX9mVVO9&_nc_ht=scontent.figu2-1.fna&oh=27e6ac83b908a3b8dadac3e90a66ee4d&oe=5F361D72',
    },
  },
  {
    dsTitulo: 'Surubão na Colombia',
    dsEvento: 'Comi o cu de quem ta lendo',
    dhInicio: '2020-07-22',
    nrDuracao: 8,
    dsRua: 'Rua Bambino',
    dsBairro: 'Bairro Mamma Mia Rola',
    nrEndereco: 4301,
    idMunicipio: 3304557,
    idUF: 33,
    administrador,
  },
  {
    dsTitulo: 'Surubão de Noronha',
    dsEvento: 'Dedo no cu e gritaria',
    dhInicio: '2020-07-20',
    nrDuracao: 4,
    dsRua: 'Rua Ameixeira de Flor',
    dsBairro: 'Bairro Nossa Senhora Aparecida',
    nrEndereco: 2201,
    idMunicipio: 3304557,
    idUF: 33,
    administrador,
  },
  {
    dsTitulo: 'Surubão na Colombia',
    dsEvento: 'Comi o cu de quem ta lendo',
    dhInicio: '2020-07-22',
    nrDuracao: 8,
    dsRua: 'Rua Bambino',
    dsBairro: 'Bairro Mamma Mia Rola',
    nrEndereco: 4301,
    idMunicipio: 3304557,
    idUF: 33,
    administrador,
  },
  {
    dsTitulo: 'Surubão de Noronha',
    dsEvento: 'Dedo no cu e gritaria',
    dhInicio: '2020-07-20',
    nrDuracao: 4,
    dsRua: 'Rua Ameixeira de Flor',
    dsBairro: 'Bairro Nossa Senhora Aparecida',
    nrEndereco: 2201,
    idMunicipio: 3304557,
    idUF: 33,
    administrador,
  },
  {
    dsTitulo: 'Surubão na Colombia',
    dsEvento: 'Comi o cu de quem ta lendo',
    dhInicio: '2020-07-22',
    nrDuracao: 8,
    dsRua: 'Rua Bambino',
    dsBairro: 'Bairro Mamma Mia Rola',
    nrEndereco: 4301,
    idMunicipio: 3304557,
    idUF: 33,
    administrador,
  },
  {
    dsTitulo: 'Surubão de Noronha',
    dsEvento: 'Dedo no cu e gritaria',
    dhInicio: '2020-07-20',
    nrDuracao: 4,
    dsRua: 'Rua Ameixeira de Flor',
    dsBairro: 'Bairro Nossa Senhora Aparecida',
    nrEndereco: 2201,
    idMunicipio: 3304557,
    idUF: 33,
    administrador,
  },
  {
    dsTitulo: 'Surubão na Colombia',
    dsEvento: 'Comi o cu de quem ta lendo',
    dhInicio: '2020-07-22',
    nrDuracao: 8,
    dsRua: 'Rua Bambino',
    dsBairro: 'Bairro Mamma Mia Rola',
    nrEndereco: 4301,
    idMunicipio: 3304557,
    idUF: 33,
    administrador,
  },
  {
    dsTitulo: 'Surubão de Noronha',
    dsEvento: 'Dedo no cu e gritaria',
    dhInicio: '2020-07-20',
    nrDuracao: 4,
    dsRua: 'Rua Ameixeira de Flor',
    dsBairro: 'Bairro Nossa Senhora Aparecida',
    nrEndereco: 2201,
    idMunicipio: 3304557,
    idUF: 33,
    administrador,
  },
  {
    dsTitulo: 'Surubão na Colombia',
    dsEvento: 'Comi o cu de quem ta lendo',
    dhInicio: '2020-07-22',
    nrDuracao: 8,
    dsRua: 'Rua Bambino',
    dsBairro: 'Bairro Mamma Mia Rola',
    nrEndereco: 4301,
    idMunicipio: 3304557,
    idUF: 33,
    administrador,
  },
  {
    dsTitulo: 'Surubão de Noronha',
    dsEvento: 'Dedo no cu e gritaria',
    dhInicio: '2020-07-20',
    nrDuracao: 4,
    dsRua: 'Rua Ameixeira de Flor',
    dsBairro: 'Bairro Nossa Senhora Aparecida',
    nrEndereco: 2201,
    idMunicipio: 3304557,
    idUF: 33,
    administrador,
  },
  {
    dsTitulo: 'Surubão na Colombia',
    dsEvento: 'Comi o cu de quem ta lendo',
    dhInicio: '2020-07-22',
    nrDuracao: 8,
    dsRua: 'Rua Bambino',
    dsBairro: 'Bairro Mamma Mia Rola',
    nrEndereco: 4301,
    idMunicipio: 3304557,
    idUF: 33,
    administrador,
  },
  {
    dsTitulo: 'Surubão de Noronha',
    dsEvento: 'Dedo no cu e gritaria',
    dhInicio: '2020-07-20',
    nrDuracao: 4,
    dsRua: 'Rua Ameixeira de Flor',
    dsBairro: 'Bairro Nossa Senhora Aparecida',
    nrEndereco: 2201,
    idMunicipio: 3304557,
    idUF: 33,
    administrador,
  },
  {
    dsTitulo: 'Surubão na Colombia',
    dsEvento: 'Comi o cu de quem ta lendo',
    dhInicio: '2020-07-22',
    nrDuracao: 8,
    dsRua: 'Rua Bambino',
    dsBairro: 'Bairro Mamma Mia Rola',
    nrEndereco: 4301,
    idMunicipio: 3304557,
    idUF: 33,
    administrador,
  },
  {
    dsTitulo: 'Surubão de Noronha',
    dsEvento: 'Dedo no cu e gritaria',
    dhInicio: '2020-07-20',
    nrDuracao: 4,
    dsRua: 'Rua Ameixeira de Flor',
    dsBairro: 'Bairro Nossa Senhora Aparecida',
    nrEndereco: 2201,
    idMunicipio: 3304557,
    idUF: 33,
    administrador,
  },
  {
    dsTitulo: 'Surubão na Colombia',
    dsEvento: 'Comi o cu de quem ta lendo',
    dhInicio: '2020-07-22',
    nrDuracao: 8,
    dsRua: 'Rua Bambino',
    dsBairro: 'Bairro Mamma Mia Rola',
    nrEndereco: 4301,
    idMunicipio: 3304557,
    idUF: 33,
    administrador,
  },
  {
    dsTitulo: 'Surubão de Noronha',
    dsEvento: 'Dedo no cu e gritaria',
    dhInicio: '2020-07-20',
    nrDuracao: 4,
    dsRua: 'Rua Ameixeira de Flor',
    dsBairro: 'Bairro Nossa Senhora Aparecida',
    nrEndereco: 2201,
    idMunicipio: 3304557,
    idUF: 33,
    administrador,
  },
  {
    dsTitulo: 'Surubão na Colombia',
    dsEvento: 'Comi o cu de quem ta lendo',
    dhInicio: '2020-07-22',
    nrDuracao: 8,
    dsRua: 'Rua Bambino',
    dsBairro: 'Bairro Mamma Mia Rola',
    nrEndereco: 4301,
    idMunicipio: 3304557,
    idUF: 33,
    administrador,
  },
  {
    dsTitulo: 'Surubão de Noronha',
    dsEvento: 'Dedo no cu e gritaria',
    dhInicio: '2020-07-20',
    nrDuracao: 4,
    dsRua: 'Rua Ameixeira de Flor',
    dsBairro: 'Bairro Nossa Senhora Aparecida',
    nrEndereco: 2201,
    idMunicipio: 3304557,
    idUF: 33,
    administrador,
  },
  {
    dsTitulo: 'Surubão na Colombia',
    dsEvento: 'Comi o cu de quem ta lendo',
    dhInicio: '2020-07-22',
    nrDuracao: 8,
    dsRua: 'Rua Bambino',
    dsBairro: 'Bairro Mamma Mia Rola',
    nrEndereco: 4301,
    idMunicipio: 3304557,
    idUF: 33,
    administrador,
  },
  {
    dsTitulo: 'Surubão de Noronha',
    dsEvento: 'Dedo no cu e gritaria',
    dhInicio: '2020-07-20',
    nrDuracao: 4,
    dsRua: 'Rua Ameixeira de Flor',
    dsBairro: 'Bairro Nossa Senhora Aparecida',
    nrEndereco: 2201,
    idMunicipio: 3304557,
    idUF: 33,
    administrador,
  },
  {
    dsTitulo: 'Surubão na Colombia',
    dsEvento: 'Comi o cu de quem ta lendo',
    dhInicio: '2020-07-22',
    nrDuracao: 8,
    dsRua: 'Rua Bambino',
    dsBairro: 'Bairro Mamma Mia Rola',
    nrEndereco: 4301,
    idMunicipio: 3304557,
    idUF: 33,
    administrador,
  },
  {
    dsTitulo: 'Surubão de Noronha',
    dsEvento: 'Dedo no cu e gritaria',
    dhInicio: '2020-07-20',
    nrDuracao: 4,
    dsRua: 'Rua Ameixeira de Flor',
    dsBairro: 'Bairro Nossa Senhora Aparecida',
    nrEndereco: 2201,
    idMunicipio: 3304557,
    idUF: 33,
    administrador,
  },
  {
    dsTitulo: 'Surubão na Colombia',
    dsEvento: 'Comi o cu de quem ta lendo',
    dhInicio: '2020-07-22',
    nrDuracao: 8,
    dsRua: 'Rua Bambino',
    dsBairro: 'Bairro Mamma Mia Rola',
    nrEndereco: 4301,
    idMunicipio: 3304557,
    idUF: 33,
    administrador,
  },
  {
    dsTitulo: 'Surubão de Noronha',
    dsEvento: 'Dedo no cu e gritaria',
    dhInicio: '2020-07-20',
    nrDuracao: 4,
    dsRua: 'Rua Ameixeira de Flor',
    dsBairro: 'Bairro Nossa Senhora Aparecida',
    nrEndereco: 2201,
    idMunicipio: 3304557,
    idUF: 33,
    administrador,
  },
  {
    dsTitulo: 'Surubão na Colombia',
    dsEvento: 'Comi o cu de quem ta lendo',
    dhInicio: '2020-07-22',
    nrDuracao: 8,
    dsRua: 'Rua Bambino',
    dsBairro: 'Bairro Mamma Mia Rola',
    nrEndereco: 4301,
    idMunicipio: 3304557,
    idUF: 33,
    administrador,
  },
  {
    dsTitulo: 'Surubão de Noronha',
    dsEvento: 'Dedo no cu e gritaria',
    dhInicio: '2020-07-20',
    nrDuracao: 4,
    dsRua: 'Rua Ameixeira de Flor',
    dsBairro: 'Bairro Nossa Senhora Aparecida',
    nrEndereco: 2201,
    idMunicipio: 3304557,
    idUF: 33,
    administrador,
  },
  {
    dsTitulo: 'Surubão na Colombia',
    dsEvento: 'Comi o cu de quem ta lendo',
    dhInicio: '2020-07-22',
    nrDuracao: 8,
    dsRua: 'Rua Bambino',
    dsBairro: 'Bairro Mamma Mia Rola',
    nrEndereco: 4301,
    idMunicipio: 3304557,
    idUF: 33,
    administrador,
  },
  {
    dsTitulo: 'Surubão de Noronha',
    dsEvento: 'Dedo no cu e gritaria',
    dhInicio: '2020-07-20',
    nrDuracao: 4,
    dsRua: 'Rua Ameixeira de Flor',
    dsBairro: 'Bairro Nossa Senhora Aparecida',
    nrEndereco: 2201,
    idMunicipio: 3304557,
    idUF: 33,
    administrador,
  },
  {
    dsTitulo: 'Surubão na Colombia',
    dsEvento: 'Comi o cu de quem ta lendo',
    dhInicio: '2020-07-22',
    nrDuracao: 8,
    dsRua: 'Rua Bambino',
    dsBairro: 'Bairro Mamma Mia Rola',
    nrEndereco: 4301,
    idMunicipio: 3304557,
    idUF: 33,
    administrador,
  },
  {
    dsTitulo: 'Surubão de Noronha',
    dsEvento: 'Dedo no cu e gritaria',
    dhInicio: '2020-07-20',
    nrDuracao: 4,
    dsRua: 'Rua Ameixeira de Flor',
    dsBairro: 'Bairro Nossa Senhora Aparecida',
    nrEndereco: 2201,
    idMunicipio: 3304557,
    idUF: 33,
    administrador,
  },
  {
    dsTitulo: 'Surubão na Colombia',
    dsEvento: 'Comi o cu de quem ta lendo',
    dhInicio: '2020-07-22',
    nrDuracao: 8,
    dsRua: 'Rua Bambino',
    dsBairro: 'Bairro Mamma Mia Rola',
    nrEndereco: 4301,
    idMunicipio: 3304557,
    idUF: 33,
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
  const eventoAPI = new EventoAPI();

  const classes = useStyles(props);
  const history = useHistory();

  const [eventoList, setEventoList] = useState<Evento[]>(fakeData);
  const [selected, setSelected] = useState<Evento | null>(null);
  const [dialogIsOpen, setDialogOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);

  useComponentDidMount(() => {
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
