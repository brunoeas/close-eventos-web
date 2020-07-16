import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions, { DialogActionsProps } from '@material-ui/core/DialogActions';
import DialogContent, { DialogContentProps } from '@material-ui/core/DialogContent';
import DialogTitle, { DialogTitleProps } from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import Evento from '../../models/evento';
import { useStyles } from './dialog.styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import Divider from '@material-ui/core/Divider';
import { useComponentDidMount } from '../../utils/hooks';
import IBGELocalidadesApi from '../../resources/api/ibge-localidades';
import Municipio from '../../models/municipio';
import Estado from '../../models/estado';
import Loading from '../../components/loading/loading';

const defaultMedia = require('../../assets/images/default-event-media.jpg');

const Transition = React.forwardRef(function (
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

function Separator(props: { children: any }) {
  return (
    <>
      <Typography
        variant='body1'
        color='primary'
        component='p'
        style={{ fontWeight: 'bold', fontSize: '1.1rem' }}
      >
        {props.children}
      </Typography>

      <Divider style={{ marginBottom: 15 }} />
    </>
  );
}

export type DialogEventoPropTypes = {
  open: boolean;
  evento: Evento;
  onCloseDialog: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
  DialogProps?: DialogProps;
  DialogTitleProps?: DialogTitleProps;
  DialogContentProps?: DialogContentProps;
  DialogActionsProps?: DialogActionsProps;
};

function DialogEvento(props: DialogEventoPropTypes): JSX.Element {
  const classes = useStyles(props);
  const {
    open,
    evento,
    onCloseDialog,
    DialogProps,
    DialogTitleProps,
    DialogContentProps,
    DialogActionsProps,
  } = props;

  const [municipio, serMunicipio] = useState<Municipio | null>(null);
  const [estado, setEstado] = useState<Estado | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  useComponentDidMount(() => {
    const ibgeLocalidadesApi = new IBGELocalidadesApi();

    const promiseMunicipio = ibgeLocalidadesApi
      .findMunicipioById(evento.idMunicipio)
      .then((res) => serMunicipio(res.data));

    const promiseEstado = ibgeLocalidadesApi
      .findEstadoById(evento.idUF)
      .then((res) => setEstado(res.data));

    Promise.all([promiseMunicipio, promiseEstado]).finally(() => setLoading(false));
  });

  const commonTypographyProps: any = {
    variant: 'body1',
    color: 'primary',
    component: 'p',
    style: { display: 'inline' },
  };

  return (
    <>
      <Loading show={isLoading} />

      <Dialog
        TransitionComponent={Transition}
        keepMounted
        color='secondary'
        {...DialogProps}
        onClose={onCloseDialog}
        PaperProps={{ className: classes.dialog }}
        open={open}
      >
        <DialogTitle
          {...DialogTitleProps}
          className={classes.dialogHeader}
          style={{ backgroundImage: `url(${evento.dsLinkFoto ?? defaultMedia})` }}
          disableTypography
        >
          <div className={classes.dialogTitleContainer}>
            <div className={classes.dialogTitle}>Detalhes do evento</div>
          </div>
        </DialogTitle>

        <DialogContent {...DialogContentProps} className={classes.dialogContent}>
          <Grid container style={{ marginBottom: 15 }}>
            <Grid item xs>
              <Typography
                variant='body1'
                color='primary'
                component='p'
                style={{ fontWeight: 'bold', fontSize: '1.1rem' }}
              >
                {evento.dsTitulo}
              </Typography>

              <Typography
                variant='body2'
                color='textSecondary'
                component='p'
                className={classes.descricao}
              >
                {evento.dsEvento}
              </Typography>
            </Grid>
          </Grid>

          <Grid container style={{ marginBottom: 30 }}>
            <Grid item xs={4}>
              Início:
              <Typography {...commonTypographyProps}>
                {moment(evento.dhInicio).format(' DD/MM/YYYY HH:mm')}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              Fim:
              <Typography {...commonTypographyProps}>
                {moment(evento.dhInicio).add(evento.nrDuracao, 'hour').format(' DD/MM/YYYY HH:mm')}
              </Typography>
            </Grid>
          </Grid>

          <Separator>Localização</Separator>

          <Grid container style={{ marginBottom: 15 }}>
            <Grid item xs={4} style={{ paddingRight: 15 }}>
              Rua:
              <Typography {...commonTypographyProps}>{` ${evento.dsRua}`}</Typography>
            </Grid>

            <Grid item xs={5} style={{ paddingRight: 15 }}>
              Bairro:
              <Typography {...commonTypographyProps}>{` ${evento.dsBairro}`}</Typography>
            </Grid>

            <Grid item xs={2}>
              Número:
              <Typography {...commonTypographyProps}>{` ${evento.nrEndereco}`}</Typography>
            </Grid>
          </Grid>

          <Grid container style={{ marginBottom: 15 }}>
            <Grid item xs>
              Complemento:
              <Typography {...commonTypographyProps}>{` ${evento.dsComplemento ?? ''}`}</Typography>
            </Grid>
          </Grid>

          <Grid container style={{ marginBottom: 30 }}>
            <Grid item xs={4} style={{ paddingRight: 15 }}>
              Município:
              <Typography {...commonTypographyProps}>{` ${municipio?.nome ?? ''}`}</Typography>
            </Grid>

            <Grid item xs={4}>
              Estado:
              <Typography {...commonTypographyProps}>{` ${estado?.nome ?? ''}`}</Typography>
            </Grid>
          </Grid>

          <Separator>Contato do administrador</Separator>

          <Grid container style={{ marginBottom: 15 }}>
            <Grid item xs={4} style={{ paddingRight: 15 }}>
              Nome:
              <Typography {...commonTypographyProps}>{` ${evento.administrador.nmUsuario}`}</Typography>
            </Grid>

            <Grid item xs>
              Telefone:
              <Typography {...commonTypographyProps}>{` ${evento.administrador.nrTelefone}`}</Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs>
              E-mail:
              <Typography {...commonTypographyProps}>{` ${evento.administrador.dsEmail}`}</Typography>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions {...DialogActionsProps}>
          <Button color='primary'>Disagree</Button>
          <Button color='primary'>Agree</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DialogEvento;
