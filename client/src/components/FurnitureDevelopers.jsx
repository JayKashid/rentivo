import React from 'react';
import { ArrowRight } from 'lucide-react';

const FurnitureDevelopers = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Eyebrow text */}
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">
            Trusted by Experts
          </p>

          {/* Main heading – now one line */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Sell or Rent Faster with <span className="text-blue-600">Expert Strategies</span> and Real Support!
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-8">
            Achieve your goals faster with personalized strategies, hands‑on support, and results that speak for themselves.
          </p>

          {/* CTA button */}
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
            Get Started
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom text (as shown in screenshot) */}
        <p className="text-center text-sm text-gray-400 mt-8">
          Radiant made undercutting all of our
        </p>
      </div>
    </section>
  );
};

export default FurnitureDevelopers;