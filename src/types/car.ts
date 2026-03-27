export interface Car {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  condition: 'excellent' | 'good' | 'running';
  location: 'in_collection' | 'on_exposition' | 'in_restoration';
  specs: CarSpecs;
  valuation: CarValuation;
  owners: CarOwner[];
  timeline: CarTimelineEvent[];
  images: string[];
}

export interface CarSpecs {
  brand: string;
  model: string;
  year: number;
  color: string;
  bodyType: string;
  engine: string;
  engineVolume: string;
  power: string;
  transmission: string;
  drive: string;
  vin: string;
  mileage: number;
  country: string;
  acquisitionDate: string;
  condition: string;
}

export interface CarValuation {
  currentValue: number;
  minValue: number;
  maxValue: number;
  assessmentDate: string;
  comment: string;
}

export interface CarOwner {
  id: string;
  name: string;
  period: string;
  note: string;
}

export interface CarTimelineEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  icon: string;
}
