import { Row } from "react-bootstrap";
import { Book, BookProgress } from "../../model/CVModel";
import { Entries } from "../../model/Includes";
import { DynamicImage } from "../shared/DynamicImage";
import { Section } from "../shared/Section";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";

type ReadingListProps = {
    readingList: Entries<Book>
}

const progressMapping: Record<BookProgress, string> = {
    [BookProgress.NOT_STARTED]: 'Not Started 🤞',
    [BookProgress.PRIORITY]: 'Priority 🔥',
    [BookProgress.READING]: 'Reading 🦉',
    [BookProgress.COMPLETED]: 'Finished 🙌',
}

export const ReadingList: React.FC<ReadingListProps> = ({ readingList }: ReadingListProps) => {
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
            <Row>
                <Swiper
                    className="mySwiper"
                    {...props}
                >
                    {
                            Object.values(booksByProgress)
                            .flat()
                            .reverse()
                            .map((book: Book, index: number) => (
                                <SwiperSlide
                                    key={index}
                                >
                                    <div>
                                        <a
                                            href={book.amazonLink}
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            <DynamicImage
                                                image={book.cover}
                                                className='book-cover'
                                            />
                                        </a>
                                        <div className="book-overlay">
                                            <div className="book-sash">
                                                {progressMapping[book.progress]}
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                    }
                </Swiper>
            </Row>
        </Section>
    )
};