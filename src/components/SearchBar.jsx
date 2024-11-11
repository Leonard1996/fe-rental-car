import SearchIcon from '@mui/icons-material/Search';
import { InputBase, styled } from '@mui/material';
import { colors } from '../themes/base-theme';

const Search = styled('div')(({ theme }) => ({
  'position': 'relative',
  'borderRadius': theme.shape.borderRadius,
  'backgroundColor': colors.white,
  '&:hover': {
    backgroundColor: colors.white
  },
  'marginRight': theme.spacing(2),
  'marginLeft': 0,
  'width': '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  'color': colors.mainBlack,
  'width': '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100%'
    }
  }
}));

export default function SearchBar({ value, onChange }) {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon sx={{ color: colors.mainBlack, cursor: 'pointer' }} />
      </SearchIconWrapper>
      <StyledInputBase
        value={value}
        onChange={onChange}
        placeholder="Search reservation by ID"
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
}
