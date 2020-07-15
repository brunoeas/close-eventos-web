import TipoSexoEnum from '../enumerations/tipo-sexo-enum';

interface Usuario {
  idUsuario?: number;

  nmUsuario: string;

  nrTelefone: string;
  dtNascimento: string;
  tpSexo: TipoSexoEnum;
  dsEmail: string;
}

export default Usuario;
