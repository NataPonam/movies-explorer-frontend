import HeaderMain from './HeaderMain';
import HeaderMovie from '../Header/HeaderMovie';
import './Header.css';

function Header({ loggedIn }) {
  return <>{loggedIn === true ? <HeaderMovie /> : <HeaderMain />}</>;
}
export default Header;
