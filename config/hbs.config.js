const hbs = require('hbs');

hbs.registerPartials(`${__dirname}/../views/partials`);

hbs.registerHelper("navActive", (currentPath, desiredPath) => {
  return currentPath === desiredPath ? "active" : "";
});


hbs.registerHelper('isOwnedBy', (product, user, options) => {
  if (product.user.id == user?.id) {
    return options.fn();
  } else {
    return options.inverse();
  }
});