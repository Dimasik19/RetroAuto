import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const carId = formData.get('carId') as string;

    if (!file || !carId) {
      return NextResponse.json({ error: 'Missing file or carId' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), 'public', 'cars');
    await mkdir(uploadDir, { recursive: true });

    const filename = `${carId}-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filepath = path.join(uploadDir, filename);

    await writeFile(filepath, buffer);

    const imageUrl = `/cars/${filename}`;

    const existingImages = await db.carImage.findMany({
      where: { carId },
      orderBy: { order: 'asc' },
    });

    const carImage = await db.carImage.create({
      data: {
        carId,
        filename,
        url: imageUrl,
        order: existingImages.length,
      },
    });

    return NextResponse.json({ image: carImage });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
