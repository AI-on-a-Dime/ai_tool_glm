// src/pages/search.tsx

import { GetServerSideProps } from 'next';
import { Tool } from '../types';
import ToolCard from '../components/ToolCard';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';

interface SearchPageProps {
  tools: Tool[];
  query: string;
}

export default function SearchPage({ tools, query }: SearchPageProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Results</h1>
          <p className="text-gray-600">
            Showing results for: <span className="font-medium">"{query}"</span>
          </p>
        </div>

        {tools.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No tools found</h2>
            <p className="text-gray-600">Try a different search term or browse by category.</p>
            <button
              onClick={() => router.push('/')}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Browse Categories
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const searchQuery = query.q as string || '';

  if (!searchQuery) {
    return {
      props: {
        tools: [],
        query: '',
      },
    };
  }

  // Search for tools by name or description
  const { data: tools, error } = await supabase
    .from('tools')
    .select('*')
    .or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);

  if (error) {
    console.error('Error searching tools:', error);
    return {
      props: {
        tools: [],
        query: searchQuery,
      },
    };
  }

  return {
    props: {
      tools: tools || [],
      query: searchQuery,
    },
  };
};