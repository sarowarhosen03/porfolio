'use client'

import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'

export default function ImageCarousel({ gallery }: { gallery: string }) {
  const galleryArray = gallery ? (JSON.parse(gallery) as string[]) : []

  return (
    <div className="relative flex w-full items-center justify-center text-center">
      {/* <style jsx>{`
        .is-wheel-dragging {
          cursor: grabbing !important;
        }
      `}</style> */}

      <Carousel
        className="mx-auto w-full max-w-5xl"
        opts={{
          // align: "start",
          loop: true,
          dragFree: false,
          containScroll: 'trimSnaps',
        }}
        // plugins={[WheelGesturesPlugin({
        //   forceWheelAxis: "y",

        // })
        // ]}
      >
        <CarouselContent>
          {/* First Item */}

          {/* Gallery Items */}
          {galleryArray.map((img: string, index: number) => (
            <CarouselItem key={index}>
              <div className="flex items-center justify-center p-1">
                <Card className="scrollbar-thin max-h-[22rem] w-full overflow-y-auto">
                  <CardContent className="flex items-center justify-center">
                    <div className="flex w-full items-center justify-center">
                      <Image
                        alt="thumb"
                        src={img}
                        width={1200} // increase width
                        height={800}
                        blurDataURL={img}
                        placeholder="blur"
                        className="mx-auto h-auto w-auto max-w-full rounded-lg"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-2 z-10" />
        <CarouselNext className="right-2 z-10" />
      </Carousel>
    </div>
  )
}
