import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client
const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // Use Service Role Key for uploads
);

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const files = formData.getAll('files') as File[];

        if (!files.length) {
            return NextResponse.json({ error: 'No files provided' }, { status: 400 });
        }

        const imageUrls: string[] = [];

        for (const file of files) {
            const fileBuffer = await file.arrayBuffer();
            const filePath = `${Date.now()}-product`;

            const { data, error } = await supabase.storage
                .from('all/new') // Change to your Supabase bucket name
                .upload(filePath, fileBuffer, {
                    contentType: file.type,
                });

            if (error) {
                console.error('Supabase Upload Error:', error);
                continue;
            }

            const publicUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/all/new/${filePath}`;
            console.log('Public URL:', publicUrl);
            imageUrls.push(publicUrl);
        }

        return NextResponse.json({ imageUrls });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
    }
}
