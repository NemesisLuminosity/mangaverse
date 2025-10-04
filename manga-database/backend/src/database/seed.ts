import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create sample manga data
  const sampleManga = [
    {
      title: 'One Piece',
      author: 'Eiichiro Oda',
      genre: 'Adventure, Comedy, Drama',
      status: 'ongoing',
      description: 'Monkey D. Luffy refuses to let anyone or anything stand in the way of his quest to become the king of all pirates.',
      coverImagePath: '/covers/one-piece.jpg',
      externalId: '13',
      sourceApi: 'myanimelist'
    },
    {
      title: 'Naruto',
      author: 'Masashi Kishimoto',
      genre: 'Action, Martial Arts, Shounen',
      status: 'completed',
      description: 'Naruto Uzumaki, a mischievous adolescent ninja, struggles as he searches for recognition and dreams of becoming the Hokage.',
      coverImagePath: '/covers/naruto.jpg',
      externalId: '11',
      sourceApi: 'myanimelist'
    },
    {
      title: 'Attack on Titan',
      author: 'Hajime Isayama',
      genre: 'Action, Drama, Horror',
      status: 'completed',
      description: 'Humanity fights for survival against the Titans, giant humanoid creatures that devour humans.',
      coverImagePath: '/covers/attack-on-titan.jpg',
      externalId: '16498',
      sourceApi: 'myanimelist'
    },
    {
      title: 'Demon Slayer',
      author: 'Koyoharu Gotouge',
      genre: 'Action, Historical, Supernatural',
      status: 'completed',
      description: 'A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko.',
      coverImagePath: '/covers/demon-slayer.jpg',
      externalId: '38000',
      sourceApi: 'myanimelist'
    },
    {
      title: 'My Hero Academia',
      author: 'Kohei Horikoshi',
      genre: 'Action, School, Shounen, Super Power',
      status: 'ongoing',
      description: 'A superhero-loving boy without any powers is determined to enroll in a prestigious hero academy.',
      coverImagePath: '/covers/my-hero-academia.jpg',
      externalId: '75989',
      sourceApi: 'myanimelist'
    }
  ];

  // Create sample users
  const sampleUsers = [
    {
      email: 'admin@mangadb.com',
      username: 'admin',
      role: 'admin',
      emailVerified: true
    },
    {
      email: 'user@mangadb.com',
      username: 'mangafan',
      role: 'user',
      emailVerified: true
    }
  ];

  // Insert sample data
  console.log('📚 Creating sample manga...');
  for (const manga of sampleManga) {
    await prisma.manga.create({
      data: manga
    });
  }

  console.log('👥 Creating sample users...');
  for (const user of sampleUsers) {
    await prisma.user.create({
      data: {
        ...user,
        passwordHash: '$2a$10$dummy.hash.for.demo.purposes.only'
      }
    });
  }

  console.log('✅ Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
