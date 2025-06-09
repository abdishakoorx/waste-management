"use client";

import React, { useState } from "react";
import { Skip, LocationParams } from "@/types/skip.types";
import { useSkips } from "@/hooks/use-skips";
import { calculatePriceWithVAT, formatPrice } from "@/utils/price.utils";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ErrorState } from "@/components/ui/error-state";
import { ProgressSteps } from "./progress-steps";
import { SkipCard } from "./skip-card";

interface SkipSelectionPageProps {
  locationParams: LocationParams;
  onSkipSelected?: (skip: Skip | null) => void;
  onBack?: () => void;
  onContinue?: (skip: Skip) => void;
}

const PROGRESS_STEPS = [
  { id: 1, label: "Postcode", completed: true, current: false },
  { id: 2, label: "Waste Type", completed: true, current: false },
  { id: 3, label: "Select Skip", completed: false, current: true },
  { id: 4, label: "Permit check", completed: false, current: false },
  { id: 5, label: "Choose date", completed: false, current: false },
  { id: 6, label: "Payment", completed: false, current: false },
];

export function SkipSelectionPage({
  locationParams,
  onSkipSelected,
  onBack,
  onContinue,
}: SkipSelectionPageProps) {
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  const { skips, loading, error, refetch } = useSkips(locationParams);

  const handleSkipSelect = (skip: Skip) => {
    if (selectedSkip?.id === skip.id) {
      setSelectedSkip(null);
      onSkipSelected?.(null);
    } else {
      setSelectedSkip(skip);
      onSkipSelected?.(skip);
    }
  };

  const handleContinue = () => {
    if (selectedSkip) {
      onContinue?.(selectedSkip);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-300 text-lg">Loading skip options...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorState error={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className="shadow-sm border-b border-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16">
            <ProgressSteps steps={PROGRESS_STEPS} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${
          selectedSkip ? "pb-80 md:pb-30" : "pb-8"
        }`}
      >
        {/* Page Title */}
        <div className="text-center mb-12 px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-200 mb-4 leading-tight">
            Choose Your Perfect Skip Size
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Select the skip size that best fits your project needs. All prices
            include VAT and delivery.
          </p>
        </div>

        {/* Skip Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skips.map((skip) => (
            <SkipCard
              key={skip.id}
              skip={skip}
              isSelected={selectedSkip?.id === skip.id}
              onSelect={handleSkipSelect}
            />
          ))}
        </div>
      </main>

      {/* Selection Drawer */}
      {selectedSkip && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 animate-in slide-in-from-bottom duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            {/* Selected Skip Summary */}
            <div className="rounded-xl p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* Mini Skip Visual */}
                  <div className="w-16 h-12 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-md relative flex-shrink-0">
                    <div className="absolute inset-1 bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-sm"></div>
                    <div className="absolute inset-2 bg-gradient-to-b from-yellow-200 to-yellow-300 rounded-xs flex items-center justify-center">
                      <span className="text-blue-800 font-bold text-xs">
                        WW
                      </span>
                    </div>
                  </div>

                  {/* Skip Details */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-300">
                      {selectedSkip.size} Yard Skip
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {selectedSkip.hire_period_days} day hire period
                    </p>

                    {/* Features */}
                    <div className="flex gap-2 mt-2">
                      {selectedSkip.allowed_on_road && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          Road Placement
                        </span>
                      )}
                      {selectedSkip.allows_heavy_waste && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          Heavy Waste OK
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="text-center sm:text-right">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {formatPrice(
                      calculatePriceWithVAT(
                        selectedSkip.price_before_vat,
                        selectedSkip.vat
                      )
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    Inc. VAT & Delivery
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="rounded-lg p-4">
              <p className="text-xs text-gray-400 leading-relaxed">
                <span className="font-medium">Please note:</span> Imagery and
                information shown throughout this website may not reflect the
                exact shape or size specification, colours may vary, options
                and/or accessories may be featured at additional cost.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={onBack}
                className="px-6 py-3 bg-gray-700 text-gray-200 font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back
              </button>

              <button
                onClick={handleContinue}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer flex items-center gap-2"
              >
                Continue
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-600 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-300">
            <p>
              Need help choosing? Contact our team at{" "}
              <a
                href="mailto:support@wewantwaste.co.uk"
                className="text-blue-600 hover:underline"
              >
                support@wewantwaste.co.uk
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
