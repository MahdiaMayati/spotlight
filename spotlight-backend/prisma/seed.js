
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding full dataset starting...');

  await prisma.siteSetting.deleteMany();
  await prisma.project.deleteMany();
  await prisma.service.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.partner.deleteMany();

  await prisma.partner.createMany({
    data: [
      {
        logoUrl: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786273490/slazzer-preview-mz3m7_3_wx6iiz.png',
        linkUrl: 'https://bouwgroeppeters.nl',
        sortOrder: 1,
        isActive: true
      },
      {
        logoUrl: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786273572/slazzer-preview-mz3m7_2_hki2nv.png',
        linkUrl: 'https://amaryn.nl',
        sortOrder: 2,
        isActive: true
      },
      {
        logoUrl: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786273608/slazzer-preview-mz3m7_1_ioitr9.png',
        linkUrl: 'https://vandevelde.nl',
        sortOrder: 3,
        isActive: true
      }
    ]
  });

  await prisma.teamMember.createMany({
    data: [
      { name: 'Odai Alabsi', role: { en: 'Founder & Team Leader' }, image: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786274808/Gemini_Generated_Image_1udncc1udncc1udn_4_ku6pe4.png', order: 1 },
      { name: 'Ahmad Ahmad', role: { en: 'Senior Electrician' }, image: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786274838/Gemini_Generated_Image_1udncc1udncc1udn_3_l1wmk0.png', order: 2 },
      { name: 'Ahmad Ahmad', role: { en: 'Project Supervisor' }, image: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786274868/Gemini_Generated_Image_1udncc1udncc1udn_2_tbbsou.png', order: 3 },
      { name: 'Ahmad Ahmad', role: { en: 'Smart Systems Specialist' }, image: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786274904/Gemini_Generated_Image_1udncc1udncc1udn_1_jaxbvx.png', order: 4 }
    ]
  });

  const services = [
    { title: 'Residential Renovation', mainImage: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786273843/a3bbd08db2317a71609e67af404107fe78695fa7_zhyut4.png', slug: 'residential-renovation' },
    { title: 'Solar Panels Installation', mainImage: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786273889/90924987c47ba16a161599eaed139f64ed952d4b_dm84ic.png', slug: 'solar-panels' },
    { title: 'EV Charging Stations', mainImage: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786273927/2614c4d2b1b09a4f5a1646e66b80d459c1a2dbb3_xy3zyb.png', slug: 'charging-stations' },
    { title: 'Breakdown & Emergency Service', mainImage: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786273975/c66326be97e184c017feb1c972cb86e27b7777ce_kmbscn.png', slug: 'breakdown-service' },
    { title: 'Electricity Installation & Panels', mainImage: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786274012/59b88452ef8636e4990d4d946db32c9763b39c1a_jd7wfq.png', slug: 'electricity-installation' }
  ];

  for (const s of services) {
    await prisma.service.create({
      data: {
        slug: s.slug,
        name: { en: s.title, nl: s.title },
        description: { en: `${s.title} professional services provided by Spotlight Elektrotechniek.`, nl: `${s.title} professionele diensten.` },
        mainImage: s.mainImage,
        isActive: true
      }
    });
  }
    await prisma.project.create({
    data: {
      slug: 'modern-villa-renovation',
      title: { en: 'Modern Villa Renovation', nl: 'Moderne Villa Renovatie' },
      description: { en: 'Complete electrical and lighting installation for luxury villa.', nl: 'Volledige elektrische installatie.' },
      mainImage: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786274285/d23078205585c77119a79b0f8e24cc8fddaa714f_amhcla.png',
      isActive: true
    }
  });

  const siteSettingsData = [
    { key: 'navbar_logo', value: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786272647/825f26ef58ece275b8ddf172777a4f1068cdd254_xgfays.png' },
    { key: 'footer_logo', value: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786273668/cdd5b25c083be9867faf25a46360ebe40b09ded3_oahkqj.png' },
    { key: 'home_hero_bg', value: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786272971/bb1ca885bea5d7d83ccd2066b4520feab48405ba_kbt4yo.png' },
    { key: 'join_team_image', value: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786273141/95ff64e484214cdabe48b7112d0f223ea9034cd4_fixjvh.png' },
    { key: 'services_hero_bg', value: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786273755/7a84c653882a5ff26951aa6a7f8885f0c7e98071_v1seni.png' },
    { key: 'service_details_hero_bg', value: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786273803/c42fc16e1c111b7fa65cd6b187c0d86edfbc6b43_j50cb9.png' },
    { key: 'start_project_bg', value: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786274055/Rectangle_23861_vdqzdd.png' },
    { key: 'about_hero_banner', value: 'https://res.cloudinary.com/df7chxawb/image/upload/v1786274751/eee6ef74b7f40064ed36915adbed3240c798f0bb_antkup.png' }
  ];

  for (const item of siteSettingsData) {
    await prisma.siteSetting.upsert({
      where: { settingKey: item.key },
      update: { settingValue: item.value },
      create: { settingKey: item.key, settingValue: item.value }
    });
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });