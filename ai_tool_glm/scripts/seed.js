// scripts/seed.js

const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL and service role key must be provided in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedDatabase() {
  console.log('Seeding database...');

  // Seed categories
  const { data: categories, error: categoriesError } = await supabase
    .from('categories')
    .insert([
      {
        id: 'chat-assistants',
        name: 'Chat & Assistants',
        description: 'AI chatbots and virtual assistants for conversation and task completion.',
        icon_url: '/icons/chat.svg',
      },
      {
        id: 'image-generation',
        name: 'Image Generation',
        description: 'Tools that create images from text descriptions or modify existing images.',
        icon_url: '/icons/image.svg',
      },
      {
        id: 'video',
        name: 'Video',
        description: 'AI tools for video creation, editing, and enhancement.',
        icon_url: '/icons/video.svg',
      },
      {
        id: 'text-to-speech',
        name: 'Text-to-Speech',
        description: 'Convert written text into natural-sounding spoken audio.',
        icon_url: '/icons/audio.svg',
      },
      {
        id: 'coding',
        name: 'Coding',
        description: 'AI assistants for writing, debugging, and optimizing code.',
        icon_url: '/icons/code.svg',
      },
      {
        id: 'music-generation',
        name: 'Music Generation',
        description: 'Create original music compositions with AI.',
        icon_url: '/icons/music.svg',
      },
      {
        id: 'productivity',
        name: 'Productivity',
        description: 'AI tools to enhance workflow and personal productivity.',
        icon_url: '/icons/productivity.svg',
      },
      {
        id: 'api-tuning',
        name: 'API & Tuning',
        description: 'Services for fine-tuning AI models and accessing AI capabilities via API.',
        icon_url: '/icons/api.svg',
      },
    ])
    .select();

  if (categoriesError) {
    console.error('Error seeding categories:', categoriesError);
  } else {
    console.log('Categories seeded successfully:', categories);
  }

  // Seed tools for Chat & Assistants category
  const { data: tools, error: toolsError } = await supabase
    .from('tools')
    .insert([
      {
        id: 'chatgpt',
        category_id: 'chat-assistants',
        name: 'ChatGPT',
        description: 'A conversational AI system that listens, learns, and challenges.',
        url: 'https://chat.openai.com',
        logo_url: '/logos/chatgpt.png',
      },
      {
        id: 'claude',
        category_id: 'chat-assistants',
        name: 'Claude',
        description: 'An AI assistant focused on being helpful, harmless, and honest.',
        url: 'https://claude.ai',
        logo_url: '/logos/claude.png',
      },
      {
        id: 'gemini',
        category_id: 'chat-assistants',
        name: 'Gemini',
        description: 'Google\'s conversational AI assistant with multimodal capabilities.',
        url: 'https://gemini.google.com',
        logo_url: '/logos/gemini.png',
      },
      {
        id: 'copilot',
        category_id: 'chat-assistants',
        name: 'Microsoft Copilot',
        description: 'Your everyday AI companion from Microsoft.',
        url: 'https://copilot.microsoft.com',
        logo_url: '/logos/copilot.png',
      },
      {
        id: 'perplexity',
        category_id: 'chat-assistants',
        name: 'Perplexity',
        description: 'An AI-powered answer engine that provides accurate answers to complex questions.',
        url: 'https://perplexity.ai',
        logo_url: '/logos/perplexity.png',
      },
    ])
    .select();

  if (toolsError) {
    console.error('Error seeding tools:', toolsError);
  } else {
    console.log('Tools seeded successfully:', tools);
  }

  // Seed pricing tiers for ChatGPT
  const { data: pricingTiers, error: pricingTiersError } = await supabase
    .from('pricing_tiers')
    .insert([
      {
        id: 'chatgpt-free',
        tool_id: 'chatgpt',
        tier_name: 'Free',
        price: '$0',
        features: [
          'GPT-3.5 model access',
          'Limited usage during peak times',
          'Standard response speed',
          'Web browsing capabilities',
        ],
      },
      {
        id: 'chatgpt-plus',
        tool_id: 'chatgpt',
        tier_name: 'Plus',
        price: '$20/month',
        features: [
          'GPT-4 model access',
          'Priority access during peak times',
          'Faster response speed',
          'Access to new features',
          'Web browsing capabilities',
          'Plugin access',
          'Advanced data analysis',
        ],
      },
    ])
    .select();

  if (pricingTiersError) {
    console.error('Error seeding pricing tiers:', pricingTiersError);
  } else {
    console.log('Pricing tiers seeded successfully:', pricingTiers);
  }

  // Seed benchmarks for ChatGPT
  const { data: benchmarks, error: benchmarksError } = await supabase
    .from('benchmarks')
    .insert([
      {
        id: 'chatgpt-lmsys-arena',
        tool_id: 'chatgpt',
        source_name: 'LMSYS Chatbot Arena',
        score_name: 'Elo Rating',
        score_value: 1250,
        rank: 2,
        last_updated: '2023-11-01',
      },
      {
        id: 'chatgpt-mt-bench',
        tool_id: 'chatgpt',
        source_name: 'MT-Bench',
        score_name: 'Overall Score',
        score_value: 8.5,
        rank: 1,
        last_updated: '2023-10-15',
      },
    ])
    .select();

  if (benchmarksError) {
    console.error('Error seeding benchmarks:', benchmarksError);
  } else {
    console.log('Benchmarks seeded successfully:', benchmarks);
  }

  console.log('Database seeding completed!');
}

seedDatabase();