'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

/**
 * Shared slider used by the barbers and services sections.
 *
 * Slides run past the container edge for the peek effect, so whichever
 * section renders this must carry the .clip-x class or the page will
 * scroll sideways.
 *
 * The prev/next/pagination elements are wired by ref rather than by
 * selector string, so two sliders can coexist on one page safely.
 */
export default function Slider({ items, breakpoints, renderItem }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const pagRef = useRef(null);
  const navRef = useRef(null);

  const syncNav = (swiper) => {
    if (navRef.current) navRef.current.style.display = swiper.isLocked ? 'none' : '';
  };

  return (
    <div className="slider-wrap">
      <Swiper
        modules={[Navigation, Pagination]}
        watchOverflow
        slideToClickedSlide
        breakpoints={breakpoints}
        pagination={{ clickable: true, el: pagRef.current }}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current, disabledClass: 'is-disabled' }}
        onBeforeInit={(swiper) => {
          // Refs are null on first render, so hand Swiper the real nodes
          // before it initialises.
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.params.pagination.el = pagRef.current;
        }}
        onInit={syncNav}
        onResize={syncNav}
      >
        {items.map((item, index) => (
          <SwiperSlide key={item.key ?? item.name ?? item.title ?? index}>
            {renderItem(item, index)}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-nav" ref={navRef}>
        <button className="nav-btn" ref={prevRef} type="button">
          &#60; <span>Prev</span>
        </button>
        <div className="wave" ref={pagRef} />
        <button className="nav-btn" ref={nextRef} type="button">
          <span>Next</span> &#62;
        </button>
      </div>
    </div>
  );
}
