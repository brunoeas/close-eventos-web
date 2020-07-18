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
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Create';
import { useHistory } from 'react-router-dom';

const defaultMedia = require('../../assets/images/default-event-media.jpg');

export type CardEventoPropTypes = {
  evento: Evento;
  onClickView: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

/**
 * Card para os detalhes básicos de um evento
 *
 * @param {CardEventoPropTypes} props
 * @returns {JSX.Element}
 */
function CardEvento(props: CardEventoPropTypes): JSX.Element {
  const { evento, onClickView } = props;
  const classes = useStyles(props);
  const history = useHistory();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          evento.administrador.dsLinkFoto ? (
            <Avatar src={evento.administrador.dsLinkFoto} alt={evento.administrador.nmUsuario} />
          ) : (
            <Avatar>{evento.administrador.nmUsuario.substr(0, 1).toUpperCase()}</Avatar>
          )
        }
        title={evento.dsTitulo}
        subheader={evento.administrador.nmUsuario}
        titleTypographyProps={{ className: classes.titleCard, noWrap: true }}
        subheaderTypographyProps={{ className: classes.subtitleCard, noWrap: true }}
      />

      <CardMedia className={classes.media} image={evento.dsLinkFoto ?? defaultMedia} />

      <CardContent className={classes.cardContent}>
        <Typography
          variant='body2'
          color='textSecondary'
          component='p'
          style={{ height: 50, overflowY: 'hidden', textOverflow: 'ellipsis' }}
        >
          {evento.dsEvento}
        </Typography>
      </CardContent>

      <CardActions disableSpacing className={classes.cardActions}>
        <Grid container>
          <Grid item xs={10} className={classes.textStatus}>
            <Tooltip title='Visualizar detalhes do evento'>
              <IconButton onClick={onClickView}>
                <EyeIcon />
              </IconButton>
            </Tooltip>
          </Grid>

          <Grid item xs={2} className={classes.containerViewEventButton}>
            <Tooltip title='Editar evento'>
              <IconButton onClick={() => history.push(`/evento/edit/${evento.idEvento}`)}>
                <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title='Excluir evento'>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}

export default CardEvento;
