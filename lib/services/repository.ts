import { ServiceItem } from '../types';

export const serviceRepository: ServiceItem[] = [
  {
    id: 'scholarship-payment-status',
    name: 'Scholarship Payment Status',
    localizedName: {
      en: 'Scholarship Payment Status',
      te: 'స్కాలర్‌షిప్ చెల్లింపు స్థితి',
      hi: 'स्कॉलरशिप भुगतान स्थिति',
      ta: 'இலவசம்/வலுவூட்டு தொகை நிலை'
    },
    department: 'Department of Social Welfare',
    category: 'Education',
    description: 'Track scholarship payment delays and learn where to raise a complaint for missing funds.',
    localizedDescription: {
      en: 'Track scholarship payment delays and learn where to raise a complaint for missing funds.',
      te: 'స్కాలర్‌షిప్ చెల్లింపు ఆలస్యాన్ని తనిఖీ చేసి, డబ్బు不到账గా ఉన్నప్పుడు ఫిర్యాదు చేయడం తెలుసుకోండి.',
      hi: 'स्कॉलरशिप भुगतान में देरी की जांच करें और अगर पैसा नहीं मिला है तो शिकायत कैसे करें, जानें।',
      ta: 'கல்விக் உதவித் தொகை தாமதம் குறித்து சரிபார்த்து, பணம் வரவில்லை என்றால் எங்கு புகார் செய்ய வேண்டும் என்பதை அறியவும்.'
    },
    problemIntents: ['SCHOLARSHIP_PAYMENT_NOT_RECEIVED'],
    keywords: ['scholarship', 'payment', 'money not received', 'grant', 'stipend', 'fees', 'dabbu'],
    eligibility: 'For students or eligible beneficiaries awaiting a scholarship disbursement.',
    requiredDocuments: ['Application ID', 'Student ID or Aadhaar', 'Bank account details', 'Recent payment receipt or acknowledgment'],
    applicationSteps: ['Check payment status in the scholarship portal', 'Review the bank account and beneficiary status', 'Raise a grievance if payment is pending', 'Track the complaint final status'],
    onlineAvailable: true,
    officialUrl: 'https://example.gov.in/demo-scholarship-status',
    helpline: null,
    state: 'All States',
    languages: ['en', 'te', 'hi', 'ta'],
    source: 'Demo information — verify the latest details on the official government portal.',
    verified: false,
    lastVerified: '2026-01-15'
  },
  {
    id: 'scholarship-application',
    name: 'Scholarship Application Support',
    localizedName: {
      en: 'Scholarship Application Support',
      te: 'స్కాలర్‌షిప్ దరఖాస్తు సహాయం',
      hi: 'स्कॉलरशिप आवेदन सहायता',
      ta: 'வணிக/கல்வி உதவித் தொகை விண்ணப்பம்'
    },
    department: 'Education Department',
    category: 'Education',
    description: 'Help citizens apply for scholarships and understand the required documents or application steps.',
    localizedDescription: {
      en: 'Help citizens apply for scholarships and understand the required documents or application steps.',
      te: 'విద్యార్థులు స్కాలర్‌షిప్ కోసం దరఖాస్తు చేసుకోవడానికి అవసరమైన పత్రాలు మరియు చర్యలు తెలుసుకోండి.',
      hi: 'नागरिकों को scholarships के आवेदन, दस्तावेज़ और प्रक्रियाओं के बारे में सहायता दें।',
      ta: 'கல்வி உதவித் தொகைக்கான விண்ணப்பம், தேவையான ஆவணங்கள் மற்றும் படிகளை புரிந்து கொள்ள உதவுகிறது.'
    },
    problemIntents: ['SCHOLARSHIP_APPLICATION'],
    keywords: ['apply scholarship', 'scholarship application', 'new scholarship', 'awards'],
    eligibility: 'Students meeting the scheme-specific criteria can apply.',
    requiredDocuments: ['Aadhaar', 'Income certificate', 'Academic records', 'Bank details'],
    applicationSteps: ['Check eligibility on the scheme portal', 'Prepare documents', 'Submit application online', 'Track application status'],
    onlineAvailable: true,
    officialUrl: 'https://example.gov.in/demo-scholarship-portal',
    helpline: null,
    state: 'All States',
    languages: ['en', 'te', 'hi', 'ta'],
    source: 'Demo information — verify the latest details on the official government portal.',
    verified: false,
    lastVerified: '2026-01-15'
  },
  {
    id: 'pension-old-age',
    name: 'Old Age Pension Support',
    localizedName: {
      en: 'Old Age Pension Support',
      te: 'వృద్ధాప్య పింఛన్ సహాయం',
      hi: 'वृद्धावस्था पेंशन सहायता',
      ta: 'முதியோர் ஓய்வூதிய உதவி'
    },
    department: 'Social Welfare Department',
    category: 'Social Welfare',
    description: 'Support citizens who have not received their pension installment or need to start or renew a pension application.',
    localizedDescription: {
      en: 'Support citizens who have not received their pension installment or need to start or renew a pension application.',
      te: 'పింఛన్ డబ్బు రాలేదా లేదా కొత్త/పునరుద్ధరణ దరఖాస్తు కావాలా? సహాయం పొందండి.',
      hi: 'अगर पेंशन नहीं मिली है या नए/नवीकरण आवेदन की ज़रूरत है, तो सहायता लें।',
      ta: 'ஓய்வூதியம் வரவில்லை என்றாலோ புதிய விண்ணப்பம்/புதுப்பிப்பு தேவைப்பட்டாலோ உதவி பெறலாம்.'
    },
    problemIntents: ['PENSION_NOT_RECEIVED', 'PENSION_APPLICATION'],
    keywords: ['pension', 'old age pension', 'monthly pension', 'retirement payment', 'senior citizen pension', 'pension not received'],
    eligibility: 'Age and income criteria vary by state and scheme rules.',
    requiredDocuments: ['Aadhaar', 'Age proof', 'Bank passbook', 'Income proof'],
    applicationSteps: ['Check pension status or application ID', 'Confirm beneficiary details', 'Update bank or documents if needed', 'Escalate complaint if payment is missing'],
    onlineAvailable: true,
    officialUrl: 'https://example.gov.in/demo-pension',
    helpline: null,
    state: 'All States',
    languages: ['en', 'te', 'hi', 'ta'],
    source: 'Demo information — verify the latest details on the official government portal.',
    verified: false,
    lastVerified: '2026-01-15'
  },
  {
    id: 'income-certificate',
    name: 'Income Certificate',
    localizedName: {
      en: 'Income Certificate',
      te: 'வருமானం సర్టిఫికేట్',
      hi: 'आय प्रमाण पत्र',
      ta: 'வருமான சான்றிதழ்'
    },
    department: 'Revenue Department',
    category: 'Certificates',
    description: 'Apply for or track a certificate proving household or individual income status.',
    localizedDescription: {
      en: 'Apply for or track a certificate proving household or individual income status.',
      te: 'కుటుంబం/వ్యక్తి ఆదాయం నిర్ధారించేందుకు ఆర్హత సర్టిఫికేట్ కోసం దరఖాస్తు చేయండి.',
      hi: 'परिवार या व्यक्ति की आय प्रमाणित करने वाला प्रमाण पत्र के लिए आवेदन करें।',
      ta: 'குடும்பம் அல்லது தனிநபர் வருமானத்தை நிரூபிக்கும் சான்றிதழுக்கு விண்ணப்பிக்கவும்.'
    },
    problemIntents: ['INCOME_CERTIFICATE'],
    keywords: ['income certificate', 'annual income proof', 'income proof', 'salary certificate'],
    eligibility: 'Applicants must provide proof of residence and income details as required by the local authority.',
    requiredDocuments: ['Aadhaar', 'Residence proof', 'Income proof', 'Passport-size photo'],
    applicationSteps: ['Select the district/state portal', 'Submit identity and address details', 'Upload income documentation', 'Collect certificate after processing'],
    onlineAvailable: true,
    officialUrl: 'https://example.gov.in/demo-income-certificate',
    helpline: null,
    state: 'All States',
    languages: ['en', 'te', 'hi', 'ta'],
    source: 'Demo information — verify the latest details on the official government portal.',
    verified: false,
    lastVerified: '2026-01-15'
  },
  {
    id: 'caste-certificate',
    name: 'Caste Certificate',
    localizedName: {
      en: 'Caste Certificate',
      te: 'జాతి సర్టిఫికేట్',
      hi: 'जाति प्रमाण पत्र',
      ta: 'சாதி சான்றிதழ்'
    },
    department: 'Revenue Department',
    category: 'Certificates',
    description: 'Apply for caste verification or understand the certificate issuance process for welfare schemes.',
    localizedDescription: {
      en: 'Apply for caste verification or understand the certificate issuance process for welfare schemes.',
      te: 'జాతి ధ్రువీకరణ కోసం దరఖాస్తు చేయండి లేదా సంక్షేమ పథకాల కోసం సర్టిఫికేట్ విడుదల ప్రక్రియ తెలుసుకోండి.',
      hi: 'जाति सत्यापन के लिए आवेदन करें या कल्याण योजनाओं के लिए प्रमाण पत्र प्रक्रिया जानें।',
      ta: 'சாதி சான்றிதழ் விண்ணப்பம் அல்லது நலத் திட்டங்களுக்கான சான்றிதழ் செயல்முறையை அறியவும்.'
    },
    problemIntents: ['CASTE_CERTIFICATE'],
    keywords: ['caste certificate', 'community certificate', 'backward class certificate'],
    eligibility: 'Applicants need valid identity, residence proof, and community documentation as per local rules.',
    requiredDocuments: ['Aadhaar', 'Residence proof', 'Community certificate details', 'Parent documents'],
    applicationSteps: ['Gather family and community documents', 'Apply through the district portal', 'Upload required proof', 'Track certificate issuance'],
    onlineAvailable: true,
    officialUrl: 'https://example.gov.in/demo-caste-certificate',
    helpline: null,
    state: 'All States',
    languages: ['en', 'te', 'hi', 'ta'],
    source: 'Demo information — verify the latest details on the official government portal.',
    verified: false,
    lastVerified: '2026-01-15'
  },
  {
    id: 'residence-certificate',
    name: 'Residence Certificate',
    localizedName: {
      en: 'Residence Certificate',
      te: 'నివాస సర్టిఫికేట్',
      hi: 'निवास प्रमाण पत्र',
      ta: 'வதிவிட சான்றிதழ்'
    },
    department: 'Revenue Department',
    category: 'Certificates',
    description: 'Use this service when you need a certificate showing your residential status and address proof.',
    localizedDescription: {
      en: 'Use this service when you need a certificate showing your residential status and address proof.',
      te: 'నివాస స్థితి మరియు చిరునామా ధ్రువీకరణ కోసం నివాస సర్టిఫికేట్ పొందండి.',
      hi: 'निवास स्थिति और पता प्रमाण के लिए निवास प्रमाण पत्र लें।',
      ta: 'முகவரி மற்றும் வசிப்பிட நிலையை நிரூபிக்கும் சான்றிதழை பெறுங்கள்.'
    },
    problemIntents: ['RESIDENCE_CERTIFICATE'],
    keywords: ['residence certificate', 'domicile certificate', 'address proof', 'residence delay'],
    eligibility: 'Applicants must demonstrate residence in the area or district as required by the state.',
    requiredDocuments: ['Aadhaar', 'Address proof', 'Application form', 'Photograph'],
    applicationSteps: ['Check portal eligibility', 'Submit address proof', 'Upload supporting documents', 'Collect the certificate'],
    onlineAvailable: true,
    officialUrl: 'https://example.gov.in/demo-residence-certificate',
    helpline: null,
    state: 'All States',
    languages: ['en', 'te', 'hi', 'ta'],
    source: 'Demo information — verify the latest details on the official government portal.',
    verified: false,
    lastVerified: '2026-01-15'
  },
  {
    id: 'birth-certificate',
    name: 'Birth Certificate',
    localizedName: {
      en: 'Birth Certificate',
      te: 'పుట్టిన తేదీ సర్టిఫికేట్',
      hi: 'जन्म प्रमाण पत्र',
      ta: 'பிறப்பு சான்றிதழ்'
    },
    department: 'Municipal / Civil Registration',
    category: 'Certificates',
    description: 'Request a birth certificate or follow up on delayed registration.',
    localizedDescription: {
      en: 'Request a birth certificate or follow up on delayed registration.',
      te: 'పుట్టిన తేదీ నమోదు కోసం దరఖాస్తు చేయండి లేదా ఆలస్యమైందో తెలుసుకోండి.',
      hi: 'जन्म प्रमाण पत्र के लिए आवेदन करें या विलंबित पंजीकरण की स्थिति देखें।',
      ta: 'பிறப்பு சான்றிதழ் கோரவும் அல்லது தாமதமான பதிவு நிலையைக் காணவும்.'
    },
    problemIntents: ['BIRTH_CERTIFICATE'],
    keywords: ['birth certificate', 'birth registration', 'date of birth certificate'],
    eligibility: 'Child or parent information must be verified by the local registration office.',
    requiredDocuments: ['Hospital record', 'Parent ID', 'Address proof', 'Application form'],
    applicationSteps: ['Open ward or municipal portal', 'Submit child details', 'Attach supporting records', 'Download certificate'],
    onlineAvailable: true,
    officialUrl: 'https://example.gov.in/demo-birth-certificate',
    helpline: null,
    state: 'All States',
    languages: ['en', 'te', 'hi', 'ta'],
    source: 'Demo information — verify the latest details on the official government portal.',
    verified: false,
    lastVerified: '2026-01-15'
  },
  {
    id: 'death-certificate',
    name: 'Death Certificate',
    localizedName: {
      en: 'Death Certificate',
      te: 'మరణం సర్టిఫికేట్',
      hi: 'मृत्यु प्रमाण पत्र',
      ta: 'மரண சான்றிதழ்'
    },
    department: 'Municipal / Civil Registration',
    category: 'Certificates',
    description: 'Help families request or verify a death certificate for legal benefits and records.',
    localizedDescription: {
      en: 'Help families request or verify a death certificate for legal benefits and records.',
      te: 'మరణం సర్టిఫికేట్ కోసం దరఖాస్తు చేయండి లేదా అర్హత నిబంధనలకు సంబంధించి పరిస్థితిని తనిఖీ చేయండి.',
      hi: 'परिवारों को मृत्यु प्रमाण पत्र के लिए आवेदन या सत्यापन में मदद करें।',
      ta: 'மரண சான்றிதழ் கோருவதற்கும், சட்டப்பூர்வ நலன்களுக்கான நிலையை சரிபார்ப்பதற்கும் உதவுங்கள்.'
    },
    problemIntents: ['DEATH_CERTIFICATE'],
    keywords: ['death certificate', 'death registration', 'funeral certificate'],
    eligibility: 'Applicant must provide death information, family ID, and local registration details.',
    requiredDocuments: ['Hospital death slip', 'Family ID', 'Address proof', 'Application form'],
    applicationSteps: ['Submit death information', 'Upload hospital proof', 'Check registrar status', 'Collect certificate'],
    onlineAvailable: true,
    officialUrl: 'https://example.gov.in/demo-death-certificate',
    helpline: null,
    state: 'All States',
    languages: ['en', 'te', 'hi', 'ta'],
    source: 'Demo information — verify the latest details on the official government portal.',
    verified: false,
    lastVerified: '2026-01-15'
  },
  {
    id: 'ration-card',
    name: 'Ration Card Services',
    localizedName: {
      en: 'Ration Card Services',
      te: 'రేషన్ కార్డ్ సేవలు',
      hi: 'राशन कार्ड सेवाएँ',
      ta: 'ரேஷன் அட்டை சேவைகள்'
    },
    department: 'Food & Civil Supplies',
    category: 'Food/Ration',
    description: 'Support for new ration card applications, updates, or issues linked to food support.',
    localizedDescription: {
      en: 'Support for new ration card applications, updates, or issues linked to food support.',
      te: 'కొత్త రేషన్ కార్డ్, నవీకరణ లేదా ఆహార సహాయం సమస్యలకు సహాయం.',
      hi: 'नए राशन कार्ड, अपडेट या खाद्य सहायता से जुड़ी समस्याओं में सहायता।',
      ta: 'புதிய ரேஷன் அட்டை, புதுப்பிப்பு அல்லது உணவுப் பாதுகாப்பு தொடர்பான சிக்கல்களுக்கு உதவி.'
    },
    problemIntents: ['RATION_CARD'],
    keywords: ['ration card', 'food subsidy', 'anna', 'food support'],
    eligibility: 'Eligibility depends on household status, income, and state food policy.',
    requiredDocuments: ['Aadhaar', 'Address proof', 'Family details', 'Income details'],
    applicationSteps: ['Verify eligibility', 'Apply online or at the local office', 'Submit documents', 'Track card issue'],
    onlineAvailable: true,
    officialUrl: 'https://example.gov.in/demo-ration-card',
    helpline: null,
    state: 'All States',
    languages: ['en', 'te', 'hi', 'ta'],
    source: 'Demo information — verify the latest details on the official government portal.',
    verified: false,
    lastVerified: '2026-01-15'
  },
  {
    id: 'employment-support',
    name: 'Employment Support',
    localizedName: {
      en: 'Employment Support',
      te: 'ఉద్యోగ సహాయం',
      hi: 'रोज़गार सहायता',
      ta: 'வேலை வாய்ப்பு உதவி'
    },
    department: 'Labour & Employment Department',
    category: 'Employment',
    description: 'Connect citizens to jobs, employment registrations, skilling schemes, and support services.',
    localizedDescription: {
      en: 'Connect citizens to jobs, employment registrations, skilling schemes, and support services.',
      te: 'ఉద్యోగాలు, నమోదు, శిక్షణ పథకాలు మరియు సహాయ సేవలను కనుగొనండి.',
      hi: 'नौकरियों, रोजगार रजिस्ट्रेशन, कौशल योजनाओं और सहायता सेवाओं से जोड़ें।',
      ta: 'வேலைகள், பதிவு, திறன் மேம்பாட்டுத் திட்டங்கள் மற்றும் உதவி சேவைகளை இணைக்கவும்.'
    },
    problemIntents: ['EMPLOYMENT_SUPPORT'],
    keywords: ['job', 'employment', 'work', 'unemployment', 'skill development'],
    eligibility: 'Eligibility varies for job portals, training schemes, and welfare-linked work support.',
    requiredDocuments: ['Resume', 'ID proof', 'Education certificate', 'Address proof'],
    applicationSteps: ['Check employment scheme eligibility', 'Register on the portal', 'Upload documents', 'Apply to jobs or training'],
    onlineAvailable: true,
    officialUrl: 'https://example.gov.in/demo-employment',
    helpline: null,
    state: 'All States',
    languages: ['en', 'te', 'hi', 'ta'],
    source: 'Demo information — verify the latest details on the official government portal.',
    verified: false,
    lastVerified: '2026-01-15'
  },
  {
    id: 'agriculture-support',
    name: 'Agriculture Support',
    localizedName: {
      en: 'Agriculture Support',
      te: 'వ్యవసాయ సహాయం',
      hi: 'कृषि सहायता',
      ta: 'விவசாய உதவி'
    },
    department: 'Agriculture Department',
    category: 'Agriculture',
    description: 'Support farmers with crop schemes, irrigation help, or other agriculture-related assistance.',
    localizedDescription: {
      en: 'Support farmers with crop schemes, irrigation help, or other agriculture-related assistance.',
      te: 'పంట పథకాలు, నీటి సరఫరా మరియు వ్యవసాయ సహాయాలకు సంబంధించి సహాయం.',
      hi: 'फसल योजनाओं, सिंचाई सहायता और कृषि-संबंधित मदद के लिए सहायता।',
      ta: 'பயிர் திட்டங்கள், நீர்ப்பாசன உதவி மற்றும் விவசாய தொடர்பான உதவிக்கு ஆதரவு.'
    },
    problemIntents: ['AGRICULTURE_SUPPORT'],
    keywords: ['farmer', 'crop', 'agriculture', 'seed subsidy', 'irrigation'],
    eligibility: 'Eligibility depends on land ownership, crop type, and local scheme conditions.',
    requiredDocuments: ['Land records', 'Aadhaar', 'Bank details', 'Crop details'],
    applicationSteps: ['Check scheme eligibility', 'Submit land and crop details', 'Review farmer support forms', 'Track disbursement'],
    onlineAvailable: true,
    officialUrl: 'https://example.gov.in/demo-agriculture',
    helpline: null,
    state: 'All States',
    languages: ['en', 'te', 'hi', 'ta'],
    source: 'Demo information — verify the latest details on the official government portal.',
    verified: false,
    lastVerified: '2026-01-15'
  },
  {
    id: 'healthcare-support',
    name: 'Healthcare Support',
    localizedName: {
      en: 'Healthcare Support',
      te: 'స్వాస్థ్య సహాయం',
      hi: 'स्वास्थ्य सहायता',
      ta: 'சுகாதார உதவி'
    },
    department: 'Health Department',
    category: 'Health',
    description: 'Help citizens find public health schemes, treatment support, or healthcare services relevant to their need.',
    localizedDescription: {
      en: 'Help citizens find public health schemes, treatment support, or healthcare services relevant to their need.',
      te: 'ప్రజా ఆరోగ్య పథకాలు, చికిత్స సహాయం లేదా అవసరమైన ఆరోగ్య సేవలను కనుగొనండి.',
      hi: 'सार्वजनिक स्वास्थ्य योजनाओं, उपचार सहायता या स्वास्थ्य सेवाओं का पता लगाएँ।',
      ta: 'பொது சுகாதாரத் திட்டங்கள், சிகிச்சை உதவி மற்றும் தேவையான சுகாதார சேவைகளை கண்டறிய உதவுகிறது.'
    },
    problemIntents: ['HEALTHCARE_SUPPORT'],
    keywords: ['healthcare', 'medical help', 'hospital', 'treatment', 'doctor', 'health support'],
    eligibility: 'Benefits vary across health schemes and local government support criteria.',
    requiredDocuments: ['Aadhaar', 'Medical referral', 'Income proof', 'Hospital ID'],
    applicationSteps: ['Understand the health issue', 'Find the correct scheme or hospital', 'Prepare documents', 'Apply or visit the facility'],
    onlineAvailable: true,
    officialUrl: 'https://example.gov.in/demo-healthcare',
    helpline: null,
    state: 'All States',
    languages: ['en', 'te', 'hi', 'ta'],
    source: 'Demo information — verify the latest details on the official government portal.',
    verified: false,
    lastVerified: '2026-01-15'
  },
  {
    id: 'education-support',
    name: 'Education Support',
    localizedName: {
      en: 'Education Support',
      te: 'విద్య సహాయం',
      hi: 'शिक्षा सहायता',
      ta: 'கல்வி உதவி'
    },
    department: 'Education Department',
    category: 'Education',
    description: 'Guidance for student support, scholarships, fee waivers, or educational assistance services.',
    localizedDescription: {
      en: 'Guidance for student support, scholarships, fee waivers, or educational assistance services.',
      te: 'విద్యార్థి సహాయం, స్కాలర్‌షిప్, ఫీజు మినహాయింపు లేదా విద్యా సహాయ సేవల మార్గదర్శకత్వం.',
      hi: 'विद्यार्थी सहायता, छात्रवृत्ति, शुल्क माफी या शिक्षा सहायता सेवाओं के लिए मार्गदर्शन।',
      ta: 'மாணவர் உதவி, உதவித்தொகை, கட்டண விலக்கு அல்லது கல்வி உதவி சேவைகளுக்கான வழிகாட்டல்.'
    },
    problemIntents: ['EDUCATION_SUPPORT'],
    keywords: ['education support', 'student help', 'fee waiver', 'school assistance'],
    eligibility: 'School, college, or scheme criteria determine the correct support route.',
    requiredDocuments: ['Student ID', 'Aadhaar', 'Income proof', 'Admission proof'],
    applicationSteps: ['Identify the education issue', 'Check applicable school or scheme support', 'Prepare documents', 'Submit or visit office'],
    onlineAvailable: true,
    officialUrl: 'https://example.gov.in/demo-education',
    helpline: null,
    state: 'All States',
    languages: ['en', 'te', 'hi', 'ta'],
    source: 'Demo information — verify the latest details on the official government portal.',
    verified: false,
    lastVerified: '2026-01-15'
  },
  {
    id: 'disability-support',
    name: 'Disability Support',
    localizedName: {
      en: 'Disability Support',
      te: 'వికలాంగుల సహాయం',
      hi: 'दिव्यांगता सहायता',
      ta: 'மாற்றுத்திறனாளி உதவி'
    },
    department: 'Social Justice Department',
    category: 'Disability',
    description: 'Find schemes and support for persons with disabilities, assistive devices, and welfare services.',
    localizedDescription: {
      en: 'Find schemes and support for persons with disabilities, assistive devices, and welfare services.',
      te: 'వికలాంగులకు సంబంధించిన పథకాలు, సహాయ పరికరాలు మరియు సంక్షేమ సేవలు కనుగొనండి.',
      hi: 'दिव्यांगजन के लिए योजनाएँ, सहायक यंत्र और कल्याण सेवाएँ खोजें।',
      ta: 'மாற்றுத்திறனாளிகளுக்கான திட்டங்கள், உதவி சாதனங்கள் மற்றும் நல சேவைகளை கண்டறியவும்.'
    },
    problemIntents: ['DISABILITY_SUPPORT'],
    keywords: ['disability support', 'support for disabled', 'assistive device'],
    eligibility: 'Support depends on disability certification and scheme-eligible categories.',
    requiredDocuments: ['Disability certificate', 'Aadhaar', 'Address proof', 'Bank account'],
    applicationSteps: ['Check eligibility for the relevant scheme', 'Prepare disability documentation', 'Apply with documents', 'Track support status'],
    onlineAvailable: true,
    officialUrl: 'https://example.gov.in/demo-disability',
    helpline: null,
    state: 'All States',
    languages: ['en', 'te', 'hi', 'ta'],
    source: 'Demo information — verify the latest details on the official government portal.',
    verified: false,
    lastVerified: '2026-01-15'
  },
  {
    id: 'housing-support',
    name: 'Housing Support',
    localizedName: {
      en: 'Housing Support',
      te: 'ఇంటి సహాయం',
      hi: 'आवास सहायता',
      ta: 'வசிப்பிடம் உதவி'
    },
    department: 'Housing Department',
    category: 'Housing',
    description: 'Look for public housing schemes, home assistance, or housing-related guidance.',
    localizedDescription: {
      en: 'Look for public housing schemes, home assistance, or housing-related guidance.',
      te: 'ప్రభుత్వ ఇల్లు, గృహ సహాయం లేదా ఇళ్లకు సంబంధిత సహాయాన్ని కనుగొనండి.',
      hi: 'सार्वजनिक आवास योजनाओं, घर सहायता या आवास-संबंधी मार्गदर्शन की तलाश करें।',
      ta: 'பொது வீட்டு திட்டங்கள், வீட்டுத் உதவி அல்லது வீடுகளுடன் தொடர்பான வழிகாட்டலை கண்டறியவும்.'
    },
    problemIntents: ['HOUSING_SUPPORT'],
    keywords: ['housing', 'home support', 'house', 'housing benefit', 'apartment'],
    eligibility: 'Schemes vary by residence type, income level, and state eligibility rules.',
    requiredDocuments: ['Aadhaar', 'Address proof', 'Income certificate', 'Caste or category proof if applicable'],
    applicationSteps: ['Identify the right housing scheme', 'Prepare address and income proof', 'Submit application', 'Track approval status'],
    onlineAvailable: true,
    officialUrl: 'https://example.gov.in/demo-housing',
    helpline: null,
    state: 'All States',
    languages: ['en', 'te', 'hi', 'ta'],
    source: 'Demo information — verify the latest details on the official government portal.',
    verified: false,
    lastVerified: '2026-01-15'
  },
  {
    id: 'women-welfare',
    name: 'Women Welfare Support',
    localizedName: {
      en: 'Women Welfare Support',
      te: 'మహిళా సంక్షేమ సహాయం',
      hi: 'महिला कल्याण सहायता',
      ta: 'பெண்கள் நல உதவி'
    },
    department: 'Women & Child Development',
    category: 'Women',
    description: 'Support women related to welfare schemes, protection services, and benefit applications.',
    localizedDescription: {
      en: 'Support women related to welfare schemes, protection services, and benefit applications.',
      te: 'మహిళా సంక్షేమ పథకాలు, రక్షణ సేవలు మరియు ప్రయోజనాల కోసం సహాయం.',
      hi: 'महिला कल्याण योजनाओं, सुरक्षा सेवाओं और लाभ आवेदन के लिए सहायता।',
      ta: 'பெண்கள் நலத் திட்டங்கள், பாதுகாப்பு சேவைகள் மற்றும் பலன்களுக்கான விண்ணப்பங்களுக்கு உதவி.'
    },
    problemIntents: ['WOMEN_WELFARE'],
    keywords: ['women welfare', 'women support', 'women benefit'],
    eligibility: 'Poor women and eligible categories may qualify under multiple state or central schemes.',
    requiredDocuments: ['Aadhaar', 'Income proof', 'Address proof', 'Bank details'],
    applicationSteps: ['Identify the correct scheme', 'Prepare supporting documents', 'Submit online or at the local office', 'Track benefit status'],
    onlineAvailable: true,
    officialUrl: 'https://example.gov.in/demo-women-welfare',
    helpline: null,
    state: 'All States',
    languages: ['en', 'te', 'hi', 'ta'],
    source: 'Demo information — verify the latest details on the official government portal.',
    verified: false,
    lastVerified: '2026-01-15'
  },
  {
    id: 'senior-citizen-support',
    name: 'Senior Citizen Support',
    localizedName: {
      en: 'Senior Citizen Support',
      te: 'వృద్ధుల సహాయం',
      hi: 'वरिष्ठ नागरिक सहायता',
      ta: 'முதியோர் உதவி'
    },
    department: 'Social Welfare Department',
    category: 'Senior Citizens',
    description: 'Support senior citizens applying for pension, benefits, or assistance with welfare services.',
    localizedDescription: {
      en: 'Support senior citizens applying for pension, benefits, or assistance with welfare services.',
      te: 'వృద్ధుల కోసం పింఛన్, ప్రయోజనాలు మరియు సంక్షేమ సేవలు అందించడంలో సహాయం.',
      hi: 'वरिष्ठ नागरिकों को पेंशन, लाभ और कल्याण सेवाओं में सहायता प्रदान करें।',
      ta: 'முதியோர் ஓய்வூதியம், நலத்திட்டங்கள் மற்றும் நல சேவைகளுக்கான உதவியை வழங்குகிறது.'
    },
    problemIntents: ['SENIOR_CITIZEN_SUPPORT'],
    keywords: ['senior citizen', 'old age support', 'elder support'],
    eligibility: 'Age, residency, and category-based eligibility may apply under specific schemes.',
    requiredDocuments: ['Aadhaar', 'Age proof', 'Address proof', 'Bank details'],
    applicationSteps: ['Check the relevant scheme', 'Submit age and residence proof', 'Apply online or offline', 'Track benefits'],
    onlineAvailable: true,
    officialUrl: 'https://example.gov.in/demo-senior-support',
    helpline: null,
    state: 'All States',
    languages: ['en', 'te', 'hi', 'ta'],
    source: 'Demo information — verify the latest details on the official government portal.',
    verified: false,
    lastVerified: '2026-01-15'
  },
  {
    id: 'document-status',
    name: 'Document Status & Follow-up',
    localizedName: {
      en: 'Document Status & Follow-up',
      te: 'పత్రాల స్థితి & అనుసరణ',
      hi: 'दस्तावेज़ स्थिति और फॉलो-अप',
      ta: 'ஆவண நிலை & பின்தொடர்தல்'
    },
    department: 'Citizen Service Center',
    category: 'Other',
    description: 'Check if a certificate, application, or government document is still pending or delayed.',
    localizedDescription: {
      en: 'Check if a certificate, application, or government document is still pending or delayed.',
      te: 'సర్టిఫికేట్, దరఖాస్తు లేదా ప్రభుత్వ పత్రం ఇంకా పెండింగ్లో ఉందా లేదా ఆలస్యమైందా తెలుసుకోండి.',
      hi: 'जांचें कि प्रमाण पत्र, आवेदन या सरकारी दस्तावेज़ अभी भी लंबित है या देरी हो रही है।',
      ta: 'சான்றிதழ், விண்ணப்பம் அல்லது அரசாங்க ஆவணம் இன்னும் நிலுவையில் உள்ளதா, தாமதமாக இருகிறதா எனப் பார்க்கவும்.'
    },
    problemIntents: ['DOCUMENT_STATUS'],
    keywords: ['document status', 'application status', 'pending document', 'certificate pending'],
    eligibility: 'Applicants need the application or reference number and relevant identity details.',
    requiredDocuments: ['Application ID', 'Aadhaar', 'Reference number', 'Receipt'],
    applicationSteps: ['Locate the reference or receipt number', 'Check status on the portal', 'Submit grievance if pending', 'Track the updated status'],
    onlineAvailable: true,
    officialUrl: 'https://example.gov.in/demo-document-status',
    helpline: null,
    state: 'All States',
    languages: ['en', 'te', 'hi', 'ta'],
    source: 'Demo information — verify the latest details on the official government portal.',
    verified: false,
    lastVerified: '2026-01-15'
  }
];

export function getServiceById(id: string): ServiceItem | undefined {
  return serviceRepository.find((service) => service.id === id);
}

export function getAllServices(): ServiceItem[] {
  return [...serviceRepository];
}
