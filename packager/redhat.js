/* eslint-disable import/no-extraneous-dependencies */
const installer = require('electron-installer-redhat');

const options = {
  name: 'Rabet',
  src: 'release/rabet-linux-x64',
  dest: 'release/installers/',
  arch: 'amd64',
  productName: 'Rabet',
  version: '1.6.10',
  genericName: 'Rabet',
  icon: './desktop-logo/png/rabet128r.png',
  categories: ['Utility'],
};

async function main(options) {
  console.log('Creating package (this may take a while)');

  try {
    await Promise.all([installer(options)]);

    console.log(`Successfully created package at ${options.dest}`);
  } catch (err) {
    console.error(err, err.stack);
    process.exit(1);
  }
}

main(options);
