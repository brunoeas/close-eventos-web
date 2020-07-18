import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import SpeedDial, { SpeedDialProps } from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction, { SpeedDialActionProps } from '@material-ui/lab/SpeedDialAction';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { useStyles } from './fab-menu.styles';
import { OverrideProps } from '@material-ui/core/OverridableComponent';
import { FabTypeMap, SvgIconProps } from '@material-ui/core';

/**
 * Modelo de uma Action do componente ButtonFABMenu
 */
export interface ButtonFABMenuAction extends SpeedDialActionProps {
  className?: string;
  tooltipLabel?: string;
  icon?: JSX.Element;
  iconProps?: SvgIconProps;
  disabled?: boolean;
  /**
   * Padrão: true
   */
  show?: boolean;
  FabButtonProps?: Partial<OverrideProps<FabTypeMap<{}, 'button'>, 'button'>>;
}

export type ButtonFABMenuPropType = {
  SpeedDialProps?: SpeedDialProps;
  primaryAction?: ButtonFABMenuAction;
  secondaryAction?: ButtonFABMenuAction;
  additionalActions?: ButtonFABMenuAction[];
  disabled?: boolean;
  FabButtonProps?: Partial<OverrideProps<FabTypeMap<{}, 'button'>, 'button'>>;
};

/**
 * Componente para um Botão FAB com um menu
 *
 * @param {ButtonFABMenuPropType} props
 */
function ButtonFABMenu(props: ButtonFABMenuPropType): JSX.Element {
  const {
    primaryAction = {},
    secondaryAction = {},
    additionalActions = [],
    disabled = false,
    FabButtonProps = {},
    SpeedDialProps = {},
  } = props;

  const classes = useStyles(props);

  const [isOpen, setIsOpen] = useState(false);

  const actions: ButtonFABMenuAction[] = [
    {
      icon: <CheckIcon color='primary' {...primaryAction.iconProps} />,
      tooltipLabel: 'Salvar',
      disabled: false,
      ...primaryAction,
    },
    {
      icon: <CloseIcon color='primary' {...secondaryAction.iconProps} />,
      tooltipLabel: 'Cancelar',
      disabled: false,
      ...secondaryAction,
    },
    ...additionalActions,
  ].filter((action) => action.show === undefined || action.show);

  const component = (
    <SpeedDial
      className={classes.fab}
      icon={
        <SpeedDialIcon icon={<MoreVertIcon />} openIcon={<AddIcon />} style={{ cursor: 'pointer' }} />
      }
      onClose={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      open={isOpen}
      ariaLabel=' '
      direction='up'
      color='primary'
      {...SpeedDialProps}
      FabProps={{ disabled, ...FabButtonProps, style: { cursor: 'pointer', ...FabButtonProps.style } }}
    >
      {actions.map((action, i) => {
        const {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          iconProps,
          tooltipLabel,
          onClick,
          disabled,
          FabButtonProps = {},
          ...othersActionProps
        } = action;

        return (
          <SpeedDialAction
            key={i}
            tooltipTitle={disabled ? undefined : tooltipLabel}
            disableFocusListener={disabled}
            disableHoverListener={disabled}
            disableTouchListener={disabled}
            {...othersActionProps}
            style={{ cursor: 'pointer', ...othersActionProps.style }}
            onClick={(e) => {
              if (!disabled) {
                setIsOpen(!isOpen);
                onClick && onClick(e);
              }
            }}
            FabProps={{ disabled, ...FabButtonProps }}
          />
        );
      })}
    </SpeedDial>
  );

  return ReactDOM.createPortal(
    component,
    document.getElementById('root') || document.createElement('div')
  );
}

export default ButtonFABMenu;
