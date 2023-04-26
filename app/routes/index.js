const routes = Object.freeze({
  // * AUTH
  WELCOME: 'Welcome',
  REGISTER: 'Register',
  VERIFICATION: 'Verify',
  ACCOUNT_CREATED: 'ACCOUNT_CREATED',
  LOGIN: 'Login',

  // * ACCOUNT
  ACCOUNT_DASHBOARD: 'Account',
  PROFILE_UPDATE: 'Profile',
  BANK_INFO: 'Bank Information',
  SELECT_LANGUAGE: 'Change Language',

  // * LOAN, PAYMENTS, APPLICATIONS & NOTIFICATION
  APPLY_LOAN: 'Apply',
  LOANS: 'Loans',
  PAYMENTS: 'Payments',
  APPLICATIONS: 'Applications',
  NOTIFICATIONS: 'Notifications',

  // * OWNER HOME
  OWNER_HOME: 'OWNER_HOME',

  // * TAB NAVIGATOR
  TAB_ACCOUNT_NAVIGATOR: 'TAB_ACCOUNT_NAVIGATOR',
  TAB_LOAN_PAYMENT_NAVIGATOR: 'TAB_LOAN_PAYMENT_NAVIGATOR',
});

export default routes;
