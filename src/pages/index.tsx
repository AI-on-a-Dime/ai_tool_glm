// src/pages/index.tsx

import { GetStaticProps } from 'next';
import { Category } from '../types';
import CategoryCard from '../components/CategoryCard';
import { supabase } from '../lib/supabase';

interface HomeProps {
  categories: Category[];
}

export default function Home({ categories }: HomeProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Tools Comparison</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore, compare, and find the right AI tools for your needs. Browse by category, compare pricing, and view benchmark results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*');

  if (error) {
    console.error('Error fetching categories:', error);
    return { props: { categories: [] } };
  }

  return {
    props: {
      categories: categories || [],
    },
    revalidate: 60 * 60, // Revalidate every hour
  };
};