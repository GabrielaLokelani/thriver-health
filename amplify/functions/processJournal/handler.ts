// Lambda handler for processing journal entries with AI
import type { Handler } from 'aws-lambda';

export const handler: Handler = async (event) => {
  console.log('Processing journal entry:', event);

  const { journalEntry } = JSON.parse(event.body || '{}');

  // TODO: Integrate with OpenAI, AWS Bedrock, or your AI service
  // For now, return mock extracted data
  const extractedData = {
    name: extractName(journalEntry),
    age: extractAge(journalEntry),
    diagnosis: extractDiagnosis(journalEntry),
    medications: extractMedications(journalEntry),
    treatments: extractTreatments(journalEntry),
    goals: extractGoals(journalEntry),
    lifestyle: extractLifestyle(journalEntry),
    trackingMetrics: extractTrackingMetrics(journalEntry),
    summary: generateSummary(journalEntry),
    keyInsights: extractKeyInsights(journalEntry),
  };

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(extractedData),
  };
};

// Helper functions for extraction (replace with real AI)
function extractName(text: string): string {
  const match = text.match(/(?:I'm|I am|My name is|name is)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
  return match ? match[1] : 'User';
}

function extractAge(text: string): string {
  const match = text.match(/(\d+)\s+years?\s+old/i);
  return match ? match[1] : '30';
}

function extractDiagnosis(text: string): any {
  const conditions = ['cancer', 'diabetes', 'MS', 'autoimmune', 'prostate', 'breast'];
  const found = conditions.find(c => text.toLowerCase().includes(c));
  return {
    condition: found ? found.charAt(0).toUpperCase() + found.slice(1) : '',
    symptoms: [],
    diagnosisDate: extractDate(text),
  };
}

function extractMedications(text: string): any[] {
  const meds: any[] = [];
  const medPattern = /(?:taking|on|using)\s+([A-Za-z]+(?:\s+\d+[a-z]+)?)/gi;
  let match;
  while ((match = medPattern.exec(text)) !== null) {
    meds.push({
      name: match[1],
      dosage: '',
      frequency: 'Daily',
    });
  }
  return meds;
}

function extractTreatments(text: string): any[] {
  return [];
}

function extractGoals(text: string): any {
  return {
    shortTerm: [],
    longTerm: '',
  };
}

function extractLifestyle(text: string): any {
  return {
    diet: '',
    movement: '',
    digitalUsage: 'Moderate',
  };
}

function extractTrackingMetrics(text: string): any[] {
  return [];
}

function extractDate(text: string): string | undefined {
  const match = text.match(/(\d{4}-\d{2})|(?:in|on)\s+([A-Z][a-z]+\s+\d{4})/i);
  return match ? match[1] || match[2] : undefined;
}

function generateSummary(text: string): string {
  return `Summary of your health journey based on your journal entry.`;
}

function extractKeyInsights(text: string): string[] {
  return ['Key insight 1', 'Key insight 2'];
}

