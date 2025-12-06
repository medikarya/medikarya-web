# AI Integration Guide for MediKarya Case System

## Overview
This guide explains how to integrate actual AI services (OpenAI, Anthropic, etc.) to replace the mock responses in the case interaction system.

## 🔑 Environment Variables

Add to your `.env.local`:
```bash
# OpenAI
OPENAI_API_KEY=sk-...

# Or Anthropic Claude
ANTHROPIC_API_KEY=sk-ant-...

# Or other AI providers
GOOGLE_AI_API_KEY=...
```

## 🤖 AI Patient Chat Integration

### File: `app/api/chat/patient/route.ts`

Replace the mock response with OpenAI:

```typescript
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { message, caseData, chatHistory } = await request.json()

  // Build system prompt with patient personality
  const systemPrompt = `You are a patient in a medical simulation. Your details:

Name: ${caseData.patient.name}
Age: ${caseData.patient.age}
Gender: ${caseData.patient.gender}
Chief Complaint: ${caseData.patient.chiefComplaint}

Medical History: ${caseData.aiPersonality.medicalHistory}
Social History: ${caseData.aiPersonality.socialHistory}
Current Symptoms: ${caseData.aiPersonality.presentingSymptoms}
Personality Traits: ${caseData.aiPersonality.traits.join(", ")}

IMPORTANT INSTRUCTIONS:
1. Respond naturally as this patient would
2. Show appropriate concern and emotion based on personality traits
3. Answer questions accurately based on your condition
4. Don't volunteer information unless specifically asked
5. Be cooperative but realistic
6. If you don't know something, say so naturally
7. Keep responses concise (2-3 sentences max)
8. Use natural language, not medical jargon`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: systemPrompt },
        ...chatHistory.map(msg => ({
          role: msg.role === "user" ? "user" : "assistant",
          content: msg.content
        })),
        { role: "user", content: message }
      ],
      temperature: 0.8,
      max_tokens: 200,
      presence_penalty: 0.6,
      frequency_penalty: 0.3
    })

    const aiResponse = completion.choices[0].message.content

    return NextResponse.json({
      response: aiResponse,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error("OpenAI API error:", error)
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    )
  }
}
```

### Alternative: Anthropic Claude

```typescript
import Anthropic from "@anthropic-ai/sdk"

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

const message = await anthropic.messages.create({
  model: "claude-3-5-sonnet-20241022",
  max_tokens: 200,
  system: systemPrompt,
  messages: [
    ...chatHistory.map(msg => ({
      role: msg.role === "user" ? "user" : "assistant",
      content: msg.content
    })),
    { role: "user", content: message }
  ]
})

const aiResponse = message.content[0].text
```

## 🧪 Test Results Generation

### File: `app/api/tests/generate-result/route.ts`

```typescript
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { test, caseData } = await request.json()

  const systemPrompt = `You are a medical laboratory system generating realistic test results.

Patient Information:
- Age: ${caseData.patient.age}
- Gender: ${caseData.patient.gender}
- Chief Complaint: ${caseData.patient.chiefComplaint}
- Vital Signs: ${JSON.stringify(caseData.patient.vitalSigns)}
- Actual Diagnosis: ${caseData.correctDiagnosis || "Acute Myocardial Infarction"}

Test Requested: ${test.name} (${test.category})

Generate realistic test results that are:
1. Consistent with the patient's actual diagnosis
2. Medically accurate
3. Include normal ranges
4. Flag abnormal values
5. Provide clinical interpretation
6. Note any critical findings

Return ONLY valid JSON in this exact format:
{
  "summary": "Brief test summary",
  "values": [
    {
      "parameter": "Test parameter name",
      "value": "Numeric value",
      "unit": "Unit of measurement",
      "normalRange": "Normal range",
      "status": "normal|high|low|critical"
    }
  ],
  "interpretation": "Clinical interpretation of results",
  "criticalFindings": ["Array of critical findings if any"]
}`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Generate results for ${test.name}` }
      ],
      temperature: 0.3, // Lower temperature for more consistent results
      response_format: { type: "json_object" }
    })

    const results = JSON.parse(completion.choices[0].message.content)

    return NextResponse.json({
      results,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error("OpenAI API error:", error)
    return NextResponse.json(
      { error: "Failed to generate test results" },
      { status: 500 }
    )
  }
}
```

## 📊 Diagnosis Feedback Generation

### File: `app/api/diagnosis/feedback/route.ts`

```typescript
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { diagnosis, orderedTests, chatHistory, caseData } = await request.json()

  const systemPrompt = `You are an expert medical educator providing feedback on a student's clinical case performance.

CASE INFORMATION:
Correct Diagnosis: ${caseData.correctDiagnosis || "Acute Myocardial Infarction"}
Patient: ${caseData.patient.age}y ${caseData.patient.gender}
Chief Complaint: ${caseData.patient.chiefComplaint}

STUDENT'S PERFORMANCE:
Primary Diagnosis: ${diagnosis.primaryDiagnosis}
Differential Diagnoses: ${diagnosis.differentialDiagnoses.join(", ")}
Clinical Reasoning: ${diagnosis.clinicalReasoning}
Treatment Plan: ${diagnosis.treatmentPlan}
Tests Ordered: ${orderedTests.map(t => t.name).join(", ")}
Questions Asked: ${chatHistory.filter(m => m.role === "user").length}

EVALUATION CRITERIA:
1. Diagnosis Accuracy (40 points)
2. History Taking (20 points)
3. Test Ordering Appropriateness (20 points)
4. Clinical Reasoning (10 points)
5. Treatment Plan (10 points)

Provide comprehensive, constructive feedback that:
- Evaluates diagnostic accuracy
- Identifies strengths in their approach
- Suggests specific improvements
- Analyzes test ordering efficiency
- Recommends learning resources

Return ONLY valid JSON in this exact format:
{
  "correctDiagnosis": "The correct diagnosis",
  "studentDiagnosis": "Student's diagnosis",
  "isCorrect": true/false,
  "score": 0-100,
  "feedback": {
    "strengths": ["Array of specific strengths"],
    "improvements": ["Array of specific areas to improve"],
    "testingEfficiency": {
      "appropriateTests": number,
      "unnecessaryTests": number,
      "missedTests": ["Array of missed critical tests"]
    }
  },
  "recommendations": ["Array of learning recommendations"]
}`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: "Generate comprehensive feedback for this case." }
      ],
      temperature: 0.5,
      response_format: { type: "json_object" }
    })

    const feedback = JSON.parse(completion.choices[0].message.content)

    // TODO: Save feedback to database for analytics
    // await saveFeedbackToDatabase(userId, caseData.id, feedback)

    return NextResponse.json({
      feedback,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error("OpenAI API error:", error)
    return NextResponse.json(
      { error: "Failed to generate feedback" },
      { status: 500 }
    )
  }
}
```

## 📦 Installation

### OpenAI
```bash
npm install openai
```

### Anthropic
```bash
npm install @anthropic-ai/sdk
```

### Google AI
```bash
npm install @google/generative-ai
```

## 🎯 Best Practices

### 1. **Error Handling**
Always wrap AI calls in try-catch blocks and provide fallback responses:

```typescript
try {
  const response = await openai.chat.completions.create({...})
  return response
} catch (error) {
  console.error("AI API error:", error)
  // Return fallback or mock response
  return generateMockResponse(input)
}
```

### 2. **Rate Limiting**
Implement rate limiting to prevent abuse:

```typescript
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 m"), // 10 requests per minute
})

const { success } = await ratelimit.limit(userId)
if (!success) {
  return NextResponse.json(
    { error: "Rate limit exceeded" },
    { status: 429 }
  )
}
```

### 3. **Caching**
Cache AI responses for identical inputs:

```typescript
import { Redis } from "@upstash/redis"

const redis = Redis.fromEnv()
const cacheKey = `chat:${caseId}:${messageHash}`

// Check cache first
const cached = await redis.get(cacheKey)
if (cached) return cached

// Generate new response
const response = await openai.chat.completions.create({...})

// Cache for 1 hour
await redis.setex(cacheKey, 3600, response)
```

### 4. **Cost Monitoring**
Track token usage and costs:

```typescript
const completion = await openai.chat.completions.create({...})

const usage = completion.usage
console.log(`Tokens used: ${usage.total_tokens}`)
console.log(`Estimated cost: $${(usage.total_tokens / 1000) * 0.03}`)

// Save to database for analytics
await saveUsageMetrics(userId, usage)
```

### 5. **Prompt Engineering**
- Be specific and clear in system prompts
- Use examples for complex outputs
- Set appropriate temperature (0.3-0.5 for factual, 0.7-0.9 for creative)
- Limit max_tokens to control costs
- Use structured outputs (JSON mode) when possible

## 🔄 Migration Steps

1. **Install AI SDK**
   ```bash
   npm install openai
   ```

2. **Add API Key**
   ```bash
   echo "OPENAI_API_KEY=your-key-here" >> .env.local
   ```

3. **Update API Routes**
   - Replace mock functions with AI calls
   - Test each endpoint individually
   - Monitor for errors and edge cases

4. **Test Thoroughly**
   - Test with various patient scenarios
   - Verify response quality
   - Check error handling
   - Monitor response times

5. **Deploy**
   - Set environment variables in production
   - Monitor costs and usage
   - Set up alerts for errors

## 💰 Cost Estimation

### OpenAI GPT-4 Turbo Pricing (as of 2024)
- Input: $0.01 per 1K tokens
- Output: $0.03 per 1K tokens

### Estimated Costs per Case:
- Patient Chat (10 messages): ~$0.05
- Test Results (5 tests): ~$0.10
- Feedback Generation: ~$0.05
- **Total per case: ~$0.20**

### Monthly Estimates:
- 100 students × 10 cases/month = 1,000 cases
- **Monthly cost: ~$200**

## 🚀 Next Steps

1. Choose your AI provider (OpenAI recommended)
2. Set up API keys
3. Replace mock functions in API routes
4. Test with sample cases
5. Monitor performance and costs
6. Optimize prompts based on results
7. Scale gradually

---

**Note**: Start with a small number of test cases to validate the AI responses before full deployment. Monitor costs closely during initial rollout.
