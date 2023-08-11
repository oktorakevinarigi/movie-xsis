"use client";
import React, { useState, useCallback, useEffect, DetailedHTMLProps, HTMLAttributes } from "react";

import useEmblaCarousel, { type EmblaOptionsType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { CarouselDesktop } from "./carousel-desktop";

export type CarouselProps<Item> = {
  slides: Array<Item>;
  renderSlide: (arg: { slide: Item; index: number }) => React.ReactNode;
  slidesToShow?: number;
  slideGap?: string;
  showDotButton?: boolean;
  options?: EmblaOptionsType;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function Carousel<Item extends { id: number | string }>(props: CarouselProps<Item>) {
  const {
    slides = [],
    showDotButton = true,
    slidesToShow = 3,
    slideGap = "0px",
    renderSlide,
    className,
    options,
  } = props;
  const [viewportRef, embla] = useEmblaCarousel(
    {
      skipSnaps: false,
      align: "start",
      containScroll: "trimSnaps",
      ...options,
    },
    [Autoplay({ delay: 3000 })],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback((index: number) => embla && embla.scrollTo(index), [embla]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    embla.reInit();
    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
  }, [embla, setScrollSnaps, onSelect, slides]);

  const newProps = {
    viewportRef,
    slidesToShow,
    slideGap,
    scrollSnaps,
    selectedIndex,
    scrollTo,
    slides,
    renderSlide,
    showDotButton,
    className,
  };
  return <CarouselDesktop {...newProps} />;
}
