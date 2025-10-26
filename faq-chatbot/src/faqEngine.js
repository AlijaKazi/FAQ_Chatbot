// faqEngine.js

const DEFAULT_FAQS = [
  { q: 'How do I sign up?', a: 'To sign up, click the Sign Up button and enter your email.' },
  { q: 'What is the refund policy?', a: 'We offer refunds within 30 days of purchase.' },
  { q: 'How do I reset my password?', a: 'Use the Forgot Password link on the sign-in page.' },
  { q: 'What payment methods do you accept?', a: 'We accept credit cards and PayPal.' },
  { q: 'Do you have an API?', a: 'Yes — contact support to get API access.' },
];

function tokenize(s) {
  return s
    .toLowerCase()
    .replace(/["'.,?!]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function buildVocab(faqs) {
  const vocab = new Map();
  let idx = 0;
  faqs.forEach(({ q }) => {
    tokenize(q).forEach(t => {
      if (!vocab.has(t)) vocab.set(t, idx++);
    });
  });
  return vocab;
}

function vectorize(text, vocab) {
  const vec = new Array(vocab.size).fill(0);
  tokenize(text).forEach(t => {
    if (vocab.has(t)) {
      vec[vocab.get(t)] += 1;
    }
  });
  return vec;
}

function dot(a, b) {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
}

function norm(a) {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * a[i];
  return Math.sqrt(s);
}

export function loadDefaultFaqs() {
  const faqs = DEFAULT_FAQS.map(f => ({ ...f }));
  const vocab = buildVocab(faqs);
  const vectors = faqs.map(f => vectorize(f.q, vocab));
  return { faqs, vocab, vectors };
}

export function findBestFAQMatch(userText, engine) {
  const vec = vectorize(userText, engine.vocab);
  let bestScore = -1;
  let bestIdx = -1;
  for (let i = 0; i < engine.vectors.length; i++) {
    const v = engine.vectors[i];
    const score = dot(v, vec) / (norm(v) * norm(vec) + 1e-9);
    if (score > bestScore) {
      bestScore = score;
      bestIdx = i;
    }
  }
  const best = engine.faqs[bestIdx];
  return { bestScore, answer: best?.a || null, question: best?.q || null };
}
