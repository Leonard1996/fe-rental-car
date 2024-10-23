import { colors } from '../themes/base-theme';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

export default function Filter({ label, callback, showIcon = true, customStyles }) {
  return (
    <div
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
        ...(customStyles?.wrapper ?? {})
      }}
    >
      <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ...(customStyles?.container ?? {}) }}
      >
        <div style={{ display: 'flex', ...(customStyles?.label ?? {}) }}>{label}</div>
        {showIcon && (
          <div style={{ display: 'flex', justifyContent: 'center', ...(customStyles?.icon ?? {}) }}>
            <KeyboardArrowDownRoundedIcon sx={{ color: colors.mainBlack }} />
          </div>
        )}
      </div>
    </div>
  );
}
