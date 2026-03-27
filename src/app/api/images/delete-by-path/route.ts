import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { unlink } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { carId, imageUrl } = await request.json();

    if (!carId || !imageUrl) {
      return NextResponse.json({ error: 'Missing carId or imageUrl' }, { status: 400 });
    }

    const image = await db.carImage.findFirst({
      where: { carId, url: imageUrl },
    });

    if (image) {
      await db.carImage.delete({ where: { id: image.id } });

      try {
        const filepath = path.join(process.cwd(), 'public', imageUrl);
        await unlink(filepath);
      } catch {
        // File might not exist
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
