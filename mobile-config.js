App.info({
  id: 'com.sillmedia.seeds',
  name: 'Seed App',
  version: "0.0.1",
  description: 'This is my first testing Seed App',
  author: 'Jeff Sill',
  email: 'jeff.sill@gmail.com',
  website: 'http://sillmedia.com'
});

App.setPreference('BackgroundColor', '0xff0000ff');
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');

// Set up resources such as icons and launch screens.
App.icons({
  'iphone': 'icons/Group.png',
  'iphone_2x': 'icons/Group@2x.png',
  // ... more screen sizes and platforms ...
});
App.launchScreens({
  'iphone': 'splash/seed-app-screen-1.png',
  'iphone_2x': 'splash/seed-app-screen-2.png',
  // ... more screen sizes and platforms ...
});
