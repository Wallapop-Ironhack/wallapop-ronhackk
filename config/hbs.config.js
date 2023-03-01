const hbs = require('hbs');

hbs.registerPartials(`${__dirname}/../views/partials`);

hbs.registerHelper("navActive", (currentPath, desiredPath) => {
  return currentPath === desiredPath ? "active" : "";
});

hbs.registerHelper("date", (date) => {
  const minDiff = (Date.now() - date.getTime()) / 1000 / 60;

  if (minDiff > 60 * 24) {
    return `${Math.round(minDiff / 60 / 24)}d ago`;
  }

  if (minDiff > 60) {
    return `${Math.round(minDiff / 60)}h ago`;
  }

  return `${Math.round(minDiff)}m ago`;
});

hbs.registerHelper('isOwnedBy', (product, user, options) => {
  if (product.user.id == user?.id) {
    return options.fn();
  } else {
    return options.inverse();
  }
});