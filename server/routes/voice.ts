import { Router, Request, Response } from 'express';

export const voiceRouter = Router();

// POST /api/voice/parse - Parse transcript into structured grievance
voiceRouter.post('/parse', (req: Request, res: Response) => {
  const { transcript } = req.body;

  if (!transcript || typeof transcript !== 'string') {
    return res.status(400).json({ success: false, error: 'Voice transcript is required' });
  }

  const lower = transcript.toLowerCase();
  let category = 'water';
  let title = 'Reported Rural Infrastructure Grievance';
  let priority = 'medium';
  let aiSeverityScore = 80;
  let aiDepartment = 'TWAD Board & Rural Development Mission';
  let ward = 'Ward 4 (West Street / Melur)';
  let landmark = 'Near Village Public Center';

  if (lower.includes('water') || lower.includes('pipe') || lower.includes('leak') || lower.includes('handpump') || lower.includes('tank')) {
    category = 'water';
    title = 'Drinking Water Pipeline / Handpump Issue';
    aiDepartment = 'TWAD Board (Tamil Nadu Water Supply & Drainage)';
    aiSeverityScore = 88;
    priority = 'high';
  } else if (lower.includes('road') || lower.includes('pothole') || lower.includes('crater') || lower.includes('bridge')) {
    category = 'roads';
    title = 'Panchayat Link Road Repair Needed';
    aiDepartment = 'Highways & Rural Works Department';
    aiSeverityScore = 75;
    priority = 'medium';
  } else if (lower.includes('light') || lower.includes('solar') || lower.includes('lamp') || lower.includes('dark')) {
    category = 'lighting';
    title = 'Non-Functional Solar Street Light';
    aiDepartment = 'TEDA (Tamil Nadu Energy Development Agency)';
    aiSeverityScore = 65;
    priority = 'medium';
  } else if (lower.includes('wire') || lower.includes('transformer') || lower.includes('electric') || lower.includes('power')) {
    category = 'electricity';
    title = 'Electrical Hazard / Transformer Sparking';
    aiDepartment = 'TANGEDCO Rural Distribution';
    aiSeverityScore = 95;
    priority = 'urgent';
  } else if (lower.includes('waste') || lower.includes('garbage') || lower.includes('drain') || lower.includes('sewage')) {
    category = 'waste';
    title = 'Drainage Overflow & Waste Clearance';
    aiDepartment = 'Clean Village Mission & Panchayat Sanitation Cell';
    aiSeverityScore = 78;
    priority = 'high';
  }

  if (lower.includes('ward 1') || lower.includes('north')) ward = 'Ward 1 (North Street / Vadakku)';
  else if (lower.includes('ward 2') || lower.includes('east')) ward = 'Ward 2 (East Street / Kizhur)';
  else if (lower.includes('ward 3') || lower.includes('south')) ward = 'Ward 3 (South Street / Therku)';
  else if (lower.includes('ward 4') || lower.includes('west')) ward = 'Ward 4 (West Street / Melur)';
  else if (lower.includes('ward 5') || lower.includes('temple')) ward = 'Ward 5 (Temple Road / Kovil Theru)';

  res.json({
    success: true,
    data: {
      transcript,
      parsed: {
        title,
        description: transcript,
        category,
        priority,
        aiSeverityScore,
        aiDepartment,
        ward,
        landmark,
        coordinates: [9.1726, 77.8681]
      }
    }
  });
});
