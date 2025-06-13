import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/action';
import { CITIES_LOCATION } from '../../const/const';

function CitiesList() {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector((state) => state.city);

  return (
    <ul className="locations__list tabs__list">
      {CITIES_LOCATION.map((city) => (
        <li key={city.name} className="locations__item">
          <Link
            className={`locations__item-link tabs__item${city.name === selectedCity.name ? ' tabs__item--active' : ''}`}
            to="/"
            onClick={() => dispatch(changeCity(city))}
          >
            <span>{city.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export { CitiesList }; 