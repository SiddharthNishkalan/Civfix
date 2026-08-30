import { Router, Request, Response } from 'express';
import { db } from '../db/store';
import { IssueStatus } from '../../src/types';

export const issuesRouter = Router();

// GET /api/issues - List issues with query filters
issuesRouter.get('/', (req: Request, res: Response) => {
  const { status, category, priority, ward, search } = req.query;
  const issues = db.getIssues({
    status: status as string,
    category: category as string,
    priority: priority as string,
    ward: ward as string,
    search: search as string
  });

  res.json({
    success: true,
    count: issues.length,
    data: issues
  });
});

// GET /api/issues/:id - Single issue details
issuesRouter.get('/:id', (req: Request, res: Response) => {
  const issue = db.getIssueById(String(req.params.id));
  if (!issue) {
    return res.status(404).json({ success: false, error: 'Grievance not found' });
  }

  res.json({
    success: true,
    data: issue
  });
});

// POST /api/issues - Submit new grievance
issuesRouter.post('/', (req: Request, res: Response) => {
  const { title, description, category, ward, landmark, coordinates, photoBefore, voiceTranscript, priority } = req.body;

  if (!title || !description) {
    return res.status(400).json({ success: false, error: 'Title and description are required' });
  }

  const createdIssue = db.createIssue({
    title,
    description,
    category,
    ward,
    landmark,
    coordinates,
    photoBefore,
    voiceTranscript,
    priority
  });

  // Award citizen 50 civic points for reporting
  db.updateUserPoints('citizen', 50);

  res.status(201).json({
    success: true,
    message: 'Grievance registered successfully with AI department routing',
    data: createdIssue
  });
});

// PATCH /api/issues/:id/status - Update issue status & add resolution evidence
issuesRouter.patch('/:id/status', (req: Request, res: Response) => {
  const { status, notes, photoAfterUrl, materialsUsed } = req.body;

  if (!status) {
    return res.status(400).json({ success: false, error: 'Status is required' });
  }

  const updatedIssue = db.updateIssueStatus(
    String(req.params.id), 
    status as IssueStatus, 
    notes, 
    photoAfterUrl, 
    materialsUsed
  );

  if (!updatedIssue) {
    return res.status(404).json({ success: false, error: 'Grievance not found' });
  }

  res.json({
    success: true,
    message: `Grievance status updated to ${status}`,
    data: updatedIssue
  });
});

// POST /api/issues/:id/upvote - Upvote / endorse issue
issuesRouter.post('/:id/upvote', (req: Request, res: Response) => {
  const { userId } = req.body;
  const result = db.upvoteIssue(String(req.params.id), userId || 'USR-7821');

  if (!result.issue) {
    return res.status(404).json({ success: false, error: 'Grievance not found' });
  }

  res.json({
    success: true,
    upvoted: result.upvoted,
    upvotes: result.issue.upvotes,
    data: result.issue
  });
});

// POST /api/issues/:id/comments - Add community comment
issuesRouter.post('/:id/comments', (req: Request, res: Response) => {
  const { author, role, text } = req.body;

  if (!text) {
    return res.status(400).json({ success: false, error: 'Comment text is required' });
  }

  const updatedIssue = db.addComment(
    String(req.params.id), 
    author || 'Selvi Murugan (Citizen)', 
    role || 'citizen', 
    text
  );

  if (!updatedIssue) {
    return res.status(404).json({ success: false, error: 'Grievance not found' });
  }

  res.json({
    success: true,
    message: 'Comment posted',
    data: updatedIssue
  });
});

// POST /api/issues/:id/escalate - Escalate to District Collector
issuesRouter.post('/:id/escalate', (req: Request, res: Response) => {
  const { reason, citizenName } = req.body;
  const issue = db.getIssueById(String(req.params.id));

  if (!issue) {
    return res.status(404).json({ success: false, error: 'Grievance not found' });
  }

  // Escalate priority and log to timeline
  issue.priority = 'urgent';
  issue.timeline.push({
    status: issue.status,
    title: 'Escalated to District Collector (DM)',
    description: reason || `Citizen escalated grievance for immediate administrative intervention under Tamil Nadu Public Service Guarantee Act.`,
    timestamp: new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }),
    by: citizenName || 'Citizen Escalation Cell'
  });

  res.json({
    success: true,
    message: 'Grievance successfully escalated to District Collectorate Command HQ',
    data: issue
  });
});
