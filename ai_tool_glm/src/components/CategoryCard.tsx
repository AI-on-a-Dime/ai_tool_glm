// src/components/CategoryCard.tsx

import Link from 'next/link';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/category/${category.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 cursor-pointer h-full flex flex-col">
        <div className="flex items-center mb-4">
          <img 
            src={category.icon_url} 
            alt={category.name} 
            className="w-12 h-12 object-contain mr-4"
          />
          <h2 className="text-xl font-semibold text-gray-800">{category.name}</h2>
        </div>
        <p className="text-gray-600 flex-grow">{category.description}</p>
        <div className="mt-4 text-indigo-600 font-medium flex items-center">
          Explore tools
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </Link>
  );
}