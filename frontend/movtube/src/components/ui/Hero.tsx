import React from "react";
import { Link } from "react-router-dom";

interface HeroProps {
  title: string;
  description: string;
  backgroundImage: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  onSecondaryButtonClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({
  title,
  description,
  backgroundImage,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  onSecondaryButtonClick,
}) => {
  return (
    <div
      className="relative h-[60vh] bg-cover bg-center"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
        <h1 className="text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl max-w-2xl mb-8">{description}</p>
        <div>
          <Link
            to={primaryButtonLink}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            {primaryButtonText}
          </Link>
          {secondaryButtonText && (
            <button
              onClick={onSecondaryButtonClick}
              className="ml-4 bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
            >
              {secondaryButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
