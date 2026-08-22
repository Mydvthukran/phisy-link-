// Mock implementation of the API contract for the MVP frontend

/**
 * Proposed API Contract Payload:
 * {
 *   "type": "url" | "text" | "image" | "qr",
 *   "content": "string",
 *   "file": <File>
 * }
 */
export const analyzeContent = async (payload) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  console.log("Sending to backend:", payload);

  // For the MVP, we just mock the response based on simple heuristics
  // Once the real backend is ready, this will be replaced with a fetch() call
  
  const content = (payload.content || '').toLowerCase();
  
  if (content.includes('login') || content.includes('secure') || content.includes('verify')) {
    return {
      status: "success",
      risk_score: 85,
      risk_level: "MALICIOUS",
      indicators: [
        "Domain registered recently (URL analysis)",
        "Urgent language detected (LLM analysis)",
        "Suspicious keywords in path: 'login', 'verify'"
      ],
      recommendation: "Do not enter your credentials. Close the tab immediately.",
      confidence: 0.92
    };
  } else if (content.includes('bit.ly') || content.includes('tinyurl')) {
    return {
      status: "success",
      risk_score: 60,
      risk_level: "SUSPICIOUS",
      indicators: [
        "URL shortener detected, destination obscured",
        "Could not verify domain reputation"
      ],
      recommendation: "Proceed with caution. Verify the sender before clicking or expand the URL first.",
      confidence: 0.75
    };
  } else {
    return {
      status: "success",
      risk_score: 15,
      risk_level: "SAFE",
      indicators: [
        "Domain has a good reputation",
        "No suspicious language detected"
      ],
      recommendation: "This content appears safe.",
      confidence: 0.95
    };
  }
};
