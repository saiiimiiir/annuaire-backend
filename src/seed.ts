import mongoose from 'mongoose';
import Tool from './models/Tool.js';

const mongoURI = 'mongodb://saiiimiiir:DJ%24m3b310@127.0.0.1:27017/annuaire?authSource=admin&serverSelectionTimeoutMS=2000';

const tools = [
  // Text
  { name: 'ChatGPT', company: 'OpenAI', pricing: 'Free / Plus ($20/mo)', version: 'GPT-4o', description: { en: 'Versatile conversational AI by OpenAI.', fr: 'IA conversationnelle polyvalente par OpenAI.' }, url: 'https://chatgpt.com', category: 'text' },
  { name: 'Claude', company: 'Anthropic', pricing: 'Free / Pro ($20/mo)', version: '3.5 Sonnet', description: { en: 'Powerful AI assistant for coding and writing by Anthropic.', fr: 'Puissant assistant IA pour le code et l\'écriture par Anthropic.' }, url: 'https://claude.ai', category: 'text' },
  { name: 'Gemini', company: 'Google', pricing: 'Free / Advanced (21.99€/mo)', version: '1.5 Pro', description: { en: 'Google\'s multimodal language model.', fr: 'Modèle linguistique multimodal de Google.' }, url: 'https://gemini.google.com', category: 'text' },
  { name: 'Perplexity', company: 'Perplexity AI', pricing: 'Free / Pro ($20/mo)', version: 'v1.0', description: { en: 'AI-assisted search engine with citations.', fr: 'Moteur de recherche assisté par l\'IA avec citations.' }, url: 'https://perplexity.ai', category: 'text' },
  { name: 'Grok', company: 'xAI', pricing: 'Included in X Premium', version: '2.0', description: { en: 'Conversational AI integrated into X (Twitter) by xAI.', fr: 'IA conversationnelle intégrée dans X (Twitter) par xAI.' }, url: 'https://x.ai', category: 'text' },
  { name: 'Jasper', company: 'Jasper AI', pricing: 'Starting from $39/mo', version: 'v2.0', description: { en: 'Content creation platform for marketing.', fr: 'Plateforme de création de contenu pour le marketing.' }, url: 'https://jasper.ai', category: 'text' },
  { name: 'Writesonic', company: 'Writesonic', pricing: 'Freemium', version: 'v3.0', description: { en: 'SEO writing and content creation tool.', fr: 'Outil de rédaction SEO et création de contenu.' }, url: 'https://writesonic.com', category: 'text' },
  { name: 'DeepSeek', company: 'DeepSeek', pricing: 'Free (Paid API)', version: 'V3', description: { en: 'Powerful open-source model specialized in coding and math.', fr: 'Modèle open-source puissant spécialisé en développement et mathématiques.' }, url: 'https://deepseek.com', category: 'text' },

  // Image
  { name: 'Midjourney', company: 'Midjourney Inc.', pricing: 'Starting from $10/mo', version: 'v6.1', description: { en: 'Ultra-realistic image generator via Discord.', fr: 'Générateur d\'images ultra-réalistes via Discord.' }, url: 'https://midjourney.com', category: 'image' },
  { name: 'DALL-E 3', company: 'OpenAI', pricing: 'Included in ChatGPT Plus', version: 'v3.0', description: { en: 'OpenAI\'s AI system that creates images from text.', fr: 'Système d\'IA d\'OpenAI qui crée des images à partir de texte.' }, url: 'https://openai.com/dall-e-3', category: 'image' },
  { name: 'Canva AI', company: 'Canva', pricing: 'Freemium', version: 'Magic Studio', description: { en: 'AI-assisted design tools.', fr: 'Outils de design assistés par l\'IA.' }, url: 'https://canva.com', category: 'image' },
  { name: 'Leonardo.ai', company: 'Leonardo Interactive', pricing: 'Freemium', version: 'Phoenix', description: { en: 'Creative image and game asset generation platform.', fr: 'Plateforme créative de génération d\'images et ressources de jeu.' }, url: 'https://leonardo.ai', category: 'image' },
  { name: 'Stable Diffusion', company: 'Stability AI', pricing: 'Open Source / Paid API', version: 'SDXL 1.0', description: { en: 'Open-source image generation model.', fr: 'Modèle de génération d\'images open-source.' }, url: 'https://stability.ai', category: 'image' },
  { name: 'Adobe Firefly', company: 'Adobe', pricing: 'Included in Creative Cloud', version: 'Image 3 Model', description: { en: 'Generative AI integrated into Creative Cloud tools.', fr: 'IA générative intégrée aux outils Creative Cloud.' }, url: 'https://adobe.com/firefly', category: 'image' },

  // Video
  { name: 'Sora', company: 'OpenAI', pricing: 'Coming soon', version: 'Beta', description: { en: 'OpenAI\'s text-to-video model.', fr: 'Modèle texte-vers-vidéo d\'OpenAI.' }, url: 'https://openai.com/sora', category: 'video' },
  { name: 'Runway Gen-3', company: 'Runway', pricing: 'Starting from $12/mo', version: 'Gen-3 Alpha', description: { en: 'Creative tool suite for AI video generation.', fr: 'Suite d\'outils créatifs pour la génération de vidéos par IA.' }, url: 'https://runwayml.com', category: 'video' },
  { name: 'Luma Dream Machine', company: 'Luma Labs', pricing: 'Freemium', version: 'v1.5', description: { en: 'Realistic and smooth video generator.', fr: 'Générateur de vidéos réalistes et fluides.' }, url: 'https://lumalabs.ai', category: 'video' },
  { name: 'Pika Labs', company: 'Pika', pricing: 'Freemium', version: 'v1.5', description: { en: 'Video creation and animation platform.', fr: 'Plateforme de création et d\'animation vidéo.' }, url: 'https://pika.art', category: 'video' },
  { name: 'Synthesia', company: 'Synthesia', pricing: 'Starting from $22/mo', version: 'v4.0', description: { en: 'Video creation with AI avatars.', fr: 'Création de vidéos avec avatars IA.' }, url: 'https://synthesia.io', category: 'video' },
  { name: 'HeyGen', company: 'HeyGen', pricing: 'Freemium', version: 'v2.0', description: { en: 'Avatar video generation platform for business.', fr: 'Plateforme de génération de vidéos d\'avatars pour entreprises.' }, url: 'https://heygen.com', category: 'video' },

  // Code
  { name: 'GitHub Copilot', company: 'Microsoft / GitHub', pricing: '$10/mo (Individual)', version: 'v1.0', description: { en: 'The world\'s most widely used AI code assistant.', fr: 'L\'assistant de code par IA le plus utilisé au monde.' }, url: 'https://github.com/features/copilot', category: 'code' },
  { name: 'Cursor', company: 'Anysphere', pricing: 'Freemium / $20/mo', version: 'v0.40', description: { en: 'Code editor (VS Code fork) optimized for AI.', fr: 'Éditeur de code (dérivé de VS Code) optimisé pour l\'IA.' }, url: 'https://cursor.com', category: 'code' },
  { name: 'Cody', company: 'Sourcegraph', pricing: 'Freemium / $9/mo', version: 'v1.0', description: { en: 'Intelligent code assistant by Sourcegraph.', fr: 'Assistant de code intelligent par Sourcegraph.' }, url: 'https://sourcegraph.com/cody', category: 'code' },
  { name: 'Blackbox AI', company: 'Blackbox AI', pricing: 'Freemium', version: 'v1.0', description: { en: 'Coding assistant and snippet search.', fr: 'Assistant de codage et recherche de snippets.' }, url: 'https://blackbox.ai', category: 'code' },
  { name: 'Tabnine', company: 'Tabnine', pricing: 'Freemium / $12/mo', version: 'v1.0', description: { en: 'Code assistant for enterprises with a privacy focus.', fr: 'Assistant de code pour entreprises axé sur la confidentialité.' }, url: 'https://tabnine.com', category: 'code' },
  { name: 'Replit Ghostwriter', company: 'Replit', pricing: 'Included in Replit Core', version: 'v1.0', description: { en: 'AI integrated into Replit\'s online IDE.', fr: 'IA intégrée dans l\'IDE en ligne de Replit.' }, url: 'https://replit.com/ghostwriter', category: 'code' },

  // Other/Productivity
  { name: 'Notion AI', company: 'Notion Labs', pricing: '$10/mo', version: 'v1.0', description: { en: 'Writing and organization assistant in Notion.', fr: 'Assistant d\'écriture et d\'organisation dans Notion.' }, url: 'https://notion.so', category: 'other' },
  { name: 'Grammarly', company: 'Grammarly Inc.', pricing: 'Freemium / Premium ($12/mo)', version: 'v1.0', description: { en: 'Writing and grammar correction assistant.', fr: 'Assistant d\'écriture et de correction de grammaire.' }, url: 'https://grammarly.com', category: 'other' },
  { name: 'Zapier Central', company: 'Zapier', pricing: 'Freemium', version: 'v1.0', description: { en: 'AI to automate complex workflows without code.', fr: 'IA pour automatiser des flux de travail complexes sans code.' }, url: 'https://zapier.com', category: 'other' },
  { name: 'Fireflies.ai', company: 'Fireflies.ai', pricing: 'Freemium / $10/mo', version: 'v1.0', description: { en: 'Note-taking and automatic meeting transcription.', fr: 'Prise de notes et transcription automatique de réunions.' }, url: 'https://fireflies.ai', category: 'other' }
];

export async function seed() {
  try {
    console.log('Connected to MongoDB for seeding...');

    await Tool.deleteMany({});
    console.log('Old data cleared.');

    await Tool.insertMany(tools);
    console.log(`${tools.length} tools inserted successfully with detailed info.`);

    // Don't process.exit here so the server keeps running!
  } catch (err) {
    console.error('Error seeding data:', err);
    throw err;
  }
}

// Run it if executed directly
if (import.meta.url.endsWith(process.argv[1])) {
  mongoose.connect(mongoURI).then(() => {
    seed().then(() => {
      console.log('Seeded successfully');
      process.exit(0);
    });
  });
}
