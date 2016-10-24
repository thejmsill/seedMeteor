if (Meteor.isClient) {
  Accounts.onLogin(function() {
    FlowRouter.go('all-seeds');
  });

  Accounts.onLogout(function() {
    FlowRouter.go('home');
  });
}

FlowRouter.route('/', {
  name: 'home',
  action() {
    if (Meteor.userId()) {
      FlowRouter.go('all-seeds');
    }
    GAnalytics.pageview();
    BlazeLayout.render('HomeLayout');
  }
});

FlowRouter.route('/all-seeds', {
  name: 'all-seeds',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'AllSeeds'});
  }
});

FlowRouter.route('/my-seeds', {
  name: 'my-seeds',
  action() {
    if (!Meteor.userId()) {
      FlowRouter.go('all-seeds');
    }
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Seeds'});
  }
});

FlowRouter.route('/list/:id', {
  name: 'my-seeds/list',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'SeedSingle'});
  }
});

FlowRouter.route('/user', {
  name: 'user-profile',
  action() {
    if (!Meteor.userId()) {
      FlowRouter.go('login');
    }
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'userProfile'});
  }
});

FlowRouter.route('/login', {
  name: 'login',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Login'});
  }
});