import React from "react";
import { Link } from "react-router-dom";

interface SectionProps {
  title: string;
  viewAllLink?: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, viewAllLink, children }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">{title}</h2>
        {viewAllLink && (
          <Link to={viewAllLink} className="text-red-500 hover:text-red-400">
            View All →
          </Link>
        )}
      </div>
      {children}
    </div>
  );
};

export default Section;
