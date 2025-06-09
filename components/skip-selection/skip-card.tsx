import { Skip } from "@/types/skip.types";
import { calculatePriceWithVAT, formatPrice } from "@/utils/price.utils";

interface SkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: (skip: Skip) => void;
  className?: string;
}

export function SkipCard({
  skip,
  isSelected,
  onSelect,
  className = "",
}: SkipCardProps) {
  const priceWithVAT = calculatePriceWithVAT(skip.price_before_vat, skip.vat);

  return (
    <div
      className={`relative rounded-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
        isSelected ? "ring-4 ring-blue-500" : "border-gray-600 border"
      } ${className}`}
      onClick={() => onSelect(skip)}
    >
      {/* Skip Size Badge */}
      <div className="absolute -top-4 left-6 z-10">
        <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
          {skip.size} Yards
        </div>
      </div>

      {/* Skip Visual */}
      <div className="p-6 pt-8">
        <div className="relative mb-6">
          <div className="w-full h-40 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-lg relative overflow-hidden">
            <div className="absolute inset-2 bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-md"></div>
            <div className="absolute inset-4 bg-gradient-to-b from-yellow-200 to-yellow-300 rounded-sm flex items-center justify-center">
              <div className="text-center">
                <div className="text-blue-800 font-bold text-lg mb-1">WE</div>
                <div className="text-blue-800 font-bold text-lg mb-1">WANT</div>
                <div className="text-blue-800 font-bold text-lg">WASTE</div>
              </div>
            </div>
            <div className="absolute top-4 left-0 w-1 h-8 bg-yellow-600 rounded-r"></div>
            <div className="absolute top-4 right-0 w-1 h-8 bg-yellow-600 rounded-l"></div>
          </div>
        </div>

        {/* Skip Info */}
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-300 mb-2">
              {skip.size} Yard Skip
            </h3>
            <p className="text-gray-400">
              {skip.hire_period_days} day hire period
            </p>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 justify-center">
            {skip.allowed_on_road && (
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                Road Placement
              </span>
            )}
            {skip.allows_heavy_waste && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                Heavy Waste OK
              </span>
            )}
          </div>

          {/* Price */}
          <div className="text-center py-4">
            <div className="text-4xl font-bold text-blue-600 mb-1">
              {formatPrice(priceWithVAT)}
            </div>
            <div className="text-sm text-gray-500">Inc. VAT & Delivery</div>
          </div>

          {/* Select Button */}
          <button
            className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 cursor-pointer ${
              isSelected
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {isSelected ? "Selected ✓" : "Select This Skip"}
          </button>
        </div>
      </div>
    </div>
  );
}
