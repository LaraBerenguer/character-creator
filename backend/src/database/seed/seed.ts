import backgroundSeed from './backgrounds-data';
import Background from '../../models/background';

const seedDatabase = async () => {
    try {
        console.log('Starting database seeding...');              
        let count = await Background.count();       

        if (count > 0) {
            console.log(`Database already contains ${count} backgrounds`);
        } else {
            console.log('No backgrounds found. Seeding new data...');
                       
            const seedData = backgroundSeed.map(bg => ({
                title: bg.title,
                description: bg.description,
                type: bg.type
            }));            
            await Background.bulkCreate(seedData);
            console.log(`Successfully seeded ${seedData.length} backgrounds`);
        };
    } catch (error) {
        console.error('Error checking seed data:', error);
        throw error;
    };
};

export default seedDatabase;