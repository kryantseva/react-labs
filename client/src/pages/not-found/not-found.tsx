import React from 'react'; // Добавляем импорт React

function NotFound(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <div className="not-found-page">
        <div className="not-found-container">
          <h1 className="not-found-title">404</h1>
          <h2 className="not-found-subtitle">Страница не найдена</h2>
          <p className="not-found-text">
            Извините, запрашиваемая вами страница не существует.
          </p>
          <a href="/" className="not-found-link">Вернуться на главную</a>
        </div>
      </div>
    </div>
  );
}

export { NotFound };