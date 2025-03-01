import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import * as cv from '@techstark/opencv-js';
import sharp from 'sharp';

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

export async function POST(request: NextRequest) {
    const tempPath = join('/tmp', `video-${Date.now()}.mp4`);

    try {
        const formData = await request.formData();
        const videoFile = formData.get('video') as File;
        const officialCall = formData.get('officialCall') as string;

        if (!videoFile || !officialCall) {
            return NextResponse.json(
                { error: 'Video file and official call are required' },
                { status: 400 }
            );
        }

        // Save video temporarily
        const bytes = await videoFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(tempPath, buffer);

        // Extract and process frames
        const video = new cv.VideoCapture(tempPath);
        const frames: { base64: string; index: number }[] = [];
        let frameIndex = 0;

        while (true) {
            const frame = new cv.Mat();
            if (!video.read(frame)) break;

            // Only keep every 10th frame to reduce processing
            if (frameIndex % 10 === 0) {
                // Add visual analysis markers (players, ball, etc.)
                try {
                    // Draw bounding boxes for players (simplified example)
                    const gray = new cv.Mat();
                    cv.cvtColor(frame, gray, cv.COLOR_BGR2GRAY);
                    cv.GaussianBlur(gray, gray, new cv.Size(5, 5), 0);
                    // Add more CV processing here...
                    gray.delete();
                } catch (e) {
                    console.error('Error in CV processing:', e);
                }

                // Convert frame to JPEG using sharp
                const width = frame.cols;
                const height = frame.rows;
                // OpenCV typically uses 3 channels (BGR)
                const imgData = Buffer.from(frame.data);

                // Process with sharp to convert to JPEG
                const jpegBuffer = await sharp(imgData, {
                    raw: {
                        width,
                        height,
                        channels: 3 // BGR format
                    }
                })
                    .jpeg()
                    .toBuffer();

                const base64 = jpegBuffer.toString('base64');
                frames.push({ base64, index: frameIndex });
            }

            frameIndex++;
            frame.delete();
        }
        // Clean up resources
        // Note: VideoCapture doesn't have a standard cleanup method in OpenCV.js
        // The garbage collector will handle it

        // Analyze with GPT-4 Vision
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
                     3. Brief explanation (2-3 sentences)
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

        const aiAnalysis = JSON.parse(completion.choices[0].message.content || "{}") as AIVerdict;

        // Generate audio narration
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
        console.error('Error processing video:', error);
        return NextResponse.json(
            { error: 'Error processing video analysis' },
            { status: 500 }
        );
    } finally {
        // Cleanup: Remove temporary video file
        try {
            await unlink(tempPath);
        } catch (e) {
            console.error('Error cleaning up temp file:', e);
        }
    }
}

export const config = {
    api: {
        bodyParser: false,
        responseLimit: '50mb',
    },
}; 