import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <main className="app-main">
      <section className="not-found-page">
        <h2>Страница не найдена</h2>
        <p>
          Возможно, адрес был введён неправильно или такой страницы больше не существует.
        </p>
        <Link className="button-link" to="/">
          Вернуться на главную
        </Link>
      </section>
    </main>
  );
}

export default NotFoundPage;
