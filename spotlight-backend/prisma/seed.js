const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding full dataset starting...');

  // تنظيف البيانات السابقة
  await prisma.siteSetting.deleteMany();
  await prisma.project.deleteMany();
  await prisma.service.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.partner.deleteMany();

  // 1. الشركاء (Partners)
  await prisma.partner.createMany({
    data: [
      {
        name: 'Bouwgroep Peters',
        logoUrl: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786273490/slazzer-preview-mz3m7_3_wx6iiz.png',
        sortOrder: 1
      },
      {
        name: 'Amaryn',
        logoUrl: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786273572/slazzer-preview-mz3m7_2_hki2nv.png',
        sortOrder: 2
      },
      {
        name: 'Van de Velde Installatiegroep',
        logoUrl: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786273608/slazzer-preview-mz3m7_1_ioitr9.png',
        sortOrder: 3
      }
    ],
    skipDuplicates: true
  });

  // 2. أعضاء الفريق (Team Members)
  await prisma.teamMember.createMany({
    data: [
      {
        name: 'Odai Alabsi',
        role: { ar: 'مؤسس وقائد الفريق', nl: 'Oprichter & Teamleider' },
        image: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786274808/Gemini_Generated_Image_1udncc1udncc1udn_4_ku6pe4.png',
        sortOrder: 1
      },
      {
        name: 'Ahmad Ahmad',
        role: { ar: 'كبير فنيي الكهرباء', nl: 'Eerste Elektricien' },
        image: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786274838/Gemini_Generated_Image_1udncc1udncc1udn_3_l1wmk0.png',
        sortOrder: 2
      },
      {
        name: 'Ahmad Ahmad',
        role: { ar: 'مشرف مشاريع', nl: 'Project Supervisor' },
        image: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786274868/Gemini_Generated_Image_1udncc1udncc1udn_2_tbbsou.png',
        sortOrder: 3
      },
      {
        name: 'Smart Systems Specialist',
        role: { ar: 'أخصائي أنظمة ذكية', nl: 'Specialist Slimme Systemen' },
        image: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786274904/Gemini_Generated_Image_1udncc1udncc1udn_1_jaxbvx.png',
        sortOrder: 4
      }
    ],
    skipDuplicates: true
  });

  // // 3. الخدمات (Services)
  // await prisma.service.createMany({
  //   data: [
  //     {
  //       slug: { ar: 'residential-renovation', nl: 'residential-renovation' },
  //       name: { ar: 'تجديد السكني', nl: 'Residentiële Renovatie' },
  //       description: { ar: 'خدمات تجديد وتأهيل الشبكات السكنية', nl: 'Renovatiediensten voor woningen' },
  //       mainImage: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786273843/a3bbd08db2317a71609e67af404107fe78695fa7_zhyut4.png'
  //     },
  //     {
  //       slug: { ar: 'solar-panels', nl: 'solar-panels' },
  //       name: { ar: 'الألواح الشمسية', nl: 'Zonnepanelen' },
  //       description: { ar: 'تركيب وصيانة أنظمة الألواح الشمسية', nl: 'Installatie van zonnepanelen' },
  //       mainImage: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786273889/90924987c47ba16a161599eaed139f64ed952d4b_dm84ic.png'
  //     },
  //     {
  //       slug: { ar: 'charging-stations', nl: 'charging-stations' },
  //       name: { ar: 'محطات الشحن', nl: 'Laadpalen' },
  //       description: { ar: 'تركيب محطات شحن السيارات الكهربائية', nl: 'Installatie van laadpalen' },
  //       mainImage: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786273927/2614c4d2b1b09a4f5a1646e66b80d459c1a2dbb3_xy3zyb.png'
  //     },
  //     {
  //       slug: { ar: 'breakdown-service', nl: 'breakdown-service' },
  //       name: { ar: 'خدمة الأعطال الطارئة', nl: 'Storingsdienst' },
  //       description: { ar: 'صيانة وإصلاح الأعطال الكهربائية 24/7', nl: '24/7 storingsdienst voor elektra' },
  //       mainImage: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786273975/c66326be97e184c017feb1c972cb86e27b7777ce_kmbscn.png'
  //     },
  //     {
  //       slug: { ar: 'electricity-installation', nl: 'electricity-installation' },
  //       name: { ar: 'التمديدات الكهربائية', nl: 'Elektrische Installaties' },
  //       description: { ar: 'تأسيس وتركيب التمديدات الكهربائية الكاملة', nl: 'Volledige elektrische installaties' },
  //       mainImage: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786274012/59b88452ef8636e4990d4d946db32c9763b39c1a_jd7wfq.png'
  //     }
  //   ],
  //   skipDuplicates: true
  // });

// 3. الخدمات (Services) - تعديل لإنشاء الخدمات واسترجاعها لربط الميديا بها
  // const createdServices = await Promise.all([
  //   prisma.service.create({
  //     data: {
  //       slug: { ar: 'residential-renovation', nl: 'residential-renovation' },
  //       name: { ar: 'تجديد السكني', nl: 'Residentiële Renovatie' },
  //       description: { ar: 'خدمات تجديد وتأهيل الشبكات السكنية', nl: 'Renovatiediensten voor woningen' },
  //       mainImage: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786273843/a3bbd08db2317a71609e67af404107fe78695fa7_zhyut4.png',
  //       media: {
  //         create: [
  //           {
  //             url: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786273843/a3bbd08db2317a71609e67af404107fe78695fa7_zhyut4.png',
  //             mediaType: 'image'
  //           }
  //         ]
  //       }
  //     }
  //   }),
  //   prisma.service.create({
  //     data: {
  //       slug: { ar: 'solar-panels', nl: 'solar-panels' },
  //       name: { ar: 'الألواح الشمسية', nl: 'Zonnepanelen' },
  //       description: { ar: 'تركيب وصيانة أنظمة الألواح الشمسية', nl: 'Installatie van zonnepanelen' },
  //       mainImage: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786273889/90924987c47ba16a161599eaed139f64ed952d4b_dm84ic.png',
  //       media: {
  //         create: [
  //           {
  //             url: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786273889/90924987c47ba16a161599eaed139f64ed952d4b_dm84ic.png',
  //             mediaType: 'image'
  //           }
  //         ]
  //       }
  //     }
  //   }),
  //   prisma.service.create({
  //     data: {
  //       slug: { ar: 'charging-stations', nl: 'charging-stations' },
  //       name: { ar: 'محطات الشحن', nl: 'Laadpalen' },
  //       description: { ar: 'تركيب محطات شحن السيارات الكهربائية', nl: 'Installatie van laadpalen' },
  //       mainImage: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786273927/2614c4d2b1b09a4f5a1646e66b80d459c1a2dbb3_xy3zyb.png',
  //       media: {
  //         create: [
  //           {
  //             url: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786273927/2614c4d2b1b09a4f5a1646e66b80d459c1a2dbb3_xy3zyb.png',
  //             mediaType: 'image'
  //           }
  //         ]
  //       }
  //     }
  //   }),
  //   prisma.service.create({
  //     data: {
  //       slug: { ar: 'breakdown-service', nl: 'breakdown-service' },
  //       name: { ar: 'خدمة الأعطال الطارئة', nl: 'Storingsdienst' },
  //       description: { ar: 'صيانة وإصلاح الأعطال الكهربائية 24/7', nl: '24/7 storingsdienst voor elektra' },
  //       mainImage: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786273975/c66326be97e184c017feb1c972cb86e27b7777ce_kmbscn.png',
  //       media: {
  //         create: [
  //           {
  //             url: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786273975/c66326be97e184c017feb1c972cb86e27b7777ce_kmbscn.png',
  //             mediaType: 'image'
  //           }
  //         ]
  //       }
  //     }
  //   }),
  //   prisma.service.create({
  //     data: {
  //       slug: { ar: 'electricity-installation', nl: 'electricity-installation' },
  //       name: { ar: 'التمديدات الكهربائية', nl: 'Elektrische Installaties' },
  //       description: { ar: 'تأسيس وتركيب التمديدات الكهربائية الكاملة', nl: 'Volledige elektrische installaties' },
  //       mainImage: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786274012/59b88452ef8636e4990d4d946db32c9763b39c1a_jd7wfq.png',
  //       media: {
  //         create: [
  //           {
  //             url: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786274012/59b88452ef8636e4990d4d946db32c9763b39c1a_jd7wfq.png',
  //             mediaType: 'image'
  //           }
  //         ]
  //       }
  //     }
  //   })
  // ]);


  // 3. الخدمات (Services)
  const createdServices = await Promise.all([
    prisma.service.create({
      data: {
        slug: { ar: 'residential-renovation', nl: 'residential-renovation' },
        name: { ar: 'تجديد السكني', nl: 'Residentiële Renovatie' },
        description: { ar: 'خدمات تجديد وتأهيل الشبكات السكنية', nl: 'Renovatiediensten voor woningen' },
        mainImage: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786273843/a3bbd08db2317a71609e67af404107fe78695fa7_zhyut4.png',
        videoUrl: 'https://res.cloudinary.com/demo/video/upload/sample.mp4',
        beforeAfters: {
          create: [
            {
              beforeUrl: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786274383/df3ee4c25068dcfe78216515e83d0971cc183c67_t79ntf.png',
              afterUrl: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786274285/d23078205585c77119a79b0f8e24cc8fddaa714f_amhcla.png',
              sortOrder: 1
            }
          ]
        }
      }
    }),
    prisma.service.create({
      data: {
        slug: { ar: 'solar-panels', nl: 'solar-panels' },
        name: { ar: 'الألواح الشمسية', nl: 'Zonnepanelen' },
        description: { ar: 'تركيب وصيانة أنظمة الألواح الشمسية', nl: 'Installatie van zonnepanelen' },
        mainImage: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786273889/90924987c47ba16a161599eaed139f64ed952d4b_dm84ic.png',
        videoUrl: 'https://res.cloudinary.com/demo/video/upload/sample.mp4'
      }
    }),
    prisma.service.create({
      data: {
        slug: { ar: 'charging-stations', nl: 'charging-stations' },
        name: { ar: 'محطات الشحن', nl: 'Laadpalen' },
        description: { ar: 'تركيب محطات شحن السيارات الكهربائية', nl: 'Installatie van laadpalen' },
        mainImage: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786273927/2614c4d2b1b09a4f5a1646e66b80d459c1a2dbb3_xy3zyb.png',
        videoUrl: 'https://res.cloudinary.com/demo/video/upload/sample.mp4'
      }
    }),
    prisma.service.create({
      data: {
        slug: { ar: 'breakdown-service', nl: 'breakdown-service' },
        name: { ar: 'خدمة الأعطال الطارئة', nl: 'Storingsdienst' },
        description: { ar: 'صيانة وإصلاح الأعطال الكهربائية 24/7', nl: '24/7 storingsdienst voor elektra' },
        mainImage: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786273975/c66326be97e184c017feb1c972cb86e27b7777ce_kmbscn.png',
        videoUrl: 'https://res.cloudinary.com/demo/video/upload/sample.mp4'
      }
    }),
    prisma.service.create({
      data: {
        slug: { ar: 'electricity-installation', nl: 'electricity-installation' },
        name: { ar: 'التمديدات الكهربائية', nl: 'Elektrische Installaties' },
        description: { ar: 'تأسيس وتركيب التمديدات الكهربائية الكاملة', nl: 'Volledige elektrische installaties' },
        mainImage: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786274012/59b88452ef8636e4990d4d946db32c9763b39c1a_jd7wfq.png',
        videoUrl: 'https://res.cloudinary.com/demo/video/upload/sample.mp4'
      }
    })
  ]);

  // 4. المشاريع (Projects)
  await prisma.project.createMany({
    data: [
      {
        title: { ar: 'مشروع فيلا فاخرة حديثة', nl: 'Modern Luxury Villa Project' },
        slug: { ar: 'modern-luxury-villa', nl: 'modern-luxury-villa' },
        description: { ar: 'مشروع إضاءة وتمديدات منزل فخم حديث', nl: 'Verlichting en bedrading voor een luxe villa' },
        mainImage: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786274285/d23078205585c77119a79b0f8e24cc8fddaa714f_amhcla.png',
        isActive: true
      },
      {
        title: { ar: 'تجديد فيلا قبل وبعد', nl: 'Before & After Villa Renovation' },
        slug: { ar: 'before-after-villa-renovation', nl: 'before-after-villa-renovation' },
        description: { ar: 'إعادة هيكلة وتجديد النظام الكهربائي بالكامل', nl: 'Volledige herstructurering van het elektrische systeem' },
        mainImage: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786274383/df3ee4c25068dcfe78216515e83d0971cc183c67_t79ntf.png',
        isActive: true
      }
    ],
    skipDuplicates: true
  });

  // 5. إعدادات الموقع والصور الثابتة (Site Settings)
  const settings = [
    { settingKey: 'logo_top', settingValue: { url: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786272647/825f26ef58ece275b8ddf172777a4f1068cdd254_xgfays.png' }, description: 'Logo Navbar' },
    { settingKey: 'logo_footer', settingValue: { url: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786273668/cdd5b25c083be9867faf25a46360ebe40b09ded3_oahkqj.png' }, description: 'Logo Footer' },
    { settingKey: 'hero_home_bg', settingValue: { url: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786272971/bb1ca885bea5d7d83ccd2066b4520feab48405ba_kbt4yo.png' }, description: 'Home Page Hero Image' },
    { settingKey: 'join_team_bg', settingValue: { url: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786273141/95ff64e484214cdabe48b7112d0f223ea9034cd4_fixjvh.png' }, description: 'Join Our Team Background' },
    { settingKey: 'hero_services_bg', settingValue: { url: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786273755/7a84c653882a5ff26951aa6a7f8885f0c7e98071_v1seni.png' }, description: 'Services Hero Image' },
    { settingKey: 'hero_service_details_bg', settingValue: { url: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786273803/c42fc16e1c111b7fa65cd6b187c0d86edfbc6b43_j50cb9.png' }, description: 'Service Details Hero Image' },
    { settingKey: 'cta_start_project_bg', settingValue: { url: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786274055/Rectangle_23861_vdqzdd.png' }, description: 'Ready to Start Project Section Image' },
    { settingKey: 'hero_about_bg', settingValue: { url: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786274751/eee6ef74b7f40064ed36915adbed3240c798f0bb_antkup.png' }, description: 'About Us Hero Banner' }
  ];

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { settingKey: s.settingKey },
      update: { settingValue: s.settingValue, description: s.description },
      create: s
    });
  }

  console.log('All Seeding Completed Successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });