interface PolicySectionProps {
  data: {
    htmlContent: string;
  };
  isMobile?: boolean;
}

const PolicySection = ({ data, isMobile }: PolicySectionProps) => {
  return (
    <div className="bg-[#0D0D0D] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 md:px-[120px] pt-12 md:pt-[160px] pb-16 md:pb-24">
        <div 
          className="text-white policy-content prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: data.htmlContent }}
        />
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          .policy-content h1 {
            font-size: 68px;
            font-weight: 700;
            font-size: 68px;
            line-height: 72px;
            letter-spacing: -2px;
            color: white;
            margin-bottom: 40px;
          }
          
          .policy-content h2 {
            font-size: 24px;
            font-weight: 700;
            color: white;
            margin: 40px 0 16px 0;
          }
          
          .policy-content h3 {
            font-size: 20px;
            font-weight: 600;
            color: white;
            margin: 40px 0 16px 0;
          }
          
          .policy-content p {
            font-size: 14px;
            line-height: 20px;
            color: #FFFFFF;
            margin-bottom: 24px;
          }
          
          .policy-content ol {
            padding-left: 20px;
            margin-bottom: 32px;
            color: #FFFFFF;
            list-style-type: decimal;
            list-style-position: outside;
          }
          
          .policy-content ul {
            padding-left: 20px;
            margin-bottom: 24px;
            color: #FFFFFF;
            list-style-type: disc;
            list-style-position: outside;
          }
          
          .policy-content li {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 8px;
            color: #FFFFFF;
          }
          
          .policy-content ul li {
            margin-bottom: 12px;
          }
          
          .policy-content ol li::marker {
            color: white;
            font-weight: 600;
          }
          
          .policy-content ul li::marker {
            color: white;
          }
          
          .policy-content a {
            color: #00DBDC;
            text-decoration: underline;
          }
          
          .policy-content a:hover {
            color: #00DBDC;
          }
          
          .policy-content strong {
            color: white;
          }
          
          .policy-content blockquote {
            background: #2a2a2a;
            padding: 20px;
            border-left: 4px solid #00DBDC;
            margin: 20px 0;
            font-family: monospace;
            color: #e5e5e5;
            border-radius: 4px;
          }
          
          .policy-content blockquote p {
            color: #e5e5e5;
            margin-bottom: 16px;
          }
          
          .policy-content blockquote p:last-child {
            margin-bottom: 0;
          }
          
          @media (max-width: 768px) {
            .policy-content h1 {
              font-size: 32px;
            }
            
            .policy-content h2 {
              font-size: 20px;
            }
            
            .policy-content h3 {
              font-size: 18px;
            }
            
            .policy-content blockquote {
              padding: 16px;
              margin: 16px 0;
            }
          }
        `
      }} />
    </div>
  );
};

export default PolicySection; 