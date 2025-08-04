// src/pages/category/[id].tsx

import { GetStaticPaths, GetStaticProps } from 'next';
import { Category, Tool } from '../../types';
import ToolCard from '../../components/ToolCard';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/router';

interface CategoryPageProps {
  category: Category;
  tools: Tool[];
}

export default function CategoryPage({ category, tools }: CategoryPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
          <p className="text-gray-600">{category.description}</p>
        </div>

        {tools.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No tools found</h2>
            <p className="text-gray-600">There are no tools in this category yet.</p>
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

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: categories } = await supabase
    .from('categories')
    .select('id');

  const paths = categories?.map((category) => ({
    params: { id: category.id },
  })) || [];

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categoryId = params?.id as string;

  // Fetch category details
  const { data: category, error: categoryError } = await supabase
    .from('categories')
    .select('*')
    .eq('id', categoryId)
    .single();

  if (categoryError || !category) {
    return {
      notFound: true,
    };
  }

  // Fetch tools in this category
  const { data: tools, error: toolsError } = await supabase
    .from('tools')
    .select('*')
    .eq('category_id', categoryId);

  if (toolsError) {
    console.error('Error fetching tools:', toolsError);
    return {
      props: {
        category,
        tools: [],
      },
    };
  }

  return {
    props: {
      category,
      tools: tools || [],
    },
    revalidate: 60 * 60, // Revalidate every hour
  };
};