import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { writeFile, unlink, mkdir, readdir, rmdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import sharp from 'sharp';

const execPromise = promisify(exec);

interface AIVerdict {
    decision: 'CORRECT_CALL' | 'INCORRECT_CALL' | 'UNCLEAR';
    confidenceScore: number;
    explanation: string;
    ruleReference?: string;
    keyFrameIndex: number;
}

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Helper function to extract frames using FFmpeg
async function extractFrames(videoPath: string, outputDir: string, frameRate: number = 1): Promise<string[]> {
    if (!existsSync(outputDir)) {
        await mkdir(outputDir, { recursive: true });
    }

    const command = `ffmpeg -i "${videoPath}" -vf "fps=${frameRate}" -q:v 2 "${join(outputDir, 'frame-%04d.jpg')}"`;
    console.log(`[Video Analysis] Running FFmpeg command: ${command}`);

    try {
        await execPromise(command);
        const files = await readdir(outputDir);
        return files
            .filter(file => file.startsWith('frame-') && file.endsWith('.jpg'))
            .map(file => join(outputDir, file))
            .sort();
    } catch (error) {
        console.error('[Video Analysis] FFmpeg frame extraction failed:', error);
        throw new Error('Failed to extract video frames');
    }
}

// API Route Handler
export async function POST(request: NextRequest) {
    const timestamp = Date.now();
    const tempPath = join('/tmp', `video-${timestamp}.mp4`);
    const framesDir = join('/tmp', `frames-${timestamp}`);

    try {
        const formData = await request.formData();
        const videoFile = formData.get('video') as File;
        const officialCall = formData.get('officialCall') as string;

        if (!videoFile || !officialCall) {
            return NextResponse.json({ error: 'Video and official call required' }, { status: 400 });
        }

        // Save video temporarily
        const buffer = Buffer.from(await videoFile.arrayBuffer());
        await writeFile(tempPath, buffer);
        console.log(`[Video Analysis] Video saved: ${tempPath}`);

        // Extract frames using FFmpeg
        const framePaths = await extractFrames(tempPath, framesDir, 1);
        const limitedFramePaths = framePaths.slice(0, 50);

        console.log(`[Video Analysis] Processed ${limitedFramePaths.length} frames`);

        // Convert frames to Base64 for OpenAI
        const frames: { base64: string; index: number }[] = [];
        for (let i = 0; i < limitedFramePaths.length; i++) {
            try {
                const imageBuffer = await sharp(limitedFramePaths[i])
                    .resize(800)
                    .jpeg({ quality: 80 })
                    .toBuffer();
                frames.push({ base64: imageBuffer.toString('base64'), index: i });
            } catch (error) {
                console.error(`[Video Analysis] Error processing frame ${i}:`, error);
            }
        }

        // Send frames to OpenAI Vision API
        const completion = await openai.chat.completions.create({
            model: "gpt-4-vision-preview",
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: `Analyze this basketball play. The official call was: "${officialCall}". 
                                Determine if it was a Correct Call, Incorrect Call, or Unclear. 
                                Consider: player positioning, restricted area violations, ball trajectory, and foul criteria.
                                Provide: 
                                1. Your verdict (CORRECT_CALL, INCORRECT_CALL, or UNCLEAR)
                                2. Confidence score (0-100)
                                3. Explanation (2-3 sentences)
                                4. NBA rule reference (if incorrect call)
                                5. Index of the most crucial frame
                                Format as JSON.`
                        },
                        ...frames.map(frame => ({
                            type: "image_url" as const,
                            image_url: {
                                url: `data:image/jpeg;base64,${frame.base64}`
                            }
                        }))
                    ]
                }
            ],
            max_tokens: 1000,
            response_format: { type: "json_object" }
        });

        // Parse AI response
        const aiAnalysis = JSON.parse(completion.choices[0].message.content || "{}") as AIVerdict;

        console.log(`[Video Analysis] AI Verdict: ${aiAnalysis.decision}, Confidence: ${aiAnalysis.confidenceScore}%`);

        // Generate TTS Audio (Optional)
        const narrationText = `AI Verdict: ${aiAnalysis.decision}. 
                                Confidence: ${aiAnalysis.confidenceScore}%. 
                                ${aiAnalysis.explanation} 
                                ${aiAnalysis.ruleReference ? 'Rule reference: ' + aiAnalysis.ruleReference : ''}`;

        const narrationResponse = await openai.audio.speech.create({
            model: "tts-1",
            voice: "onyx",
            input: narrationText
        });

        const audioBuffer = Buffer.from(await narrationResponse.arrayBuffer());
        const audioBase64 = audioBuffer.toString('base64');

        // Send JSON Response
        return NextResponse.json({
            verdict: aiAnalysis.decision,
            confidenceScore: aiAnalysis.confidenceScore,
            explanation: aiAnalysis.explanation,
            ruleReference: aiAnalysis.ruleReference,
            keyFrameIndex: aiAnalysis.keyFrameIndex,
            frames: frames.map(f => ({
                base64: f.base64,
                index: f.index,
                isKeyFrame: f.index === aiAnalysis.keyFrameIndex
            })),
            audioNarration: audioBase64
        });

    } catch (error) {
        console.error('[Video Analysis] Error processing:', error);
        return NextResponse.json({ error: 'Error analyzing video' }, { status: 500 });
    } finally {
        // Cleanup Temporary Files
        try {
            if (existsSync(tempPath)) await unlink(tempPath);
            if (existsSync(framesDir)) {
                for (const file of await readdir(framesDir)) {
                    await unlink(join(framesDir, file));
                }
                await rmdir(framesDir);
            }
            console.log('[Video Analysis] Temporary files cleaned up');
        } catch (cleanupError) {
            console.error('[Video Analysis] Cleanup error:', cleanupError);
        }
    }
}

// API Config
export const config = {
    api: {
        bodyParser: false,
        responseLimit: '50mb',
    },
};
