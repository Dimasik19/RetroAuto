import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getFallbackCarById } from '@/lib/fallback-cars';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const car = await db.car.findUnique({
      where: { id },
      include: {
        specs: true,
        valuation: true,
        owners: { orderBy: { order: 'asc' } },
        timeline: { orderBy: { order: 'asc' } },
        images: { orderBy: { order: 'asc' } },
      },
    });

    if (!car) {
      const fallbackCar = getFallbackCarById(id);
      if (fallbackCar) {
        return NextResponse.json(fallbackCar);
      }

      return NextResponse.json({ error: 'Car not found' }, { status: 404 });
    }

    return NextResponse.json({
      ...car,
      specs: car.specs || {},
      valuation: car.valuation || {},
      images: car.images.map((img) => img.url),
    });
  } catch (error) {
    console.error('Error fetching car:', error);
    const { id } = await params;
    const fallbackCar = getFallbackCarById(id);
    if (fallbackCar) {
      return NextResponse.json(fallbackCar);
    }

    return NextResponse.json({ error: 'Failed to fetch car' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Basic fields
    const baseData: Record<string, unknown> = {};
    for (const field of ['name', 'subtitle', 'description', 'condition', 'location']) {
      if (body[field] !== undefined) baseData[field] = body[field];
    }
    if (Object.keys(baseData).length > 0) {
      await db.car.update({ where: { id }, data: baseData });
    }

    // Specs
    if (body.specs) {
      const { id: _id, carId: _carId, ...specsData } = body.specs;
      const specs = {
        brand: String(specsData.brand ?? ''),
        model: String(specsData.model ?? ''),
        year: parseInt(specsData.year) || 0,
        color: String(specsData.color ?? ''),
        bodyType: String(specsData.bodyType ?? ''),
        engine: String(specsData.engine ?? ''),
        engineVolume: String(specsData.engineVolume ?? ''),
        power: String(specsData.power ?? ''),
        transmission: String(specsData.transmission ?? ''),
        drive: String(specsData.drive ?? ''),
        vin: String(specsData.vin ?? ''),
        mileage: parseInt(specsData.mileage) || 0,
        country: String(specsData.country ?? ''),
        acquisitionDate: String(specsData.acquisitionDate ?? ''),
        condition: String(specsData.condition ?? ''),
      };
      await db.carSpecs.upsert({
        where: { carId: id },
        update: specs,
        create: { carId: id, ...specs },
      });
    }

    // Valuation
    if (body.valuation) {
      const { id: _id, carId: _carId, ...valData } = body.valuation;
      const valuation = {
        currentValue: parseInt(valData.currentValue) || 0,
        minValue: parseInt(valData.minValue) || 0,
        maxValue: parseInt(valData.maxValue) || 0,
        assessmentDate: String(valData.assessmentDate ?? ''),
        comment: String(valData.comment ?? ''),
      };
      await db.carValuation.upsert({
        where: { carId: id },
        update: valuation,
        create: { carId: id, ...valuation },
      });
    }

    // Owners (replace all)
    if (body.owners) {
      await db.carOwner.deleteMany({ where: { carId: id } });
      if (body.owners.length > 0) {
        await db.carOwner.createMany({
          data: body.owners.map((o: { name: string; period: string; note: string }, i: number) => ({
            carId: id,
            name: String(o.name ?? ''),
            period: String(o.period ?? ''),
            note: String(o.note ?? ''),
            order: i,
          })),
        });
      }
    }

    // Timeline (replace all)
    if (body.timeline) {
      await db.carTimelineEvent.deleteMany({ where: { carId: id } });
      if (body.timeline.length > 0) {
        await db.carTimelineEvent.createMany({
          data: body.timeline.map((t: { year: number; title: string; description: string; icon: string }, i: number) => ({
            carId: id,
            year: parseInt(t.year as unknown as string) || 0,
            title: String(t.title ?? ''),
            description: String(t.description ?? ''),
            icon: String(t.icon ?? ''),
            order: i,
          })),
        });
      }
    }

    // Return full updated car
    const updatedCar = await db.car.findUnique({
      where: { id },
      include: {
        specs: true,
        valuation: true,
        owners: { orderBy: { order: 'asc' } },
        timeline: { orderBy: { order: 'asc' } },
        images: { orderBy: { order: 'asc' } },
      },
    });

    return NextResponse.json({
      ...updatedCar,
      specs: updatedCar?.specs || {},
      valuation: updatedCar?.valuation || {},
      owners: updatedCar?.owners || [],
      timeline: updatedCar?.timeline || [],
      images: updatedCar?.images.map((img) => img.url) || [],
    });
  } catch (error) {
    console.error('Error updating car:', error);
    return NextResponse.json({ error: 'Failed to update car' }, { status: 500 });
  }
}
