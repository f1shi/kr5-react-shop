import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <main className="app-main">
      <section className="home-page">
        <h2>Учебный интернет-магазин на React</h2>
        <p>
          Это SPA-версия интернет-магазина электроники, который ранее был реализован на HTML, CSS и JavaScript.
        </p>
        <div className="home-page__actions">
          <Link className="button-link" to="/catalog">
            Перейти в каталог
          </Link>
          <Link className="button-link button-link--secondary" to="/order">
            Оставить заявку
          </Link>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
