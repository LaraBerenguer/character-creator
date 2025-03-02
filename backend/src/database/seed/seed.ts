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
            console.log('No backgrounds found. Seeding new data...');

            // Convert and insert seed data
            console.log(`Preparing ${backgroundSeed.length} records for insertion`);
            const seedData = backgroundSeed.map(bg => ({
                title: bg.title,
                description: bg.description,
                type: bg.type
            }));
            console.log('Executing bulk create...');
            await Background.bulkCreate(seedData);
            console.log(`Successfully seeded ${seedData.length} backgrounds`);
        };

    } catch (error) {
        console.error('Error checking seed data:', error);
        throw error;
    };
};

export default seedDatabase;