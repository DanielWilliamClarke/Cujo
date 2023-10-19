/** @jsxImportSource theme-ui */

import { Row } from "react-bootstrap";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Book, BookProgress } from "../../model/CVModel";
import { Entries } from "../../model/Includes";
import { DynamicImage } from "../shared/DynamicImage";
import { usePositionContext } from "../shared/PositionContext";
import { Section } from "../shared/Section";

const props = {
  slidesPerView: 1,
  spaceBetween: 10,
  centeredSlides: true,
  breakpoints: {
    1000: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1400: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
  rewind: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    dynamicBullets: true,
  },
  modules: [Autoplay, Pagination]
};

const progressMapping: Record<BookProgress, string> = {
  [BookProgress.NOT_STARTED]: 'Not Started 🤞',
  [BookProgress.PRIORITY]: 'Priority 🔥',
  [BookProgress.READING]: 'Reading 🦉',
  [BookProgress.COMPLETED]: 'Finished 🙌',
}

type ReadingListProps = {
  readingList: Entries<Book>
}

export const ReadingList: React.FC<ReadingListProps> = ({ readingList }: ReadingListProps) => {
  const booksByProgress = readingList.entries
    .reduce((acc, book: Book) => {
      if (!acc[book.progress]) {
        acc[book.progress] = []
      }

      acc[book.progress].push(book);

      return acc;
    }, {} as Record<BookProgress, Book[]>);

  return (
    <Section id="books" title="Books">
      <Row
        sx={{
          margin: '50px 0'
        }}
      >
        <Swiper
          className="mySwiper"
          sx={{
            width: '100%',
            height: '100%',
            paddingY: 20,
            transition: '0.5s',

            '.swiper-wrapper': {
              display: 'flex'
            }
          }}
          {...props}
        >
          {
            Object.values(booksByProgress)
              .flat()
              .reverse()
              .map((book: Book, index: number) => (
                <BookCover
                  key={index}
                  book={book}
                />
              ))
          }
        </Swiper>
      </Row>
    </Section>
  )
};

type BookCoverProps = {
  book: Book;
}

const BookCover: React.FC<BookCoverProps> = ({ book }) => {
  const { even } = usePositionContext();

  return (
    <SwiperSlide
      sx={{
        textAlign: 'center',
        fontSize: 18,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        data-id='book-cover'
        sx={{
          '&:hover': {
            transition: '0.5s',
            transform: 'scale(1.02)'
          },

          '@media screen and (max-width: 700px)': {
            height: '20em'
          }
        }}
      >
        <a
          href={book.amazonLink}
          rel="noopener noreferrer"
          target="_blank"
        >
          <DynamicImage
            image={book.cover}
            sx={{
              width: 'auto',
              height: '30em',
              margin: 10,
              borderRadius: 12,
            }}
          />
        </a>
        <div
          data-id='book-overlay'
          sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: '30%',
            left: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            data-id='book-sash'
            sx={{
              height: 50,
              width: '30%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 6,
              opacity: '90%',

              backgroundColor: even ? 'accent' : 'secondary'
            }}
          >
            {progressMapping[book.progress]}
          </div>
        </div>
      </div>
    </SwiperSlide>
  )
}

// https://github.com/nolimits4web/swiper/issues/4413
BookCover.displayName = 'SwiperSlide'; 