import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function ImageCarousel({ gallery }: { gallery: string[] }) {
  return (
    <div className="w-full flex text-center">
      <Carousel
        // ref={emblaRef}
        className="w-[95%] "
      >
        <CarouselContent>
          {gallery.map((img, index) => (
            <CarouselItem key={index}>
              <div className="p-1 ">
                <Card>
                  <CardContent className="flex ">
                    <div className="relative h-96 w-full">
                      <Image
                        alt={"thumb"}
                        layout="fill"
                        objectFit="cover"
                        src={img}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
