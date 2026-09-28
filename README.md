# SAHAAYAK SEARCH

## Overview
Sahaayak Search is a multilingual public-service discovery platform for citizens who know their problem but not the official government service name. The experience turns a vague problem into a structured discovery flow: understanding → relevant service → what to do next → required documents → official source.

## Problem statement
People often know the symptom of their issue but not the department, scheme, portal, or terminology behind the service they need. This disconnect makes civic support hard to find and slows down access to benefits and certificates.

## Solution
The app supports multilingual input, normalizes transliterations, classifies the likely intent, and matches the request to a structured local service repository. It then presents clear guidance, next steps, and trust-aware service information.

## Key differentiator
This is not a generic chatbot. It is a service-discovery product that prioritizes intent recognition and structured guidance instead of open-ended conversation.

## Features
- Multilingual support for English, Telugu, Hindi, and Tamil
- Transliteration-aware normalization
- Local fallback engine that works without an API key
- AI abstraction with optional Gemini support
- Voice input through the browser Web Speech API
- Text-to-speech for important guidance blocks
- Services page and detailed service views
- Demo verification guidance and trust messaging
- Accessibility-focused UI for mobile and desktop

## Architecture
- lib/ai: abstraction and provider implementations
- lib/intent: intent classification and retrieval helpers
- lib/services: service repository and service matching logic
- lib/i18n: localized UI strings
- lib/voice: browser speech support
- app/: pages and landing experience

## Fallback architecture
If GEMINI_API_KEY is missing or the provider fails, the app automatically switches to a deterministic local fallback. This fallback combines normalized input, transliteration handling, keyword scoring, and service rule matching to continue operating reliably.

## Multilingual support
Supported languages:
- English (`en`)
- Telugu (`te`)
- Hindi (`hi`)
- Tamil (`ta`)

The app supports native script and transliterated requests such as `na pension raledu`.

## Environment variables
Use a `.env.local` file with:

```env
GEMINI_API_KEY=
```

The app still works without a key because the local fallback remains active.

## How to run locally
```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## How to run tests
```bash
npm test
```

## How to build
```bash
npm run build
```

## Demo scenarios
- Scholarship payment not received
- Pension not received
- Income certificate request
- Caste certificate request
- Residence certificate delay

## Data trust and verification
This project contains demo public-service records and clearly labels them as sample information. It does not present demo data as authoritative government data and asks users to verify details on the official portal.

## Known limitations
- Demo service data is sample data, not official records
- The fallback system is intentionally deterministic for reliability
- This is a hackathon-ready MVP, not a production-grade government platform

## Future improvements
- Real government data integration and validation
- PostgreSQL or Supabase-backed repository
- BHASHINI or alternative speech providers
- RAG-based guidance generation with citations
- Location-based service-office discovery
- Citizen account and application tracking

## Hackathon demo flow
1. Enter a problem such as `My scholarship money hasn't arrived`
2. Check the matched intent and related services
3. Open a service card to review steps and documents
4. Review the demo trust message and official-source guidance
5. Continue with the verified official portal for final action
