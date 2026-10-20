import { Router } from 'express';
import intakeService from '../services/intake.service.js';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const result = await intakeService.createIntakePreview(req.body);
    res.status(201).json({
      ok: true,
      id: result.id,
      preview: result,
      message: 'Intake preview created successfully.',
    });
  } catch (err) {
    next(err);
  }
});

export default router;
