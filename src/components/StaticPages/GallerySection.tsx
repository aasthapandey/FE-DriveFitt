"use client";
import { GallerySectionProps } from "@/types/staticPages";
import Image from "next/image";
import { useState } from "react";
import EmailModal from "@/components/common/Modal/EmailModal";
import ScrollAnimation from "@/components/common/ScrollAnimation";
import { GALLERY_IMAGES } from "@/data/constants";

const GallerySection = ({
  data,
  isMobile,
}: {
  data: GallerySectionProps;
  isMobile?: boolean;
}) => {
  const { title, description, imageList } = data;
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // const handleButtonClick = () => {
  //   if (btnLabel === "View Gallery") {
  //     window.location.href = "/coming-soon";
  //   } else if (btnLabel === "Join online" || btnLabel === "Join Online") {
  //     setIsEmailModalOpen(true);
  //   }
  // };

  const openImageModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentImageIndex((prev) =>
        prev === 0 ? imageList.length - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex((prev) =>
        prev === imageList.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeImageModal();
    } else if (e.key === "ArrowLeft") {
      navigateImage("prev");
    } else if (e.key === "ArrowRight") {
      navigateImage("next");
    }
  };

  return (
    <>
      <div className="md:px-[120px] px-6 flex flex-col md:flex-row gap-[25px] md:gap-[104px] justify-between items-center">
        <ScrollAnimation
          delay={0.2}
          direction="left"
          className="w-full md:w-2/5 flex flex-col text-center justify-center items-center md:text-start md:justify-start md:items-start gap-3 md:gap-4"
        >
          <h2
            className={`${
              isMobile
                ? "text-2xl font-semibold leading-7 tracking-[-1px]"
                : "text-5xl font-semibold leading-[56px] tracking-[-2.4px]"
            } md:text-5xl md:font-semibold md:leading-[56px] md:tracking-[-2.4px]`}
          >
            {title}
          </h2>
          <p
            className={`${
              isMobile
                ? "text-xs font-light leading-4 tracking-[-1%] text-[#8A8A8A]"
                : "text-lg font-light leading-7 tracking-[-0.9px]"
            } md:text-lg md:font-light md:leading-7 md:tracking-[-0.9px]`}
          >
            {description}
          </p>
          {/* <button
            onClick={handleButtonClick}
            className={`bg-[#00DBDC] border border-transparent w-fit leading-[100%] tracking-[-5%] text-base text-[#0D0D0D] px-10 py-3 rounded-[4px] md:rounded-lg font-medium mt-2 md:mt-[60px] ${
              isMobile
                ? "h-[37px] font-medium text-sm leading-none tracking-tighter"
                : "hover:bg-transparent hover:border-[#00DBDC] hover:text-[#00DBDC]"
            } transition-all duration-200 md:px-[48px] md:h-[50px]`}
          >
            {btnLabel}
          </button> */}
        </ScrollAnimation>

        <ScrollAnimation
          delay={0.3}
          direction="right"
          className="w-full md:w-3/5"
        >
          <div className="grid grid-cols-5 gap-2 h-[316px] md:h-[577px]">
            <div className="col-span-2 grid grid-rows-2 gap-2">
              <div
                className="row-span-1 relative h-full w-full rounded-[20px] overflow-hidden cursor-pointer hover:opacity-90 transition-opacity duration-200"
                onClick={() => openImageModal(imageList[0])}
              >
                <Image
                  src={GALLERY_IMAGES[imageList[0]]?.CROPPED_IMAGE || ""}
                  alt="gallery-1"
                  fill
                  className="object-cover"
                />
              </div>
              <div
                className="row-span-1 relative h-full w-full rounded-[20px] overflow-hidden cursor-pointer hover:opacity-90 transition-opacity duration-200"
                onClick={() => openImageModal(imageList[1])}
              >
                <Image
                  src={GALLERY_IMAGES[imageList[1]]?.CROPPED_IMAGE || ""}
                  alt="gallery-2"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div
              className="col-span-3 relative h-full w-full rounded-[20px] overflow-hidden cursor-pointer hover:opacity-90 transition-opacity duration-200"
              onClick={() => openImageModal(imageList[2])}
            >
              <Image
                src={GALLERY_IMAGES[imageList[2]]?.CROPPED_IMAGE || ""}
                alt="gallery-3"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </ScrollAnimation>
      </div>

      {/* Image Preview Modal */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeImageModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("prev");
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("next");
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Image */}
            <div
              className="relative max-w-full max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={
                  GALLERY_IMAGES[imageList[currentImageIndex]]?.GALLERY_IMAGE ||
                  ""
                }
                alt={`gallery-${currentImageIndex + 1}`}
                width={800}
                height={600}
                className="max-w-full max-h-[80vh] object-contain"
                priority
              />
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
              {currentImageIndex + 1} / {Object.keys(GALLERY_IMAGES).length}
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        isMobile={isMobile}
      />
    </>
  );
};

export default GallerySection;
