import React from 'react';
import Link from 'next/link';

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  badge?: string;
  featured?: boolean;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  title,
  description,
  icon,
  href,
  badge,
  featured = false,
}) => {
  return (
    <Link href={href}>
      <div
        className={`card p-6 cursor-pointer transition-all duration-300 ${
          featured
            ? 'ring-2 ring-primary scale-105 lg:scale-110'
            : 'hover:scale-105'
        }`}
      >
        {badge && (
          <div className="flex items-center justify-between mb-3">
            <span className="badge">{badge}</span>
          </div>
        )}

        <div className="mb-4 text-4xl">{icon}</div>

        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm">{description}</p>

        <div className="mt-4 flex items-center text-primary dark:text-secondary font-medium text-sm">
          Get Started →
        </div>
      </div>
    </Link>
  );
};

export default ToolCard;