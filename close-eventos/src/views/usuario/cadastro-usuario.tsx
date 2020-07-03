import React, { useState } from 'react';
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
    },
    validationSchema: Yup.lazy<any>((values: CadastroUsuarioFormikValuesType) =>
      Yup.object().shape({
        dsEmail: Yup.string().email('E-mail inválido').required('Campo obrigatório'),
        dsSenha: Yup.string().required('Campo obrigatório'),
        nmUsuario: Yup.string().required('Campo obrigatório'),
        nrTelefone: Yup.string().required('Campo obrigatório'),
        dtNascimento: Yup.date().required('Campo obrigatório'),
        tpSexo: Yup.number().required('Campo obrigatório'),
        dsConfirmarSenha: Yup.string()
          .equals([values.dsSenha], 'As senhas não coincidem')
          .required('Campo obrigatório'),
      })
    ),
    onSubmit: handleSubmitFormik,
  });

  return (
    <BaseLogin size={8} head='Novo usuário'>
      <Grid container style={{ height: 70 }}>
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
        <Grid item xs />

        <Grid item xs={4} className={classes.containerButtons}>
          <Button
            onClick={(e: any) => history.push('/login')}
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
   * @param {FormikHelpers<CadastroUsuarioFormikValuesType>} formikHelpers - Auxiliares
   */
  function handleSubmitFormik(
    values: CadastroUsuarioFormikValuesType,
    formikHelpers: FormikHelpers<CadastroUsuarioFormikValuesType>
  ) {}
}

export default CadastroUsuario;
