'use client'

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function ImageCarousel({ gallery }: { gallery: string }) {
  const galleryArray = gallery ? (JSON.parse(gallery) as string[]) : [];

  return (
    <div className="w-full flex justify-center items-center text-center relative">
      {/* <style jsx>{`
        .is-wheel-dragging {
          cursor: grabbing !important;
        }
      `}</style> */}

      <Carousel
        className="w-full max-w-5xl mx-auto"
        opts={{
          // align: "start",
          loop: true,
          dragFree: false,
          containScroll: "trimSnaps",
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
              <div className="p-1  flex  justify-center items-center">
                <Card className="w-full max-h-[22rem] overflow-y-auto scrollbar-thin">


                  <CardContent className="flex  justify-center items-center">
                    <div className="w-full  flex justify-center items-center ">
                      <Image
                        alt="thumb"
                        src={img}
                        width={1200}   // increase width
                        height={800}
                        blurDataURL={img}
                        placeholder="blur"
                        className="rounded-lg  h-auto w-auto max-w-full mx-auto"
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
  );
}
