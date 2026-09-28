import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { classifyIntent, normalizeQuery, getServiceMatches } from '../lib/intent';

describe('intent classification', () => {
  it('detects English scholarship query', () => {
    assert.equal(classifyIntent("My scholarship money hasn't arrived").intent, 'SCHOLARSHIP_PAYMENT_NOT_RECEIVED');
  });

  it('detects Telugu scholarship query', () => {
    assert.equal(classifyIntent('నా స్కాలర్‌షిప్ డబ్బు ఇంకా రాలేదు').intent, 'SCHOLARSHIP_PAYMENT_NOT_RECEIVED');
  });

  it('detects transliteration pension query', () => {
    assert.equal(classifyIntent('na pension raledu').intent, 'PENSION_NOT_RECEIVED');
  });

  it('detects Hindi pension query', () => {
    assert.equal(classifyIntent('मुझे पेंशन नहीं मिली').intent, 'PENSION_NOT_RECEIVED');
  });

  it('detects income certificate request', () => {
    assert.equal(classifyIntent('I need an income certificate').intent, 'INCOME_CERTIFICATE');
  });

  it('detects caste certificate request', () => {
    assert.equal(classifyIntent('I need a caste certificate').intent, 'CASTE_CERTIFICATE');
  });

  it('detects residence certificate delay', () => {
    assert.equal(classifyIntent('My residence certificate is delayed').intent, 'RESIDENCE_CERTIFICATE');
  });

  it('handles empty query gracefully', () => {
    const result = classifyIntent('   ');
    assert.equal(result.intent, 'GENERAL_GOVERNMENT_SERVICE');
    assert.equal(result.confidence, 0.15);
  });

  it('returns service matches for pension issues', () => {
    const matches = getServiceMatches('My pension has not arrived for three months');
    assert.ok(matches.length > 0);
    assert.ok(matches[0].serviceId === 'pension-old-age' || matches[0].serviceId === 'pension-pensions');
  });

  it('normalizes transliterated input', () => {
    assert.match(normalizeQuery('na pension raledu'), /pension/);
  });
});
