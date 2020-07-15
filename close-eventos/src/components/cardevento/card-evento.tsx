import React from 'react';
import { useStyles } from './card-evento.styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Evento from '../../models/evento';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EyeIcon from '@material-ui/icons/Visibility';
// import CheckIcon from '@material-ui/icons/Done';
// import CheckedIcon from '@material-ui/icons/PlaylistAddCheck';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';

const defaultMedia = require('../../assets/images/default-event-media.jpg');

export type CardEventoPropTypes = { evento: Evento };

function CardEvento(props: CardEventoPropTypes): JSX.Element {
  const { evento } = props;
  const classes = useStyles(props);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar color='#262e39'>M</Avatar>}
        title={evento.dsTitulo}
        subheader={evento.administrador.nmUsuario}
        titleTypographyProps={{ style: { fontWeight: 'bold', fontSize: '0.95rem' } }}
      />

      <CardMedia className={classes.media} image={evento.dsLinkFoto ?? defaultMedia} />

      <CardContent className={classes.cardContent}>
        <Typography variant='body2' color='textSecondary' component='p'>
          {evento.dsEvento}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <Grid container>
          <Grid item xs={10} className={classes.textStatus}>
            <div>
              Status de presença:
              <div style={{ fontWeight: 'bold', display: 'inline' }}> Não confirmado</div>
            </div>
          </Grid>

          <Grid item xs={2} className={classes.containerViewEventButton}>
            <Tooltip title='Visualizar detalhes do evento'>
              <IconButton>
                <EyeIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}

export default CardEvento;
