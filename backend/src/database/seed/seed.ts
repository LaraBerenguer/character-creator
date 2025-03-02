import backgroundSeed from './backgrounds-data';
import Background from '../../models/background';

const seedDatabase = async () => {
    try {
        console.log('Starting database seeding...');

        // check data
        console.log('Checking existing data...');
        let count = await Background.count();
        console.log(`Found ${count} records in backgrounds table`);

        if (count > 0) {
            console.log(`Database already contains ${count} backgrounds`);
        } else {
            console.log('Warning: No backgrounds found. Please run the SQL seed script.');
        };

        /*const isDevelopment = process.env.ENVIRONMENT?.toLowerCase() === 'development';
        if (isDevelopment) {
            console.log('Development environment detected, clearing existing data...');
            await Background.destroy({ where: {} });
            count = 0;
        }

        if (count === 0) {
            // Convert and insert seed data
            console.log('Seeding new data...');
            console.log(`Preparing ${backgroundSeed.length} records for insertion`);
            const seedData = backgroundSeed.map(bg => ({
                title: bg.title,
                description: bg.description,
                type: bg.type
            }));

            console.log('Executing bulk create...');
            await Background.bulkCreate(seedData);
            console.log(`Successfully seeded ${seedData.length} backgrounds`);
        } else {
            console.log('Database already seeded. Skipping...');
        };*/

    } catch (error) {
        //console.error('Error seeding database:', error);
        console.error('Error checking seed data:', error);
        throw error;
    };
};

export default seedDatabase;