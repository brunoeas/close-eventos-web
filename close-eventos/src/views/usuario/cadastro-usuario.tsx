import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import BaseLogin from '../../components/baselogin/base-login';
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import TextField from '../../components/textfield/text-field';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useStyles } from './usuario.styles';
import moment from 'moment';
import MaskedTextField, { MaskTypeEnum } from '../../components/maskedtextfield/masked-text-field';
import TipoSexoEnum from '../../enumerations/tipo-sexo-enum';
import DatePicker from '../../components/datepicker/date-picker';
import Select from '../../components/select/select';
import InputAdornment from '@material-ui/core/InputAdornment';
import PasswordVisibleIcon from '@material-ui/icons/Visibility';
import PasswordNotVisibleIcon from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import { fileToBase64 } from '../../utils';
import LoadingSwal from '../../components/swal/loading-swal';
import Swal from '../../components/swal/swal';
import UsuarioAPI from '../../resources/api/usuario';
import Usuario from '../../models/usuario';
import Authentication from '../../resources';
import ExceptionEnum from '../../resources/exception-enum';

/**
 * Tipo dos valores do formik
 */
export type CadastroUsuarioFormikValuesType = {
  nmUsuario: string;
  nrTelefone: string;
  dtNascimento: moment.Moment | '';
  tpSexo: TipoSexoEnum;
  dsEmail: string;
  dsSenha: string;
  dsConfirmarSenha: string;
  dsBase64Foto: string | undefined;
};

export type CadastroUsuarioPropTypes = {};

/**
 * Tela de cadastro de um novo usuário
 *
 * @param {CadastroUsuarioPropTypes} props
 * @returns {JSX.Element}
 */
function CadastroUsuario(props: CadastroUsuarioPropTypes): JSX.Element {
  const classes = useStyles(props);
  const history = useHistory();
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const { values, errors, touched, handleBlur, handleSubmit, handleChange, setFieldValue } = useFormik<
    CadastroUsuarioFormikValuesType
  >({
    validateOnBlur: true,
    validateOnChange: false,
    initialValues: {
      nmUsuario: '',
      nrTelefone: '',
      dtNascimento: '',
      tpSexo: TipoSexoEnum.MASCULINO,
      dsEmail: '',
      dsSenha: '',
      dsConfirmarSenha: '',
      dsBase64Foto: undefined,
    },
    validationSchema: Yup.lazy<any>((values: CadastroUsuarioFormikValuesType) =>
      Yup.object().shape({
        dsEmail: Yup.string()
          .max(150, 'O e-mail deve ter no máximo 150 caracteres')
          .email('E-mail inválido')
          .required('Campo obrigatório'),
        dsSenha: Yup.string()
          .min(5, 'A senha deve ter no mínimo 5 caracteres')
          .max(50, 'A senha deve ter no máximo 50 caracteres')
          .required('Campo obrigatório'),
        dsConfirmarSenha: Yup.string()
          .min(5, 'A senha deve ter no mínimo 5 caracteres')
          .max(50, 'A senha deve ter no máximo 50 caracteres')
          .equals([values.dsSenha], 'As senhas não coincidem')
          .required('Campo obrigatório'),
        nmUsuario: Yup.string().required('Campo obrigatório'),
        nrTelefone: Yup.string().required('Campo obrigatório'),
        dtNascimento: Yup.date().required('Campo obrigatório'),
        tpSexo: Yup.number().required('Campo obrigatório'),
      })
    ),
    onSubmit: handleSubmitFormik,
  });

  const styleAvatar: any = {
    height: 100,
    width: 100,
    fontWeight: 'bold',
    fontSize: '2rem',
    cursor: 'pointer',
  };

  return (
    <BaseLogin size={8} head='Novo usuário'>
      <input
        accept='image/*'
        className={classes.inputFile}
        multiple={false}
        type='file'
        ref={(ref) => (inputFileRef.current = ref)}
        onChange={(e) => handleSelectFile(e, e.target.files)}
      />

      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ position: 'absolute', top: -80 }}>
          <Tooltip title='Clique para escolher uma imagem' onClick={() => inputFileRef.current?.click()}>
            {values.dsBase64Foto ? (
              <Avatar style={styleAvatar} alt={values.nmUsuario} src={values.dsBase64Foto} />
            ) : (
              <Avatar style={styleAvatar}>
                {values.nmUsuario ? values.nmUsuario.substr(0, 1).toUpperCase() : 'U'}
              </Avatar>
            )}
          </Tooltip>
        </div>
      </div>

      <Grid container style={{ height: 70, marginTop: 30 }}>
        <Grid item xs={6} style={{ paddingRight: 15 }}>
          <TextField
            label='Nome'
            name='nmUsuario'
            value={values.nmUsuario}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.nmUsuario && errors.nmUsuario !== undefined}
            helperText={touched.nmUsuario && errors.nmUsuario !== undefined ? `${errors.nmUsuario}` : ''}
          />
        </Grid>

        <Grid item lg={3} md={4} style={{ paddingRight: 15 }}>
          <MaskedTextField
            typeMask={MaskTypeEnum.TELEPHONE}
            label='Telefone'
            name='nrTelefone'
            value={values.nrTelefone}
            onChangeValue={(value) => setFieldValue('nrTelefone', value)}
            onBlur={handleBlur}
            error={touched.nrTelefone && errors.nrTelefone !== undefined}
            helperText={
              touched.nrTelefone && errors.nrTelefone !== undefined ? `${errors.nrTelefone}` : ''
            }
          />
        </Grid>
      </Grid>

      <Grid container style={{ height: 70 }}>
        <Grid item xs={6} style={{ paddingRight: 15 }}>
          <TextField
            label='E-mail'
            name='dsEmail'
            type='email'
            value={values.dsEmail}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.dsEmail && errors.dsEmail !== undefined}
            helperText={touched.dsEmail && errors.dsEmail !== undefined ? `${errors.dsEmail}` : ''}
          />
        </Grid>

        <Grid item lg={3} md={4} style={{ paddingRight: 15 }}>
          <DatePicker
            label='Data de nascimento'
            name='dtNascimento'
            value={values.dtNascimento || null}
            maxDate={moment()}
            onChange={(value) => setFieldValue('dtNascimento', value)}
            onBlur={handleBlur}
            error={touched.dtNascimento && errors.dtNascimento !== undefined}
            errorText={`${errors.dtNascimento}`}
          />
        </Grid>

        <Grid item xs={2}>
          <Select<TipoSexoEnum>
            label='Sexo'
            options={[TipoSexoEnum.MASCULINO, TipoSexoEnum.FEMININO]}
            value={values.tpSexo}
            getOptionLabel={(opt) => (opt === TipoSexoEnum.MASCULINO ? 'Masculino' : 'Feminino')}
            getOptionValue=''
            onChangeValue={(value) => setFieldValue('tpSexo', value)}
            onBlur={handleBlur}
            error={touched.tpSexo && errors.tpSexo !== undefined}
            errorText={`${errors.tpSexo}`}
          />
        </Grid>
      </Grid>

      <Grid container style={{ height: 70 }}>
        <Grid item xs={6} style={{ paddingRight: 15 }}>
          <TextField
            label='Senha'
            name='dsSenha'
            value={values.dsSenha}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.dsSenha && errors.dsSenha !== undefined}
            helperText={touched.dsSenha && errors.dsSenha !== undefined ? `${errors.dsSenha}` : ''}
            type={passwordVisible ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={() => setPasswordVisible(!passwordVisible)}>
                    {passwordVisible ? <PasswordVisibleIcon /> : <PasswordNotVisibleIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label='Confirmar senha'
            name='dsConfirmarSenha'
            value={values.dsConfirmarSenha}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.dsConfirmarSenha && errors.dsConfirmarSenha !== undefined}
            helperText={
              touched.dsConfirmarSenha && errors.dsConfirmarSenha !== undefined
                ? `${errors.dsConfirmarSenha}`
                : ''
            }
            type={confirmPasswordVisible ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                    {confirmPasswordVisible ? <PasswordVisibleIcon /> : <PasswordNotVisibleIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs className={classes.containerButtons}>
          {values.dsBase64Foto && (
            <Button
              onClick={() => setFieldValue('dsBase64Foto', undefined)}
              variant='contained'
              className={classes.buttonRemoveImg}
              color='inherit'
            >
              Remover imagem
            </Button>
          )}

          <Button
            onClick={() => history.push('/login')}
            variant='contained'
            className={classes.buttonCancelar}
            color='inherit'
          >
            Voltar
          </Button>

          <Button onClick={(e: any) => handleSubmit(e)} variant='contained' color='primary'>
            Salvar
          </Button>
        </Grid>
      </Grid>
    </BaseLogin>
  );

  /**
   * Manipula o evento de submit do Formik
   *
   * @param {CadastroUsuarioFormikValuesType} values - Valores do submit
   */
  function handleSubmitFormik(values: CadastroUsuarioFormikValuesType) {
    const { dtNascimento, dsBase64Foto, dsEmail, dsSenha } = values;
    if (!dtNascimento) return;

    LoadingSwal({ text: 'Carregando' });

    const usuarioAPI = new UsuarioAPI();

    const usuario: Usuario = {
      ...values,
      dtNascimento: dtNascimento.format('YYYY-MM-DD'),
      dsBase64Foto,
    };

    usuarioAPI
      .save(usuario)
      .then(() => {
        Swal({
          showConfirmButton: true,
          title: 'Sucesso',
          text: 'Usuário criado com sucesso',
          icon: 'success',
        });
        Authentication.setToken({ dsEmail, dsSenha });
        history.push('/');
      })
      .catch((err) => {
        if (err.response?.data.codigo === ExceptionEnum.EMAIL_DUPLICADO) {
          Swal({
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: 'Ok',
            title: 'Falha no cadastro do usuário',
            text: 'Este E-mail ja está cadastrado',
            icon: 'error',
          });
          return;
        }

        Swal({
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: 'Ok',
          title: 'Ocorreu um erro',
          text: 'Ocorreu um erro desconhecido, tente novamente',
          icon: 'error',
        });
      });
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
      });
  }
}

export default CadastroUsuario;
