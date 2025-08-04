// src/components/PricingComparison.tsx

import { PricingTier } from '../types';

interface PricingComparisonProps {
  pricingTiers: PricingTier[];
}

export default function PricingComparison({ pricingTiers }: PricingComparisonProps) {
  // Color coding for pricing tiers
  const tierColors = {
    'Free': 'bg-green-100 text-green-800',
    'Basic': 'bg-blue-100 text-blue-800',
    'Pro': 'bg-purple-100 text-purple-800',
    'Enterprise': 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tier
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Features
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {pricingTiers.map((tier) => (
            <tr key={tier.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${tierColors[tier.tier_name as keyof typeof tierColors] || 'bg-gray-100 text-gray-800'}`}>
                  {tier.tier_name}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {tier.price}
              </td>
              <td className="px-6 py-4">
                <ul className="text-sm text-gray-700 space-y-1">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}