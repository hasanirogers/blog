'use strict';

const path = require('path');
const SftpClient = require('ssh2-sftp-client');
const { exec } = require("child_process");
const remoteDir = '/home/zerodivide85/sites/blog';

require('dotenv').config();

const config = {
  host: process.env.FTP_DEPLOY_HOST,
  username: process.env.FTP_DEPLOY_USERNAME,
  password: process.env.FTP_DEPLOY_PASSWORD,
  port: process.env.FTP_DEPLOY_PORT || 22
};

const main = async () => {
  const client = new SftpClient();
  const src = path.join(__dirname, '_site');

  try {
    await client.connect(config);
    await client.rmdir(remoteDir, true);

    client.on('upload', info => {
      console.log(`Listener: Uploaded ${info.source}`);
    });

    let result = await client.uploadDir(src, remoteDir);

    exec(`ALGOLIA_API_KEY='${process.env.ALGOLIA_API_KEY}' bundle exec jekyll algolia`, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }

      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }

      console.log(`stdout: ${stdout}`);
    });

    return result;
  } finally {
    client.end();
  }
}

main()
  .then(message => console.log(message))
  .catch(error => { console.log(`main error: ${error.message}`)});
