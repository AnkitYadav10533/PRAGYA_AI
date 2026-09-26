/**
 * PRAGYA — Bilingual Dictionary & Language Helper (EN / HI)
 * Aligned with NIPUN Bharat Foundational Literacy & Numeracy (FLN)
 */

export type Language = 'en' | 'hi';

export const TRANSLATIONS = {
  en: {
    brand_sub: 'Subtraction Diagnostic Assistant',
    fln_tag: 'FLN MVP',
    nav_dashboard: 'Dashboard',
    nav_class: 'Class 3-A',
    nav_assess: 'Assess',
    nav_diagnose: 'Diagnose & Verify',
    nav_groups: 'Groups',
    nav_intervene: 'Intervene',
    nav_reassess: 'Progress',
    golden_demo_btn: 'Launch Golden Demo',
    status_verified: 'Verified',
    status_needs_review: 'Needs review',
    status_not_assessed: 'Not assessed',
    status_grouped: 'Grouped',
    status_intervened: 'In Remediation',
    status_reassessed: 'Reassessed',
    gap_regrouping: 'Regrouping',
    gap_place_value: 'Place Value',
    gap_subtraction_facts: 'Subtraction Facts',
    gap_mastery: 'Mastery',
    accept_btn: 'Accept Suggestion',
    reject_btn: 'Reject (No Gap)',
    change_btn: 'Change Gap',
    listen_prompt: 'Listen Prompt (Audio)',
    print_report: 'Print Parent Report',
    unbundle_ten: 'Exchange 1 Ten Rod for 10 Ones (Regroup)',
    unbundled_success: 'Exchanged! Now 7 Tens and 13 Ones. Decrement recorded!',
  },
  hi: {
    brand_sub: 'घटाव नैदानिक सहायक (प्रज्ञा)',
    fln_tag: 'निपुण भारत',
    nav_dashboard: 'डैशबोर्ड',
    nav_class: 'कक्षा ३-अ',
    nav_assess: 'आकलन',
    nav_diagnose: 'निदान व सत्यापन',
    nav_groups: 'उपचारात्मक समूह',
    nav_intervene: 'हस्तक्षेप (गतिविधि)',
    nav_reassess: 'प्रगति व परिणाम',
    golden_demo_btn: 'मुख्य डेमो शुरू करें',
    status_verified: 'सत्यापित',
    status_needs_review: 'समीक्षा आवश्यक',
    status_not_assessed: 'आकलन नहीं हुआ',
    status_grouped: 'समूहीकृत',
    status_intervened: 'उपचार जारी',
    status_reassessed: 'पुनः आकलित',
    gap_regrouping: 'पुनर्समूहन (दहाई उधार)',
    gap_place_value: 'स्थानिक मान',
    gap_subtraction_facts: 'घटाव के बुनियादी तथ्य',
    gap_mastery: 'दक्षता (मास्टरी)',
    accept_btn: 'सुझाव स्वीकार करें',
    reject_btn: 'अस्वीकार करें (कोई त्रुटि नहीं)',
    change_btn: 'कमी बदलें',
    listen_prompt: 'शिक्षक निर्देश सुनें (ऑडियो)',
    print_report: 'अभिभावक रिपोर्ट प्रिंट करें',
    unbundle_ten: '१ दहाई का बंडल खोलकर १० खुली तीलियाँ बनाएं',
    unbundled_success: 'बंडल खुल गया! अब ७ दहाई और १३ इकाइयां हैं। दहाई कम दर्ज हुई!',
  },
};

export function getTranslation(lang: Language, key: keyof typeof TRANSLATIONS['en']): string {
  return TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en'][key] || key;
}

export function speakText(text: string, lang: Language = 'en'): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  try {
    window.speechSynthesis.cancel(); // Stop any active speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.warn('Speech synthesis unavailable', e);
  }
}
