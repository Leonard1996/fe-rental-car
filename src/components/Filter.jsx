import { colors } from '../themes/base-theme';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

export default function Filter({ label, callback, showIcon = true, customStyles, id, isDirty }) {
  const handleClick = () => {
    callback(id);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        borderRadius: '0.75rem',
        border: `1px solid ${colors.lightGrey}`,
        padding: '.465rem 1rem',
        color: colors.mainBlack,
        fontWeight: '600',
        fontSize: '0.75rem',
        backgroundColor: colors.almostWhiteGrey,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        position: 'relative',
        ...(customStyles?.wrapper ?? {})
      }}
    >
      <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ...(customStyles?.container ?? {}) }}
      >
        <div style={{ display: 'flex', ...(customStyles?.label ?? {}) }}>{label}</div>
        {showIcon && (
          <div
            style={{ display: 'flex', justifyContent: 'center', marginLeft: '.25rem', ...(customStyles?.icon ?? {}) }}
          >
            <KeyboardArrowDownRoundedIcon sx={{ color: colors.mainBlack, fontSize: '1rem' }} />
          </div>
        )}
      </div>
      {isDirty && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: -6,
            height: '.75rem',
            width: '.75rem',
            borderRadius: '50%',
            background: 'red'
          }}
        />
      )}
    </div>
  );
}
