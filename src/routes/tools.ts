import { Router, Request, Response } from 'express';
import Tool from '../models/Tool.js';

const router = Router();

const API_KEY = 'secret-alfred-2026'; // À mettre dans un .env en production

// Middleware to check API Key
const protect = (req: Request, res: Response, next: any) => {
  const key = req.headers['x-api-key'];
  if (key === API_KEY) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized: Invalid API Key' });
  }
};

// Get all tools
router.get('/', async (req: Request, res: Response) => {
  try {
    const tools = await Tool.find();
    res.json(tools);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Increment click count for today
router.post('/:id/click', async (req: Request, res: Response) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tool = await Tool.findById(req.params.id);
    if (!tool) return res.status(404).json({ message: 'Tool not found' });

    const statIndex = tool.clickStats.findIndex(s => s.date.getTime() === today.getTime());

    if (statIndex > -1) {
      tool.clickStats[statIndex].count += 1;
    } else {
      tool.clickStats.push({ date: today, count: 1 });
    }

    await tool.save();
    res.json({ message: 'Click tracked' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new tool
router.post('/', async (req: Request, res: Response) => {
  const tool = new Tool({
    name: req.body.name,
    description: req.body.description,
    url: req.body.url,
    category: req.body.category,
    logoUrl: req.body.logoUrl
  });

  try {
    const newTool = await tool.save();
    res.status(201).json(newTool);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// Add a new tool (Secured)
router.post('/add', protect, async (req: Request, res: Response) => {
  const { name, description, url, category, company, pricing, version, logoUrl } = req.body;
  
  const tool = new Tool({
    name,
    description,
    url,
    category,
    company,
    pricing,
    version,
    logoUrl,
    clickStats: []
  });

  try {
    const newTool = await tool.save();
    res.status(201).json(newTool);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
