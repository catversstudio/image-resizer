import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { label: 'Features', href: '#features' },
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'API', href: '#api' },
    ],
    Company: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '#blog' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '#careers' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '#cookies' },
      { label: 'GDPR', href: '#gdpr' },
    ],
    Resources: [
      { label: 'Documentation', href: '#docs' },
      { label: 'GitHub', href: 'https://github.com/catversstudio/Image-Resizer-' },
      { label: 'Support', href: '#support' },
      { label: 'Status', href: '#status' },
    ],
  };

  return (
    <footer className="bg-slate-900 dark:bg-black text-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 font-bold text-lg mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                🖼️
              </div>
              <span>Image Resizer</span>
            </Link>
            <p className="text-slate-400 text-sm">
              Advanced AI image editing for government applications and official documents.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 py-8">
          {/* Newsletter */}
          <div className="mb-8">
            <h4 className="font-semibold text-white mb-4">Subscribe to our newsletter</h4>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="btn btn-primary px-6"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Bottom */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-slate-400">
            <p className="flex items-center space-x-1">
              <span>© {currentYear} Image Resizer. Built with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for government applications.</span>
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="https://twitter.com" className="hover:text-white transition-colors">Twitter</a>
              <a href="https://github.com" className="hover:text-white transition-colors">GitHub</a>
              <a href="https://linkedin.com" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;