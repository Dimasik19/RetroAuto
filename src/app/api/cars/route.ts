import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { fallbackCars } from '@/lib/fallback-cars';

export async function GET() {
  try {
    const cars = await db.car.findMany({
      include: {
        specs: true,
        valuation: true,
        owners: {
          orderBy: { order: 'asc' },
        },
        timeline: {
          orderBy: { order: 'asc' },
        },
        images: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    if (cars.length === 0) {
      return NextResponse.json(fallbackCars);
    }

    const formattedCars = cars.map((car) => ({
      id: car.id,
      name: car.name,
      subtitle: car.subtitle,
      description: car.description,
      condition: car.condition,
      location: car.location,
      specs: car.specs || {},
      valuation: car.valuation || {},
      owners: car.owners,
      timeline: car.timeline,
      images: car.images.map((img) => img.url),
    }));

    return NextResponse.json(formattedCars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    return NextResponse.json(fallbackCars);
  }
}
