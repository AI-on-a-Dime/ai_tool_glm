// src/components/BenchmarkChart.tsx

import { Benchmark } from '../types';

interface BenchmarkChartProps {
  benchmarks: Benchmark[];
}

export default function BenchmarkChart({ benchmarks }: BenchmarkChartProps) {
  // Group benchmarks by source_name
  const benchmarksBySource = benchmarks.reduce((acc, benchmark) => {
    if (!acc[benchmark.source_name]) {
      acc[benchmark.source_name] = [];
    }
    acc[benchmark.source_name].push(benchmark);
    return acc;
  }, {} as Record<string, Benchmark[]>);

  // Find the maximum score for each source to normalize the bar lengths
  const maxScores = Object.entries(benchmarksBySource).reduce((acc, [source, benchmarks]) => {
    acc[source] = Math.max(...benchmarks.map(b => b.score_value));
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-8">
      {Object.entries(benchmarksBySource).map(([source, benchmarks]) => (
        <div key={source} className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{source} Benchmarks</h3>
          <div className="space-y-4">
            {benchmarks.map((benchmark) => (
              <div key={benchmark.id}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{benchmark.score_name}</span>
                  <span className="text-sm font-medium text-gray-700">{benchmark.score_value}{benchmark.rank && ` (Rank: ${benchmark.rank})`}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-indigo-600 h-2.5 rounded-full" 
                    style={{ width: `${(benchmark.score_value / maxScores[source]) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Last updated: {new Date(benchmark.last_updated).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}