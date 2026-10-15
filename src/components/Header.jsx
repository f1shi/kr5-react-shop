import { NavLink } from 'react-router-dom';

function Header() {
  const getLinkClassName = ({ isActive }) =>
    isActive ? 'site-nav__link site-nav__link--active' : 'site-nav__link';

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__brand">
          <h1>React Shop</h1>
          <p>Учебный интернет-магазин электроники на React.</p>
        </div>

        <nav className="site-nav" aria-label="Основная навигация">
          <NavLink to="/" className={getLinkClassName} end>
            Главная
          </NavLink>
          <NavLink to="/catalog" className={getLinkClassName}>
            Каталог
          </NavLink>
          <NavLink to="/order" className={getLinkClassName}>
            Заявка
          </NavLink>
          <NavLink to="/cart" className={getLinkClassName}>
            Корзина
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
