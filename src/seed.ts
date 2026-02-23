import mongoose from 'mongoose';
import Tool from './models/Tool.js';

const mongoURI = 'mongodb://saiiimiiir:DJ%24m3b310@localhost:27017/annuaire?authSource=admin';

const tools = [
  // Text
  { name: 'ChatGPT', company: 'OpenAI', pricing: 'Gratuit / Plus ($20/mo)', version: 'GPT-4o', description: 'IA conversationnelle polyvalente par OpenAI.', url: 'https://chatgpt.com', category: 'text' },
  { name: 'Claude', company: 'Anthropic', pricing: 'Gratuit / Pro ($20/mo)', version: '3.5 Sonnet', description: 'Assistant IA performant pour le code et la rédaction par Anthropic.', url: 'https://claude.ai', category: 'text' },
  { name: 'Gemini', company: 'Google', pricing: 'Gratuit / Advanced (21.99€/mo)', version: '1.5 Pro', description: 'Modèle de langage multimodal de Google.', url: 'https://gemini.google.com', category: 'text' },
  { name: 'Perplexity', company: 'Perplexity AI', pricing: 'Gratuit / Pro ($20/mo)', version: 'v1.0', description: 'Moteur de recherche assisté par IA avec citations.', url: 'https://perplexity.ai', category: 'text' },
  { name: 'Grok', company: 'xAI', pricing: 'Inclus dans X Premium', version: '2.0', description: 'IA conversationnelle intégrée à X (Twitter) par xAI.', url: 'https://x.ai', category: 'text' },
  { name: 'Jasper', company: 'Jasper AI', pricing: 'À partir de $39/mo', version: 'v2.0', description: 'Plateforme de création de contenu pour le marketing.', url: 'https://jasper.ai', category: 'text' },
  { name: 'Writesonic', company: 'Writesonic', pricing: 'Freemium', version: 'v3.0', description: 'Outil de rédaction SEO et création de contenu.', url: 'https://writesonic.com', category: 'text' },
  { name: 'DeepSeek', company: 'DeepSeek', pricing: 'Gratuit (API payante)', version: 'V3', description: 'Modèle open-source performant spécialisé dans le code et les maths.', url: 'https://deepseek.com', category: 'text' },

  // Image
  { name: 'Midjourney', company: 'Midjourney Inc.', pricing: 'À partir de $10/mo', version: 'v6.1', description: 'Générateur d\'images ultra-réalistes via Discord.', url: 'https://midjourney.com', category: 'image' },
  { name: 'DALL-E 3', company: 'OpenAI', pricing: 'Inclus dans ChatGPT Plus', version: 'v3.0', description: 'Système d\'IA d\'OpenAI qui crée des images à partir de texte.', url: 'https://openai.com/dall-e-3', category: 'image' },
  { name: 'Canva AI', company: 'Canva', pricing: 'Freemium', version: 'Magic Studio', description: 'Outils de design assistés par IA.', url: 'https://canva.com', category: 'image' },
  { name: 'Leonardo.ai', company: 'Leonardo Interactive', pricing: 'Freemium', version: 'Phoenix', description: 'Plateforme de génération d\'images créatives et assets de jeux.', url: 'https://leonardo.ai', category: 'image' },
  { name: 'Stable Diffusion', company: 'Stability AI', pricing: 'Open Source / API Payante', version: 'SDXL 1.0', description: 'Modèle de génération d\'images open-source.', url: 'https://stability.ai', category: 'image' },
  { name: 'Adobe Firefly', company: 'Adobe', pricing: 'Inclus dans Creative Cloud', version: 'Image 3 Model', description: 'IA générative intégrée aux outils Creative Cloud.', url: 'https://adobe.com/firefly', category: 'image' },

  // Video
  { name: 'Sora', company: 'OpenAI', pricing: 'Bientôt disponible', version: 'Beta', description: 'Modèle de texte-vers-vidéo d\'OpenAI.', url: 'https://openai.com/sora', category: 'video' },
  { name: 'Runway Gen-3', company: 'Runway', pricing: 'À partir de $12/mo', version: 'Gen-3 Alpha', description: 'Suite d\'outils créatifs pour la génération de vidéo par IA.', url: 'https://runwayml.com', category: 'video' },
  { name: 'Luma Dream Machine', company: 'Luma Labs', pricing: 'Freemium', version: 'v1.5', description: 'Générateur de vidéos réalistes et fluides.', url: 'https://lumalabs.ai', category: 'video' },
  { name: 'Pika Labs', company: 'Pika', pricing: 'Freemium', version: 'v1.5', description: 'Plateforme de création et d\'animation de vidéos.', url: 'https://pika.art', category: 'video' },
  { name: 'Synthesia', company: 'Synthesia', pricing: 'À partir de $22/mo', version: 'v4.0', description: 'Création de vidéos avec des avatars IA.', url: 'https://synthesia.io', category: 'video' },
  { name: 'HeyGen', company: 'HeyGen', pricing: 'Freemium', version: 'v2.0', description: 'Plateforme de génération de vidéos d\'avatar pour le business.', url: 'https://heygen.com', category: 'video' },

  // Code
  { name: 'GitHub Copilot', company: 'Microsoft / GitHub', pricing: '$10/mo (Individuel)', version: 'v1.0', description: 'L\'assistant de code par IA le plus utilisé au monde.', url: 'https://github.com/features/copilot', category: 'code' },
  { name: 'Cursor', company: 'Anysphere', pricing: 'Freemium / $20/mo', version: 'v0.40', description: 'Éditeur de code (fork VS Code) optimisé pour l\'IA.', url: 'https://cursor.com', category: 'code' },
  { name: 'Cody', company: 'Sourcegraph', pricing: 'Freemium / $9/mo', version: 'v1.0', description: 'Assistant de code intelligent par Sourcegraph.', url: 'https://sourcegraph.com/cody', category: 'code' },
  { name: 'Blackbox AI', company: 'Blackbox AI', pricing: 'Freemium', version: 'v1.0', description: 'Assistant de codage et recherche de snippets.', url: 'https://blackbox.ai', category: 'code' },
  { name: 'Tabnine', company: 'Tabnine', pricing: 'Freemium / $12/mo', version: 'v1.0', description: 'Assistant de code pour les entreprises avec focus vie privée.', url: 'https://tabnine.com', category: 'code' },
  { name: 'Replit Ghostwriter', company: 'Replit', pricing: 'Inclus dans Replit Core', version: 'v1.0', description: 'IA intégrée à l\'IDE en ligne Replit.', url: 'https://replit.com/ghostwriter', category: 'code' },

  // Other/Productivity
  { name: 'Notion AI', company: 'Notion Labs', pricing: '$10/mo', version: 'v1.0', description: 'Assistant d\'écriture et d\'organisation dans Notion.', url: 'https://notion.so', category: 'other' },
  { name: 'Grammarly', company: 'Grammarly Inc.', pricing: 'Freemium / Premium ($12/mo)', version: 'v1.0', description: 'Assistant d\'écriture et de correction grammaticale.', url: 'https://grammarly.com', category: 'other' },
  { name: 'Zapier Central', company: 'Zapier', pricing: 'Freemium', version: 'v1.0', description: 'IA pour automatiser des workflows complexes sans code.', url: 'https://zapier.com', category: 'other' },
  { name: 'Fireflies.ai', company: 'Fireflies.ai', pricing: 'Freemium / $10/mo', version: 'v1.0', description: 'Prise de notes et transcription automatique de réunions.', url: 'https://fireflies.ai', category: 'other' }
];

async function seed() {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB...');
    
    await Tool.deleteMany({});
    console.log('Old data cleared.');
    
    await Tool.insertMany(tools);
    console.log(`${tools.length} tools inserted successfully with detailed info.`);
    
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
}

seed();
