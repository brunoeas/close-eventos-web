import React, { useState, useEffect, useRef, DragEvent, ChangeEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid } from '@material-ui/core';
import { useComponentDidMount } from '../../utils/hooks';
import Loading from '../../components/loading/loading';
import Swal from '../../components/swal/swal';
import LoadingSwal from '../../components/swal/loading-swal';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import Divider from '@material-ui/core/Divider';
import Estado from '../../models/estado';
import Municipio from '../../models/municipio';
import IBGELocalidadesApi from '../../resources/api/ibge-localidades';
import Card from '../../components/card/card';
import ButtonFABMenu from '../../components/buttonfabmenu/button-fab-menu';
import TextField from '../../components/textfield/text-field';
import Evento from '../../models/evento';
import TimePicker from '../../components/timepicker/time-picker';
import DatePicker from '../../components/datepicker/date-picker';
import AutoComplete from '../../components/autocomplete/autocomplete';
import { useStyles } from './evento.styles';
import EventoAPI from '../../resources/api/evento';
import Grow from '@material-ui/core/Grow';
import Tooltip from '@material-ui/core/Tooltip';
import UploadIcon from '@material-ui/icons/Publish';
import { fileToBase64 } from '../../utils';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Close';

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

/**
 * Tipo dos valores do formik
 */
export type EditarEventoFormikValuesType = {
  dsTitulo: string;
  dsEvento: string;
  dtInicio: moment.Moment | null;
  hrInicio: moment.Moment | null;
  nrDuracao: number | '';
  dsRua: string;
  dsBairro: string;
  nrEndereco: number | '';
  dsComplemento: string;
  dsLinkFoto: string | null;
  dsBase64Foto: string | null;
  estado: Estado | '';
  municipio: Municipio | '';
};

export type EditEventoPropTypes = {};

/**
 * Tela de cadastro e edição de Eventos
 *
 * @param {EditEventoPropTypes} props
 * @returns {JSX.Element}
 */
function EditEvento(props: EditEventoPropTypes): JSX.Element {
  const ibgeLocalidadesApi = new IBGELocalidadesApi();
  const eventoAPI = new EventoAPI();

  const classes = useStyles(props);
  const history = useHistory();
  const { id } = useParams();
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const [estados, setEstados] = useState<Estado[]>([]);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [enableReinitialize, setEnableReinitialize] = useState(false);
  const [initialValues, setInitialValues] = useState<EditarEventoFormikValuesType>({
    dsTitulo: '',
    dsEvento: '',
    dtInicio: null,
    hrInicio: null,
    nrDuracao: '',
    dsRua: '',
    dsBairro: '',
    nrEndereco: '',
    dsComplemento: '',
    dsLinkFoto: null,
    dsBase64Foto: null,
    estado: '',
    municipio: '',
  });

  const { values, errors, touched, handleBlur, handleSubmit, handleChange, setFieldValue } = useFormik<
    EditarEventoFormikValuesType
  >({
    validateOnBlur: true,
    validateOnChange: false,
    enableReinitialize,
    initialValues,
    validationSchema: Yup.lazy((values: any) =>
      Yup.object().shape({
        dsTitulo: Yup.string().required('Campo obrigatório'),
        dsEvento: Yup.string().required('Campo obrigatório'),
        dtInicio: Yup.object().required('Campo obrigatório'),
        hrInicio: Yup.object()
          .required('Campo obrigatório')
          .test(' ', ' ', function (value: moment.Moment | null) {
            if (!value || typeof value === 'string') return true;

            if (
              values.dtInicio &&
              values.dtInicio.format('DD/MM/YYYY') === moment().format('DD/MM/YYYY') &&
              value.isBefore(moment().add(10, 'minute'))
            ) {
              const { path, createError } = this;
              return createError({ path, message: 'O horário não pode ser anterior à agora' });
            }

            return true;
          }),
        nrDuracao: Yup.number().min(0.1, 'O valor mínimo é 0.10').required('Campo obrigatório'),
        dsRua: Yup.string().required('Campo obrigatório'),
        dsBairro: Yup.string().required('Campo obrigatório'),
        nrEndereco: Yup.number().min(0, 'O valor mínimo é 0').required('Campo obrigatório'),
        estado: Yup.object().required('Campo obrigatório'),
        municipio: Yup.object().required('Campo obrigatório'),
      })
    ),
    onSubmit: handleSubmitFormik,
  });

  useComponentDidMount(() => {
    ibgeLocalidadesApi
      .findAllUFs()
      .then((res) => setEstados(res.data))
      .finally(() => !id && setLoading(false));

    id && setEnableReinitialize(true);
  });

  useEffect(() => {
    if (!enableReinitialize) return;

    eventoAPI
      .findById(id)
      .then((resEvento) => {
        const evento = resEvento.data;

        return ibgeLocalidadesApi
          .findMunicipiosByUF(evento.idUF)
          .then((resMunicipios) => {
            const cidades = resMunicipios.data;

            setInitialValues({
              ...evento,
              dtInicio: moment(evento.dhInicio),
              hrInicio: moment(evento.dhInicio),
              dsLinkFoto: evento.dsLinkFoto ?? null,
              dsBase64Foto: null,
              estado: estados.find((uf) => uf.id === evento.idUF) ?? '',
              municipio: cidades.find((city) => city.id === evento.idMunicipio) ?? '',
              dsComplemento: evento.dsComplemento ?? '',
            });

            setEnableReinitialize(false);
            setMunicipios(cidades);
          })
          .finally(() => setLoading(false));
      })
      .catch((err) => {
        Swal({
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: 'Ok',
          title: 'Ocorreu um erro',
          text: 'Não foi possível carregar o evento para a edição, tente novamente',
          icon: 'error',
        });
      });

    // eslint-disable-next-line
  }, [enableReinitialize]);

  return (
    <>
      <Loading show={isLoading} />

      <Card
        head={id ? 'Editando evento' : 'Novo evento'}
        style={{ marginBottom: 15 }}
        contentContainerDivProps={{ style: { padding: 0 }, className: classes.containerScroll }}
      >
        <div style={{ padding: 30 }}>
          <Grid container style={{ height: 70 }}>
            <Grid item xs={4} style={{ paddingRight: 15 }}>
              <TextField
                label='Título'
                name='dsTitulo'
                value={values.dsTitulo}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.dsTitulo && errors.dsTitulo !== undefined}
                helperText={
                  touched.dsTitulo && errors.dsTitulo !== undefined ? `${errors.dsTitulo}` : ''
                }
                inputProps={{ maxLength: 100 }}
              />
            </Grid>

            <Grid item xs={2} style={{ paddingRight: 15 }}>
              <DatePicker
                label='Data do evento'
                name='dtInicio'
                value={values.dtInicio}
                minDate={moment()}
                minDateMessage='A data não pode ser anterior à hoje'
                onChange={(newDate) => setFieldValue('dtInicio', newDate)}
                onBlur={handleBlur}
                error={touched.dtInicio && errors.dtInicio !== undefined}
                errorText={`${errors.dtInicio}`}
              />
            </Grid>

            <Grid item xs={2} style={{ paddingRight: 15 }}>
              <TimePicker
                label='Horário'
                name='hrInicio'
                value={values.hrInicio}
                onChange={(newDate) => setFieldValue('hrInicio', newDate)}
                onBlur={handleBlur}
                error={touched.hrInicio && errors.hrInicio !== undefined}
                errorText={`${errors.hrInicio}`}
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                label='Duração (horas)'
                name='nrDuracao'
                type='number'
                value={values.nrDuracao}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.nrDuracao && errors.nrDuracao !== undefined}
                helperText={
                  touched.nrDuracao && errors.nrDuracao !== undefined ? `${errors.nrDuracao}` : ''
                }
                inputProps={{ min: 0.1, step: 0.1 }}
              />
            </Grid>
          </Grid>

          <Grid container style={{ minHeight: 70, marginBottom: 30 }}>
            <Grid item xs>
              <TextField
                label='Descrição'
                name='dsEvento'
                multiline
                rowsMax={3}
                value={values.dsEvento}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.dsEvento && errors.dsEvento !== undefined}
                helperText={
                  touched.dsEvento && errors.dsEvento !== undefined ? `${errors.dsEvento}` : ''
                }
              />
            </Grid>
          </Grid>

          <Separator>Localização</Separator>

          <Grid container style={{ height: 70 }}>
            <Grid item xs={4} style={{ paddingRight: 15 }}>
              <AutoComplete<Estado | ''>
                label='Estado'
                suggestions={estados}
                getLabel='nome'
                getValue='id'
                name='estado'
                value={values.estado || undefined}
                onChangeValue={handleChangeEstado}
                onBlur={handleBlur}
                error={touched.estado && errors.estado !== undefined}
                errorText={`${errors.estado}`}
              />
            </Grid>

            <Grid item xs={4} style={{ paddingRight: 15 }}>
              <AutoComplete<Municipio | ''>
                label='Município'
                suggestions={municipios}
                getLabel='nome'
                getValue='id'
                name='municipio'
                value={values.municipio || undefined}
                onChangeValue={(newValue) => setFieldValue('municipio', newValue)}
                onBlur={handleBlur}
                error={touched.municipio && errors.municipio !== undefined}
                errorText={`${errors.municipio}`}
              />
            </Grid>
          </Grid>

          <Grid container style={{ height: 70 }}>
            <Grid item xs={4} style={{ paddingRight: 15 }}>
              <TextField
                label='Rua'
                name='dsRua'
                value={values.dsRua}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.dsRua && errors.dsRua !== undefined}
                helperText={touched.dsRua && errors.dsRua !== undefined ? `${errors.dsRua}` : ''}
                inputProps={{ maxLength: 100 }}
              />
            </Grid>

            <Grid item xs={4} style={{ paddingRight: 15 }}>
              <TextField
                label='Bairro'
                name='dsBairro'
                value={values.dsBairro}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.dsBairro && errors.dsBairro !== undefined}
                helperText={
                  touched.dsBairro && errors.dsBairro !== undefined ? `${errors.dsBairro}` : ''
                }
                inputProps={{ maxLength: 100 }}
              />
            </Grid>

            <Grid item xs={1}>
              <TextField
                label='Número'
                name='nrEndereco'
                type='number'
                value={values.nrEndereco}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.nrEndereco && errors.nrEndereco !== undefined}
                helperText={
                  touched.nrEndereco && errors.nrEndereco !== undefined ? `${errors.nrEndereco}` : ''
                }
                inputProps={{ min: 0, step: 1 }}
              />
            </Grid>
          </Grid>

          <Grid container style={{ minHeight: 70, marginBottom: 30 }}>
            <Grid item xs>
              <TextField
                label='Complemento'
                name='dsComplemento'
                multiline
                rowsMax={2}
                value={values.dsComplemento}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.dsComplemento && errors.dsComplemento !== undefined}
                helperText={
                  touched.dsComplemento && errors.dsComplemento !== undefined
                    ? `${errors.dsComplemento}`
                    : ''
                }
                inputProps={{ maxLength: 200 }}
              />
            </Grid>
          </Grid>

          <Separator>Imagem</Separator>

          <input
            accept='image/*'
            className={classes.inputFile}
            multiple={false}
            type='file'
            ref={(ref) => (inputFileRef.current = ref)}
            onChange={(e) => handleSelectFile(e, e.target.files)}
          />

          <div className={classes.containerInputImg}>
            {(values.dsBase64Foto || values.dsLinkFoto) && (
              <Tooltip title='Remover imagem'>
                <IconButton
                  className={classes.buttonRemoveImg}
                  onClick={() => {
                    setFieldValue('dsBase64Foto', null);
                    setFieldValue('dsLinkFoto', null);
                  }}
                >
                  <RemoveIcon />
                </IconButton>
              </Tooltip>
            )}

            <Tooltip
              title='Clique para escolher uma imagem'
              onClick={() => inputFileRef.current?.click()}
            >
              {values.dsLinkFoto || values.dsBase64Foto ? (
                <Grow in>
                  <div style={{ width: '100%' }}>
                    <div
                      className={classes.divImg}
                      style={{ backgroundImage: `url(${values.dsLinkFoto || values.dsBase64Foto})` }}
                    />
                  </div>
                </Grow>
              ) : (
                <div className={classes.divAddImg}>
                  <UploadIcon fontSize='inherit' />
                </div>
              )}
            </Tooltip>
          </div>
        </div>
      </Card>

      <ButtonFABMenu
        disabled={isLoading}
        primaryAction={{ onClick: (e: any) => handleSubmit(e) }}
        secondaryAction={{ onClick: () => history.push('/') }}
      />
    </>
  );

  /**
   * Manipula o evento de submit do Formik
   *
   * @param {EditarEventoFormikValuesType} values - Valores do submit
   * @param {FormikHelpers<EditarEventoFormikValuesType>} formikHelpers - Auxiliares
   */
  function handleSubmitFormik(values: EditarEventoFormikValuesType) {
    LoadingSwal({ text: 'Carregando' });
    const {
      dtInicio,
      hrInicio,
      municipio,
      estado,
      nrDuracao,
      nrEndereco,
      dsLinkFoto,
      dsBase64Foto,
    } = values;

    if (!dtInicio || !hrInicio || !municipio || !estado || !nrDuracao || !nrEndereco) return;

    const evento: Evento = {
      ...values,
      idEvento: +id || undefined,
      dhInicio: dtInicio
        .hour(hrInicio.get('hour'))
        .minute(hrInicio.get('minute'))
        .format('YYYY-MM-DDTHH:mm:ssZZ'),
      idMunicipio: municipio.id,
      idUF: estado.id,
      dsLinkFoto: dsLinkFoto || undefined,
      dsBase64Foto: dsBase64Foto || undefined,
      nrDuracao,
      nrEndereco,
      administrador: {
        nmUsuario: '',
        nrTelefone: '',
        dtNascimento: '',
        tpSexo: 1,
        dsEmail: '',
        dsSenha: '',
      },
    };

    let promiseContext;
    if (id) {
      promiseContext = eventoAPI.update(evento);
    } else {
      promiseContext = eventoAPI.save(evento);
    }

    promiseContext
      .then(() => {
        Swal({
          showConfirmButton: true,
          title: 'Sucesso',
          text: id ? 'Evento atualizado com sucesso' : 'Evento criado com sucesso',
          icon: 'success',
        });

        history.push('/');
      })
      .catch((err) => {
        Swal({
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: 'Ok',
          title: 'Ocorreu um erro',
          text: 'Não foi possível salvar o evento, tente novamente',
          icon: 'error',
        });
      });
  }

  /**
   * Manipula o evento de mudança de valor do campo do Estado
   *
   * @param {(Estado | '' | null)} newValue - Novo valor selecionado
   */
  function handleChangeEstado(newValue: Estado | '' | null) {
    setFieldValue('estado', newValue);

    if (newValue) {
      setLoading(true);

      ibgeLocalidadesApi
        .findMunicipiosByUF(newValue.id)
        .then((res) => setMunicipios(res.data))
        .catch((err) => setMunicipios([]))
        .finally(() => setLoading(false));
    }
  }

  /**
   * Manipula o evento de seleção de um arquivo
   *
   * @param {(DragEvent<HTMLDivElement> | ChangeEvent<HTMLInputElement>)} e
   * @param {(FileList | null)} fileList - Arquivos selecionados
   */
  async function handleSelectFile(
    e: DragEvent<HTMLDivElement> | ChangeEvent<HTMLInputElement>,
    fileList: FileList | null
  ) {
    if (!fileList || fileList.length === 0) return;
    e.preventDefault();

    const file = Array.from(fileList)[0];

    if (file.size > 10000000) {
      Swal({
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: 'Ok',
        title: 'Imagem inválida',
        text: 'A imagem deve ter no máximo 10MB',
        icon: 'error',
      });
      return;
    }

    fileToBase64(file)
      .then((base64) => setFieldValue('dsBase64Foto', base64))
      .catch((err) => {
        Swal({
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: 'Ok',
          title: 'Ocorreu um erro',
          text: 'Não foi possivel fazer o Upload da imagem, tente novamente',
          icon: 'error',
        });
        setFieldValue('dsBase64Foto', null);
      })
      .finally(() => setFieldValue('dsLinkFoto', null));
  }
}

export default EditEvento;
