/* const { writeFile } = require('fs');
const { argv } = require('yargs');
// read environment variables from .env file
// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';
const targetPath = isProduction ? `./src/environments/environment.prod.ts` : `./src/environments/environment.ts`;
// require('dotenv').config({ path: './.env' });
// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   firebaseConfig:{
   apiKey: "${process.env.FIREBASE_API_KEY}",
   authDomain: "${process.env.AUTH_DOMAIN}",
   projectId: "${process.env.PROJECT_ID}",
   storageBucket: "${process.env.STORAGE_BUCKET}",
   messagingSenderId: "${process.env.MESSAGING_SENDER_ID}",
   appId: "${process.env.APP_ID}",
   measurementId: "${process.env.MEASUREMENT_ID}"
   }
};
`;
// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err) {
  if (err) {
    console.log(err);
  }
  console.log(`Wrote variables to ${targetPath}`);
});
*/

/* tslint:disable */
// @ts-nocheck
const { writeFile, existsSync, mkdirSync } = require('fs');
const { argv } = require('yargs');

require('dotenv').config();
const environment = argv.environment;

function writeFileUsingFS(targetPath, environmentFileContent) {
  writeFile(targetPath, environmentFileContent, function (err) {
    if (err) {
      console.log(err);
    }
    if (environmentFileContent !== '') {
      console.log(`wrote variables to ${targetPath}`);
    }
  });
}

// Providing path to the `environments` directory
const envDirectory = './src/environments';

// creates the `environments` directory if it does not exist
if (!existsSync(envDirectory)) {
  mkdirSync(envDirectory);
}

//creates the `environment.prod.ts` and `environment.ts` file if it does not exist
writeFileUsingFS('./src/environments/environment.prod.ts', '');
writeFileUsingFS('./src/environments/environment.ts', '');

// Checks whether command line argument of `prod` was provided signifying production mode
const isProduction = environment === 'prod';

// choose the correct targetPath based on the environment chosen
const targetPath = isProduction ? './src/environments/environment.prod.ts' : './src/environments/environment.ts';

//actual content to be compiled dynamically and pasted into respective environment files
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   firebaseConfig:{
   apiKey: "${process.env.FIREBASE_API_KEY}",
   authDomain: "${process.env.AUTH_DOMAIN}",
   databaseURL: "${process.env.DATABASE_URL}",
   projectId: "${process.env.PROJECT_ID}",
   storageBucket: "${process.env.STORAGE_BUCKET}",
   messagingSenderId: "${process.env.MESSAGING_SENDER_ID}",
   appId: "${process.env.APP_ID}",
   measurementId: "${process.env.MEASUREMENT_ID}"
   }
};
`;

writeFileUsingFS(targetPath, environmentFileContent); // appending data into the target file

/* tslint:enable */
