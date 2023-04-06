import { Row } from "react-bootstrap";
import { Book } from "../../model/CVModel";
import { Entries } from "../../model/Includes";
import { DynamicImage } from "../shared/DynamicImage";
import { Section } from "../shared/Section";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

type ReadingListProps = {
    readingList: Entries<Book>
}

export const ReadingList: React.FC<ReadingListProps> = ({ readingList }: ReadingListProps) => {
    const props = {
        slidesPerView:1,
        spaceBetween:10,
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
        pagination:{
            dynamicBullets: true,
        },
        modules: [Pagination]
    };

    return (
        <Section id="books" title="Books">
            <Row>
                <Swiper
                    className="mySwiper"
                    {...props}
                >
                    {
                        readingList.entries
                            .map((book: Book, index: number) => (
                                <SwiperSlide
                                 key={index}
                                >
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
                                </SwiperSlide>
                            ))
                    }
                </Swiper>
            </Row>
        </Section>
    )
};