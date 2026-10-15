import { Link } from 'react-router-dom';

function CartPage() {
  return (
    <main className="app-main">
      <section className="cart-page">
        <h2>Корзина</h2>
        <p>
          На данном этапе корзина является заготовкой. Полноценная логика корзины будет реализована как самостоятельная доработка КР №5.
        </p>
        <Link className="button-link" to="/catalog">
          Вернуться в каталог
        </Link>
      </section>
    </main>
  );
}

export default CartPage;
