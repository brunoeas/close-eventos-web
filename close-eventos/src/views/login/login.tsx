import React, { useState } from 'react';
import BaseLogin from '../../components/baselogin/base-login';
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import TextField from '../../components/textfield/text-field';
import Grid, { GridProps } from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useStyles } from './login.styles';
import Link from '@material-ui/core/Link';
import InputAdornment from '@material-ui/core/InputAdornment';
import PasswordVisibleIcon from '@material-ui/icons/Visibility';
import PasswordNotVisibleIcon from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

/**
 * Uma linha flexivel
 *
 * @param {GridProps} props
 * @returns {JSX.Element}
 */
function Row(props: GridProps): JSX.Element {
  return (
    <Grid container style={{ height: 70 }}>
      <Grid item xs {...props} />
    </Grid>
  );
}

/**
 * Tipo dos valores do formik
 */
export type LoginFormikValuesType = {
  dsEmail: string;
  dsSenha: string;
};

export type LoginPropTypes = {};

/**
 * Tela de login
 *
 * @param {LoginPropTypes} props
 * @returns {JSX.Element}
 */
function Login(props: LoginPropTypes): JSX.Element {
  const classes = useStyles(props);
  const history = useHistory();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const { values, errors, touched, handleBlur, handleSubmit, handleChange } = useFormik<
    LoginFormikValuesType
  >({
    validateOnBlur: true,
    validateOnChange: false,
    initialValues: {
      dsEmail: '',
      dsSenha: '',
    },
    validationSchema: Yup.object().shape({
      dsEmail: Yup.string().email('E-mail inválido').required('Campo obrigatório'),
      dsSenha: Yup.string().required('Campo obrigatório'),
    }),
    onSubmit: handleSubmitFormik,
  });

  return (
    <BaseLogin>
      <Row>
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
      </Row>

      <Row>
        <TextField
          label='Senha'
          name='dsSenha'
          type={passwordVisible ? 'text' : 'password'}
          value={values.dsSenha}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.dsSenha && errors.dsSenha !== undefined}
          helperText={touched.dsSenha && errors.dsSenha !== undefined ? `${errors.dsSenha}` : ''}
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
      </Row>

      <Grid container>
        <Grid item xs style={{ textAlign: 'right' }}>
          <Link
            onClick={() => history.push('/cadastro-usuario')}
            color='primary'
            component='button'
            variant='body2'
          >
            Não possui uma conta?
          </Link>
        </Grid>
      </Grid>

      <div className={classes.containerButtonLogin}>
        <Button
          onClick={(e: any) => handleSubmit(e)}
          size='large'
          variant='contained'
          color='primary'
          className={classes.buttonLogin}
        >
          Entrar
        </Button>
      </div>
    </BaseLogin>
  );

  /**
   * Manipula o evento de submit do Formik
   *
   * @param {LoginFormikValuesType} values - Valores do submit
   * @param {FormikHelpers<LoginFormikValuesType>} formikHelpers - Auxiliares
   */
  function handleSubmitFormik(
    values: LoginFormikValuesType,
    formikHelpers: FormikHelpers<LoginFormikValuesType>
  ) {}
}

export default Login;