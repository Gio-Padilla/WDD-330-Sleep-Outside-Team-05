const ghpages = require('gh-pages');

ghpages.publish(
  'dist',
  {
    branch: 'gh-pages',             // target branch
    dotfiles: true,                  // include .nojekyll etc.
    push: true,                      // force push
    message: 'Deploying latest build', 
  },
  (err) => {
    if (err) console.error('Deployment failed:', err);
    else console.log('Deployment complete!');
  }
);
