interface StructuredDataProps {
  type: "organization" | "local-business" | "webpage" | "sports-club";
  data?: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
    };

    switch (type) {
      case "organization":
        return {
          ...baseData,
          "@type": "Organization",
          name: "Drive FITT Premium Club",
          url: "https://drivefitt.club",
          logo: "https://da8nru77lsio9.cloudfront.net/images/logo.svg",
          description:
            "Premium fitness and sports club in Gurugram offering cricket, fitness, recovery, and running facilities.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "M3M 65th Avenue, Sector 65",
            addressLocality: "Gurugram",
            addressRegion: "Haryana",
            postalCode: "122022",
            addressCountry: "IN",
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+91-9871836565",
            contactType: "customer service",
            availableLanguage: ["English", "Hindi"],
          },
          sameAs: [
            "https://x.com/Drive_Fitt",
            "https://www.instagram.com/drive_fitt/",
            "https://www.linkedin.com/company/drivefitt/",
            "https://www.facebook.com/profile.php?id=61561476262978",
          ],
        };

      case "local-business":
        return {
          ...baseData,
          "@type": "SportsClub",
          name: "Drive FITT Premium Club",
          description:
            "India's first cricket and fitness club offering premium sports facilities.",
          url: "https://drivefitt.club",
          telephone: "+91-9871836565",
          email: "info@drivefitt.club",
          address: {
            "@type": "PostalAddress",
            streetAddress: "M3M 65th Avenue, Sector 65",
            addressLocality: "Gurugram",
            addressRegion: "Haryana",
            postalCode: "122022",
            addressCountry: "IN",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: "28.4595",
            longitude: "77.0266",
          },
          openingHours: "Mo-Su 06:00-22:00",
          priceRange: "₹₹₹",
          amenityFeature: [
            {
              "@type": "LocationFeatureSpecification",
              name: "Cricket Nets",
              value: true,
            },
            {
              "@type": "LocationFeatureSpecification",
              name: "Fitness Center",
              value: true,
            },
            {
              "@type": "LocationFeatureSpecification",
              name: "Recovery Center",
              value: true,
            },
            {
              "@type": "LocationFeatureSpecification",
              name: "Personal Training",
              value: true,
            },
          ],
        };

      case "webpage":
        return {
          ...baseData,
          "@type": "WebPage",
          name: data?.title || "Drive FITT Premium Club",
          description: data?.description || "Premium fitness and sports club",
          url: `https://drivefitt.club${data?.url || ""}`,
          isPartOf: {
            "@type": "WebSite",
            name: "Drive FITT Premium Club",
            url: "https://drivefitt.club",
          },
        };

      default:
        return baseData;
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  );
}
