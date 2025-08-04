// src/pages/tool/[id].tsx

import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { ToolWithDetails } from '../../types';
import PricingComparison from '../../components/PricingComparison';
import BenchmarkChart from '../../components/BenchmarkChart';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/router';

interface ToolPageProps {
  tool: ToolWithDetails;
}

export default function ToolPage({ tool }: ToolPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start mb-6">
            <div className="relative w-24 h-24 mb-4 md:mb-0 md:mr-6 flex-shrink-0">
              <Image 
                src={tool.logo_url} 
                alt={tool.name} 
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="flex-grow">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{tool.name}</h1>
              <p className="text-gray-600 mb-4">{tool.description}</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                  {tool.category?.name}
                </span>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <a 
                href={tool.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Visit Website
              </a>
            </div>
          </div>
        </div>

        {tool.pricing_tiers && tool.pricing_tiers.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pricing</h2>
            <PricingComparison pricingTiers={tool.pricing_tiers} />
          </div>
        )}

        {tool.benchmarks && tool.benchmarks.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Benchmark Results</h2>
            <BenchmarkChart benchmarks={tool.benchmarks} />
          </div>
        )}
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: tools } = await supabase
    .from('tools')
    .select('id');

  const paths = tools?.map((tool) => ({
    params: { id: tool.id },
  })) || [];

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const toolId = params?.id as string;

  // Fetch tool details
  const { data: tool, error: toolError } = await supabase
    .from('tools')
    .select(`
      *,
      category:categories(*),
      pricing_tiers:pricing_tiers(*),
      benchmarks:benchmarks(*)
    `)
    .eq('id', toolId)
    .single();

  if (toolError || !tool) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      tool,
    },
    revalidate: 60 * 60, // Revalidate every hour
  };
};