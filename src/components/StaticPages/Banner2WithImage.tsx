import ScrollAnimation from "@/components/common/ScrollAnimation";

interface Banner2WithImageProps {
  title: string;
  description: string;
  image: string;
  backgroundImage: string;
  isMobile?: boolean;
}

const Banner2WithImage = ({
  title,
  description,
  image,
  backgroundImage,
  isMobile,
}: Banner2WithImageProps) => {
  return (
    <div className="w-full px-6 md:px-[120px]">
      <ScrollAnimation delay={0.2} direction="up">
        <div
          className="w-full h-fit rounded-[30px] border-[2px] border-[#333333] relative overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #1E1E1E 0%, #141414 100%)",
          }}
        >
          {/* Background image - only on right 50% */}
          <div
            className="absolute top-0 right-0 w-1/2 h-full bg-cover bg-center opacity-20"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          {/* Content container */}
          <div className="relative z-10 flex flex-col md:flex-row items-center px-6 md:pr-[40px] md:pl-[60px] gap-8 md:gap-[60px]">
            {/* Left side - Text content */}
            <div className="flex-1 flex flex-col gap-4 md:gap-6 text-center md:text-left">
              <ScrollAnimation delay={0.3} direction="up">
                <h2
                  className="text-white"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: isMobile ? "32px" : "48px",
                    lineHeight: isMobile ? "40px" : "56px",
                    letterSpacing: "-2px",
                  }}
                >
                  {title}
                </h2>
              </ScrollAnimation>

              <ScrollAnimation delay={0.4} direction="up">
                <p
                  className="text-[#8A8A8A]"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 300,
                    fontSize: "16px",
                    lineHeight: "24px",
                    letterSpacing: "0px",
                  }}
                >
                  {description}
                </p>
              </ScrollAnimation>
            </div>

            {/* Right side - Image */}
            <div className="flex-1 flex justify-center md:justify-end">
              <ScrollAnimation delay={0.5} direction="right">
                <img
                  src={image}
                  alt="Personal Training"
                  className="w-full max-w-[400px] md:max-w-[500px] h-auto object-cover rounded-[20px]"
                />
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </ScrollAnimation>
    </div>
  );
};

export default Banner2WithImage;
