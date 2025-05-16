function NotFound() {
    return(
        <div className="not-found-page">
      <div className="not-found-container">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Страница не найдена</h2>
        <p className="not-found-text">
          Кажется, такой страницы не существует или она была перемещена
        </p>
      </div>
    </div>
    );
}

export { NotFound };