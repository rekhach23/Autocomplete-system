import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { getAutocompleteSuggestions } from '../lib/autocomplete';

describe('autocomplete', () => {
  it('returns top 5 suggestions sorted by frequency for english prefix', async () => {
    const results = await getAutocompleteSuggestions('sch', 'en');
    assert.ok(results.length <= 5);
    assert.ok(results.length > 0);
    for (let i = 1; i < results.length; i += 1) {
      assert.ok(results[i - 1].frequency >= results[i].frequency);
    }
  });

  it('supports Telugu Unicode prefixes', async () => {
    const results = await getAutocompleteSuggestions('నా స్కా', 'te');
    assert.ok(results.some((item) => item.text.toLowerCase().includes('స్కాలర్')));
  });

  it('supports Hindi Unicode prefixes', async () => {
    const results = await getAutocompleteSuggestions('मुझे पें', 'hi');
    assert.ok(results.length > 0);
  });

  it('supports Tamil Unicode prefixes', async () => {
    const results = await getAutocompleteSuggestions('எனக்கு வரு', 'ta');
    assert.ok(results.length > 0);
  });
});
