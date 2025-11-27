const ghpages = require('gh-pages');
const path = require('path');

ghpages.publish(
  path.join(__dirname, 'dist'),
  {
    branch: 'gh-pages',         // target branch
    dotfiles: true,              // include .nojekyll etc.
    push: true,                  // force push
    message: 'Deploying latest build', 
    repo: 'https://github.com/Gio-Padilla/WDD-330-Sleep-Outside-Team-05.git',
  },
  (err) => {
    if (err) console.error('Deployment failed:', err);
    else console.log('Deployment complete!');
  }
);
