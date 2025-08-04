// src/types/index.ts

export interface Category {
  id: string;
  name: string;
  description: string;
  icon_url: string;
}

export interface Tool {
  id: string;
  category_id: string;
  name: string;
  description: string;
  url: string;
  logo_url: string;
}

export interface PricingTier {
  id: string;
  tool_id: string;
  tier_name: string;
  price: string;
  features: string[];
}

export interface Benchmark {
  id: string;
  tool_id: string;
  source_name: string;
  score_name: string;
  score_value: number;
  rank?: number;
  last_updated: string;
}

export interface ToolWithDetails extends Tool {
  category?: Category;
  pricing_tiers?: PricingTier[];
  benchmarks?: Benchmark[];
}