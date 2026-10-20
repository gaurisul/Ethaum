import intakeRepository from '../repositories/intake.repository.js';

function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>]/g, '') // remove HTML tags
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // remove control chars
    .trim();
}

export const intakeService = {
  createIntakePreview: async (payload) => {
    const rawProcedure = payload?.procedure;
    const rawCountry = payload?.country;
    const rawTimeline = payload?.timeline;

    const procedure = sanitizeString(rawProcedure);
    const country = sanitizeString(rawCountry);
    const timeline = sanitizeString(rawTimeline);

    const fieldErrors = {};

    // Validate procedure
    if (!procedure) {
      fieldErrors.procedure = 'Procedure is required. Please specify the medical procedure or consultation you are inquiring about.';
    } else if (procedure.length > 120) {
      fieldErrors.procedure = `Procedure name is too long (${procedure.length} characters). Please keep it under 120 characters.`;
    }

    // Validate country
    if (!country) {
      fieldErrors.country = 'Country of residence is required. Please select or specify your current country.';
    } else if (country.length > 80) {
      fieldErrors.country = `Country name is too long (${country.length} characters). Please keep it under 80 characters.`;
    }

    // Validate timeline
    if (!timeline) {
      fieldErrors.timeline = 'Timeline is required. Please select your target timeframe for treatment.';
    } else if (timeline.length > 80) {
      fieldErrors.timeline = `Timeline is too long (${timeline.length} characters). Please keep it under 80 characters.`;
    }

    if (Object.keys(fieldErrors).length > 0) {
      const error = new Error('Validation failed. Please correct the highlighted errors before submitting.');
      error.status = 400;
      error.code = 'VALIDATION_ERROR';
      error.details = fieldErrors;
      throw error;
    }

    const saved = await intakeRepository.create({
      procedure,
      country,
      timeline,
    });

    return saved;
  },
};

export default intakeService;
