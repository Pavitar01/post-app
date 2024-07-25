const TITLE: string = 'TITLE';
const SALT_ROUNDS = 10;
const JWT_CONSTANTS = {
    secret: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
    exp: '1h'
};
const GENERATE_MIGRATION_PATH = 'npm run typeorm migration:generate ./src/infrastructure/database/migrations/'
export { TITLE, SALT_ROUNDS, JWT_CONSTANTS, GENERATE_MIGRATION_PATH };
