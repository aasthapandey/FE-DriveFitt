"use client";

import TitleDescription from "../common/TitleDescription";

interface Package {
  name: string;
  sessions: string;
  includes: string;
}

interface ChooseYourPathSectionProps {
  title: string;
  packages: Package[];
  buttonText?: string;
  isMobile?: boolean;
}

const ChooseYourPathSection = ({
  title,
  packages,
  buttonText = "Book Your Class Today",
  isMobile = false,
}: ChooseYourPathSectionProps) => {
  const handleBookClass = () => {
    console.log("Book class clicked");
  };

  return (
    <div className="w-full">
      <TitleDescription title={title} className="px-[24px]" />

      <div
        className="px-[24px] md:px-[120px] max-w-[1440px] mx-auto"
        style={{ marginTop: "68px" }}
      >
        {/* Table Container */}
        <div
          className="rounded-[40px] overflow-hidden relative p-[2px]"
          style={{
            width: isMobile ? "100%" : "1200px",
            height: isMobile ? "auto" : "537px",
            maxWidth: "1200px",
            margin: "0 auto",
            opacity: 1,
            background:
              "linear-gradient(180deg, #333333 29.36%, #00DBDC 120.13%)",
          }}
        >
          {/* Inner container with dark background */}
          <div className="bg-[#0D0D0D] rounded-[38px] h-full w-full">
            {/* Table Header */}
            <div
              className="border-b border-[#333333]"
              style={{
                display: "grid",
                gridTemplateColumns: "25% 25% 50%",
              }}
            >
              <div className="p-6 md:p-8 text-left">
                <h3
                  className="text-[#8A8A8A] uppercase"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "20px",
                    letterSpacing: "4px",
                  }}
                >
                  PACKAGE
                </h3>
              </div>
              <div className="p-6 md:p-8 text-center border-l border-[#333333]">
                <h3
                  className="text-[#8A8A8A] uppercase"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "20px",
                    letterSpacing: "4px",
                  }}
                >
                  SESSIONS / MONTH
                </h3>
              </div>
              <div className="p-6 md:p-8 text-left border-l border-[#333333]">
                <h3
                  className="text-[#8A8A8A] uppercase"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "20px",
                    letterSpacing: "4px",
                  }}
                >
                  INCLUDES
                </h3>
              </div>
            </div>

            {/* Table Rows */}
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`${
                  index < packages.length - 1 ? "border-b border-[#333333]" : ""
                }`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "25% 25% 50%",
                }}
              >
                <div className="p-6 md:p-8 text-left flex items-center">
                  <p
                    className="text-white"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: "24px",
                      lineHeight: "28px",
                      letterSpacing: "0px",
                    }}
                  >
                    {pkg.name}
                  </p>
                </div>
                <div className="p-6 md:p-8 text-center border-l border-[#333333] flex items-center justify-center">
                  <p
                    className="text-white"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: "24px",
                      lineHeight: "28px",
                      letterSpacing: "0px",
                    }}
                  >
                    {pkg.sessions}
                  </p>
                </div>
                <div className="p-6 md:p-8 text-left border-l border-[#333333] flex items-center">
                  <p
                    className="text-white"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: "24px",
                      lineHeight: "28px",
                      letterSpacing: "0px",
                    }}
                  >
                    {pkg.includes}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Book Class Button */}
        <div className="flex justify-center" style={{ marginTop: "60px" }}>
          <button
            onClick={handleBookClass}
            className={`bg-[#00DBDC] border border-transparent w-fit leading-[100%] tracking-[-5%] text-base text-[#0D0D0D] px-10 py-3 rounded-[4px] md:rounded-lg font-medium ${
              isMobile
                ? "h-[37px] font-medium text-sm leading-none tracking-tighter"
                : "hover:bg-transparent hover:border-[#00DBDC] hover:text-[#00DBDC]"
            } transition-all duration-200 md:px-[48px] md:h-[50px]`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseYourPathSection;
