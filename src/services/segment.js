/* eslint-disable no-console */
const analytics = process.env.VUE_APP_SEGMENT_KEY
  ? window.analytics
  : {
      identify() {
        console.log('Call identify()');
      },
      page() {
        console.log('Track page');
      },

      track() {
        console.log('Track');
      },
    };

const SegmentService = {
  identify(user) {
    analytics.identify(user.id, {
      created: user.createdAt,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      isAdmin: user.isAdmin,
      isBusinessOwner: user.isBusinessOwner,
    });
  },

  trackPage(title) {
    analytics.page(title);
  },

  trackUserRegistered(properties) {
    analytics.track('User Registered', properties);
  },

  trackProductAddedToCard(properties) {
    analytics.track('Product Added To Card', properties);
  },

  trackPurchaseCompleted(properties) {
    analytics.track('Purchase Completed', properties);
  },

  trackDonationCompleted(properties) {
    analytics.track('Donation Completed', properties);
  },
};

export default SegmentService;
