import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({ title, description }) => {
  useEffect(() => {
    document.title = `${title} | Mintsa Service Consulting`;

    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    }
  }, [title, description]);

  return null;
};

export default SEOHead;
