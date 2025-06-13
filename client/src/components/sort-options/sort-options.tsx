import React, { useState, KeyboardEvent } from 'react';
import { SortOffersType } from '../../const/const';
import { SortOffer } from '../../types/sort';

interface SortOptionsProps {
  activeSorting: SortOffer;
  onChange: (newSorting: SortOffer) => void;
}

function SortOptions({ activeSorting, onChange }: SortOptionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const iconStyle = {
    transform: `translateY(-50%) ${isOpen ? 'rotate(180deg)' : ''}`,
  };

  function keyDownHandler(evt: KeyboardEvent) {
    if (evt.key === 'Escape' && isOpen) {
      evt.preventDefault();
      setIsOpen(false);
    }
  }

  function typeClickHandler() {
    setIsOpen((prev) => !prev);
  }

  function sortingItemClickHandler(type: SortOffer) {
    onChange(type);
    setIsOpen(false);
  }

  return (
    <form className="places__sorting" action="#" method="get" onKeyDown={keyDownHandler}>
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={typeClickHandler}>
        {SortOffersType[activeSorting]}
        <svg className="places__sorting-arrow" width={7} height={4} style={iconStyle}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={`places__options places__options--custom${isOpen ? ' places__options--opened' : ''}`}>
        {Object.keys(SortOffersType).map((type) => (
          <li
            key={type}
            className={`places__option${activeSorting === type ? ' places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => sortingItemClickHandler(type as SortOffer)}
          >
            {SortOffersType[type as SortOffer]}
          </li>
        ))}
      </ul>
    </form>
  );
}

export { SortOptions }; 