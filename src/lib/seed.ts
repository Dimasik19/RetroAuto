import { db } from './db';

async function main() {
  // Check if cars already exist
  const existingCars = await db.car.count();
  if (existingCars > 0) {
    console.log('Database already seeded');
    return;
  }

  // Create Mazda RX-3
  const mazda = await db.car.create({
    data: {
      name: 'Mazda RX-3',
      subtitle: 'Роторный легендарный спорткар',
      description: 'Mazda RX-3 — легендарный японский спортивный автомобиль, оснащённый уникальным роторным двигателем Wankel. Эта модель стала визитной карточкой Mazda и доказала превосходство роторной технологии в автоспорте. Автомобиль прошёл полную реставрацию в 2015 году и находится в отличном коллекционном состоянии.',
      condition: 'excellent',
      location: 'in_collection',
      specs: {
        create: {
          brand: 'Mazda',
          model: 'RX-3 Savanna',
          year: 1974,
          color: 'Солнечный оранжевый',
          bodyType: 'Купе',
          engine: '12A Rotary',
          engineVolume: '1.1 л (роторный)',
          power: '110 л.с.',
          transmission: '4-ступенчатая МКПП',
          drive: 'Задний',
          vin: 'MZR74******52891',
          mileage: 78500,
          country: 'Япония',
          acquisitionDate: '2014-06-15',
          condition: 'Отличное',
        },
      },
      valuation: {
        create: {
          currentValue: 56000,
          minValue: 48000,
          maxValue: 60000,
          assessmentDate: '2024-01-15',
          comment: 'Стоимость растёт на 8-12% ежегодно благодаря уникальности роторного двигателя и редкости модели в Европе.',
        },
      },
      owners: {
        create: [
          { name: 'Такаши Ямамото', period: '1974-1985', note: 'Первый владелец, дилер Mazda в Токио', order: 1 },
          { name: 'Ханс Мюллер', period: '1985-2014', note: 'Немецкий коллекционер, хранил в музее', order: 2 },
          { name: 'RetroAuto Collection', period: '2014-настоящее время', note: 'Текущий владелец, профессиональная реставрация', order: 3 },
        ],
      },
      timeline: {
        create: [
          { year: 1974, title: 'Производство', description: 'Автомобиль выпущен на заводе Mazda в Хиросиме', icon: 'event', order: 1 },
          { year: 1974, title: 'Первый владелец', description: 'Приобретён Такаши Ямамото в Токио', icon: 'owner', order: 2 },
          { year: 1985, title: 'Переезд в Европу', description: 'Продан немецкому коллекционеру Хансу Мюллеру', icon: 'purchase', order: 3 },
          { year: 2014, title: 'Пополнение коллекции', description: 'Приобретён RetroAuto Collection', icon: 'purchase', order: 4 },
          { year: 2015, title: 'Реставрация', description: 'Полная профессиональная реставрация двигателя и кузова', icon: 'restoration', order: 5 },
          { year: 2016, title: 'Награда', description: 'Первое место на Retro Auto Show в Мюнхене', icon: 'award', order: 6 },
          { year: 2023, title: 'Пробег', description: 'Отмечен пробег 78,500 км — оригинальный', icon: 'mileage', order: 7 },
        ],
      },
      images: {
        create: [{ filename: 'mazda-rx3.png', url: '/cars/mazda-rx3.png', order: 0 }],
      },
    },
  });

  // Create VAZ 2106
  const vaz2106 = await db.car.create({
    data: {
      name: 'ВАЗ 2106',
      subtitle: 'Классика советского автопрома',
      description: 'ВАЗ 2106 — легендарный советский автомобиль, выпускавшийся с 1976 по 2006 год. Эта модель стала символом целой эпохи и мечтой миллионов советских семей. Автомобиль находится в полностью оригинальном состоянии с минимальным пробегом для своего возраста.',
      condition: 'running',
      location: 'on_exposition',
      specs: {
        create: {
          brand: 'ВАЗ',
          model: '2106',
          year: 1979,
          color: 'Наследный',
          bodyType: 'Седан',
          engine: 'ВАЗ-2106',
          engineVolume: '1.6 л',
          power: '75 л.с.',
          transmission: '4-ступенчатая МКПП',
          drive: 'Задний',
          vin: 'XTA210600******',
          mileage: 156000,
          country: 'СССР',
          acquisitionDate: '2019-08-22',
          condition: 'Хорошее',
        },
      },
      valuation: {
        create: {
          currentValue: 11000,
          minValue: 8500,
          maxValue: 13000,
          assessmentDate: '2024-02-10',
          comment: 'Стабильный рост интереса к советской классике. Автомобили в оригинальном состоянии ценятся выше.',
        },
      },
      owners: {
        create: [
          { name: 'Михаил Петрович С.', period: '1979-1998', note: 'Инженер с автозавода, первый владелец', order: 1 },
          { name: 'RetroAuto Collection', period: '2019-настоящее время', note: 'Текущий владелец', order: 2 },
        ],
      },
      timeline: {
        create: [
          { year: 1979, title: 'Производство', description: 'Выпущен на Волжском автомобильном заводе', icon: 'event', order: 1 },
          { year: 1979, title: 'Первый владелец', description: 'Приобретён инженером Михаилом С.', icon: 'owner', order: 2 },
          { year: 1998, title: 'Гаражное хранение', description: 'Автомобиль поставлен на длительное хранение', icon: 'event', order: 3 },
          { year: 2019, title: 'Пополнение коллекции', description: 'Приобретён RetroAuto Collection', icon: 'purchase', order: 4 },
          { year: 2020, title: 'Техническое обслуживание', description: 'Замена всех жидкостей и расходников', icon: 'restoration', order: 5 },
          { year: 2023, title: 'Пробег', description: 'Зафиксирован пробег 156,000 км', icon: 'mileage', order: 6 },
        ],
      },
      images: {
        create: [{ filename: 'vaz-2106.png', url: '/cars/vaz-2106.png', order: 0 }],
      },
    },
  });

  // Create VAZ 2101
  const vaz2101 = await db.car.create({
    data: {
      name: 'ВАЗ 2101',
      subtitle: 'Первая «Жигули» — начало легенды',
      description: 'ВАЗ 2101 — легендарный советский автомобиль, ставший первой моделью семейства «Жигули». Этот экземпляр 1974 года выпуска в редком голубом цвете представляет особую коллекционную ценность как один из ранних представителей модели, положившей начало эпохе массового автомобилизации в СССР.',
      condition: 'excellent',
      location: 'in_collection',
      specs: {
        create: {
          brand: 'ВАЗ',
          model: '2101',
          year: 1974,
          color: 'Голубой',
          bodyType: 'Седан',
          engine: 'ВАЗ-2101',
          engineVolume: '1.2 л',
          power: '64 л.с.',
          transmission: '4-ступенчатая МКПП',
          drive: 'Задний',
          vin: 'XTA210100******',
          mileage: 98000,
          country: 'СССР',
          acquisitionDate: '2020-05-18',
          condition: 'Отличное',
        },
      },
      valuation: {
        create: {
          currentValue: 13000,
          minValue: 11000,
          maxValue: 16000,
          assessmentDate: '2024-02-15',
          comment: 'Ранние экземпляры первого года массового производства в оригинальном состоянии особенно ценятся коллекционерами. Голубой цвет — редкий для этой модели.',
        },
      },
      owners: {
        create: [
          { name: 'Анатолий Иванович П.', period: '1974-1992', note: 'Врач, первый владелец, бережная эксплуатация', order: 1 },
          { name: 'Семья Смирновых', period: '1992-2020', note: 'Гаражное хранение, минимальный пробег', order: 2 },
          { name: 'RetroAuto Collection', period: '2020-настоящее время', note: 'Текущий владелец', order: 3 },
        ],
      },
      timeline: {
        create: [
          { year: 1974, title: 'Производство', description: 'Выпущен на Волжском автомобильном заводе в первый год массового производства', icon: 'event', order: 1 },
          { year: 1974, title: 'Первый владелец', description: 'Приобретён врачом Анатолием П. в Тольятти', icon: 'owner', order: 2 },
          { year: 1992, title: 'Передача семье', description: 'Автомобиль перешёл к семье Смирновых', icon: 'owner', order: 3 },
          { year: 2020, title: 'Пополнение коллекции', description: 'Приобретён RetroAuto Collection', icon: 'purchase', order: 4 },
          { year: 2021, title: 'Реставрация', description: 'Полная реставрация кузова с сохранением оригинального голубого цвета', icon: 'restoration', order: 5 },
          { year: 2023, title: 'Пробег', description: 'Зафиксирован пробег 98,000 км — оригинальный', icon: 'mileage', order: 6 },
        ],
      },
      images: {
        create: [{ filename: 'vaz-2101.png', url: '/cars/vaz-2101.png', order: 0 }],
      },
    },
  });

  // Create Moskvich 412
  const moskvich = await db.car.create({
    data: {
      name: 'Москвич 412',
      subtitle: 'Советская классика эпохи застоя',
      description: 'Москвич 412 — советский легковой автомобиль, выпускавшийся на заводе АЗЛК с 1967 по 1976 год. Этот экземпляр 1975 года является редким образцом в отличном коллекционном состоянии с полностью оригинальным интерьером.',
      condition: 'good',
      location: 'in_restoration',
      specs: {
        create: {
          brand: 'Москвич',
          model: '412',
          year: 1975,
          color: 'Вишнёвый',
          bodyType: 'Седан',
          engine: 'УЗАМ-412',
          engineVolume: '1.5 л',
          power: '75 л.с.',
          transmission: '4-ступенчатая МКПП',
          drive: 'Задний',
          vin: 'MZ412******8432',
          mileage: 124000,
          country: 'СССР',
          acquisitionDate: '2017-11-30',
          condition: 'Отличное',
        },
      },
      valuation: {
        create: {
          currentValue: 16000,
          minValue: 13000,
          maxValue: 19000,
          assessmentDate: '2024-02-05',
          comment: 'Редкая модель в хорошем состоянии. Ценность будет расти по мере исчезновения таких автомобилей.',
        },
      },
      owners: {
        create: [
          { name: 'Виктор Николаевич К.', period: '1975-2005', note: 'Директор школы, бережный владелец', order: 1 },
          { name: 'Семья Ковалёвых', period: '2005-2017', note: 'Наследники, гаражное хранение', order: 2 },
          { name: 'RetroAuto Collection', period: '2017-настоящее время', note: 'Текущий владелец', order: 3 },
        ],
      },
      timeline: {
        create: [
          { year: 1975, title: 'Производство', description: 'Выпущен на заводе АЗЛК в Москве', icon: 'event', order: 1 },
          { year: 1975, title: 'Первый владелец', description: 'Приобретён директором школы Виктором К.', icon: 'owner', order: 2 },
          { year: 2005, title: 'Передача наследникам', description: 'Автомобиль перешёл к семье Ковалёвых', icon: 'owner', order: 3 },
          { year: 2017, title: 'Пополнение коллекции', description: 'Приобретён RetroAuto Collection', icon: 'purchase', order: 4 },
          { year: 2018, title: 'Реставрация', description: 'Косметическая реставрация кузова и хрома', icon: 'restoration', order: 5 },
          { year: 2020, title: 'Награда', description: 'Участие в выставке «Эпоха застоя»', icon: 'award', order: 6 },
          { year: 2023, title: 'Пробег', description: 'Зафиксирован пробег 124,000 км', icon: 'mileage', order: 7 },
        ],
      },
      images: {
        create: [{ filename: 'moskvich-412.png', url: '/cars/moskvich-412.png', order: 0 }],
      },
    },
  });

  console.log('Database seeded successfully!');
  console.log('Created cars:', mazda.id, vaz2106.id, vaz2101.id, moskvich.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
