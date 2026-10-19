import React from 'react';
import { useData } from '../context/DataContext';

interface JongleiMapProps {
  className?: string;
  interactive?: boolean;
  onCountyClick?: (countyId: string) => void;
}

export const JongleiMap: React.FC<JongleiMapProps> = ({
  className = '',
  interactive = true,
  onCountyClick,
}) => {
  const { navigateTo } = useData();

  const handleClick = (id: string) => {
    if (onCountyClick) onCountyClick(id);
    else if (interactive) navigateTo('counties', id);
  };

  // County name label positions for click areas (invisible)
  const counties = [
    { id: 'fangak',    points: '88,30 175,18 262,20 268,78 258,130 252,185 232,235 218,298 200,355 168,388 118,400 72,390 42,335 38,268 48,195 58,128 68,72' },
    { id: 'pigi',      points: '262,20 338,18 378,22 428,28 468,52 486,80 474,122 448,148 428,168 406,200 390,222 368,242 350,258 342,285 358,305 348,328 322,342 298,318 278,295 258,265 252,185 258,130 268,78' },
    { id: 'nyirol',    points: '428,28 510,28 568,38 608,48 648,72 672,112 682,162 672,215 652,258 632,288 612,308 588,318 558,305 532,318 508,312 488,298 468,275 448,252 428,168 448,148 474,122 486,80 468,52' },
    { id: 'akobo',     points: '652,258 672,215 682,162 672,112 648,72 688,68 728,78 762,88 792,108 808,135 812,168 808,205 795,242 778,275 758,302 735,322 710,338 688,352 658,345 632,328 612,308 632,288' },
    { id: 'ayod',      points: '168,388 200,355 218,298 232,235 252,185 258,265 278,295 298,318 322,342 312,368 295,392 278,415 258,435 228,448 198,452 172,442 152,428 135,408 118,400' },
    { id: 'duk',       points: '322,342 348,328 358,305 342,285 350,258 368,242 448,252 468,275 488,298 508,312 498,338 488,362 478,388 468,415 452,435 428,452 405,462 382,462 358,455 335,442 312,428 295,415 295,392 312,368' },
    { id: 'uror',      points: '468,275 508,312 532,318 558,305 588,318 612,308 632,328 658,345 688,352 672,388 658,422 642,455 622,482 602,505 578,522 552,535 525,542 498,535 472,522 452,505 435,488 428,452 452,435 468,415 478,388 488,362 498,338 508,312' },
    { id: 'twic-east', points: '118,400 135,408 152,428 172,442 198,452 228,448 258,435 295,415 312,428 335,442 358,455 382,462 372,498 358,535 342,568 322,605 302,642 278,678 255,715 232,748 208,778 185,808 162,828 138,828 112,812 95,785 82,748 72,708 62,662 55,615 52,565 58,518 68,475 82,438 98,415' },
    { id: 'bor',       points: '312,428 335,442 358,455 382,462 405,462 428,452 435,488 452,505 472,522 498,535 525,542 552,535 578,522 602,505 615,538 625,575 632,615 628,655 618,692 602,728 582,760 558,790 532,818 505,842 475,862 445,878 412,888 378,892 345,882 315,862 290,835 268,805 248,775 232,748 255,715 278,678 302,642 322,605 342,568 358,535 372,498 382,462' },
  ];

  return (
    <div className={`relative ${className}`}>
      <div
        className="relative w-full rounded-xl overflow-hidden shadow"
        style={{ aspectRatio: '960 / 1058', background: '#fff' }}
      >
        {/* The actual map image — nothing else */}
        <img
          src="/Jonglei_State_Counties.svg.webp"
          alt="Jonglei State counties map"
          className="absolute inset-0 w-full h-full object-fill"
          draggable={false}
        />

        {/* Invisible click areas only — no fill, no stroke, no color */}
        {interactive && (
          <svg
            viewBox="0 0 960 1058"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full z-10"
            aria-label="Jonglei State counties map"
          >
            {counties.map((c) => (
              <polygon
                key={c.id}
                points={c.points}
                fill="transparent"
                stroke="transparent"
                className="cursor-pointer"
                onClick={() => handleClick(c.id)}
                aria-label={c.id}
                role="button"
              />
            ))}
          </svg>
        )}
      </div>
    </div>
  );
};
