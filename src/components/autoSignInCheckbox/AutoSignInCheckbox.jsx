import React from 'react';
import styles from './AutoSignInCheckbox.module.scss';
import Checkbox from '../checkbox/Checkbox';
import Tooltip from '../tooltip/Tooltip';

const AutoSignInCheckbox = ({
  label = '자동 로그인',
  checked,
  disabled,
  orientation = 'top',
  message = '개인 정보 보호를 위해 본인 기기에서만 이용해주세요.',
  onChange,
  ...restProps
}) => {
  return (
    <span className={styles.formControl}>
      <Checkbox
        label={label}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        {...restProps}
      />
      {checked && <Tooltip />}
    </span>
  );
};

export default AutoSignInCheckbox;
