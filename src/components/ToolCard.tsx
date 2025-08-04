// src/components/ToolCard.tsx

import Image from 'next/image';
import { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
      <div className="flex items-start mb-4">
        <div className="relative w-16 h-16 mr-4 flex-shrink-0">
          <Image 
            src={tool.logo_url} 
            alt={tool.name} 
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{tool.name}</h3>
          <p className="text-gray-600 mt-1">{tool.description}</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <a 
          href={tool.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Visit site
        </a>
        <a 
          href={`/tool/${tool.id}`}
          className="text-gray-700 hover:text-indigo-600 font-medium"
        >
          View details
        </a>
      </div>
    </div>
  );
}