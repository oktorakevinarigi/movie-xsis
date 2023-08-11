import React, { LegacyRef } from "react";

type CarouselDesktopProps<Item> = {
  viewportRef: LegacyRef<HTMLDivElement>;
  slidesToShow: number;
  slideGap: string;
  scrollSnaps: number[];
  selectedIndex: number;
  scrollTo: (value: number) => void;
  slides: Item[];
  renderSlide: (arg: { slide: Item; index: number }) => React.ReactNode;
  showDotButton: boolean;
  className?: string;
};

export function CarouselDesktop<Item extends { id: number | string }>(
  props: CarouselDesktopProps<Item>,
) {
  const {
    viewportRef,
    slidesToShow = 2,
    scrollSnaps,
    selectedIndex,
    scrollTo,
    slides,
    renderSlide,
    showDotButton,
    className,
  } = props;

  return (
    <div className="relative">
      <div className="relative">
        <div className="overflow-hidden" ref={viewportRef}>
          <div className={`-ml-4 flex touch-pan-y ${className}`}>
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`relative flex-shrink-0 flex-grow-0 max-sm:basis-full sm:basis-[cal(100/${slidesToShow})%] min-w-0 pl-4`}
              >
                {renderSlide({ slide, index })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {showDotButton && (
        <div className="relative mt-[36px] flex justify-center">
          <div className="flex gap-2">
            {scrollSnaps.map((id, idx) => (
              <div
                key={id}
                className={`${
                  idx === selectedIndex
                    ? "h-3 w-[60px] bg-[#F00F00]"
                    : "h-3 w-3 bg-[#FFFFFF] bg-opacity-50"
                } cursor-pointer rounded-full`}
                onClick={() => scrollTo(idx)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
