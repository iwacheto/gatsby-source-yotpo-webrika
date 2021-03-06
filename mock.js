"use strict";

exports.__esModule = true;
exports.mockYotpoResponse = void 0;
const mockYotpoResponse = {
  bottomline: {
    totalReview: 1,
    averageScore: 4.90385,
    totalOrganicReviews: 0,
    organicAverageScore: 0,
    starDistribution: {
      _1: 0,
      _2: 0,
      _3: 0,
      _4: 0,
      _5: 1
    }
  },
  products: [{
    id: 1,
    domainKey: '1',
    name: 'test',
    socialLinks: {
      linkedin: '',
      facebook: '',
      twitter: '',
      googleOauth2: ''
    },
    embeddedWidgetLink: '',
    testimonialsProductLink: '',
    productLink: '',
    imageUrl: ''
  }],
  reviews: [{
    id: 1,
    score: 5,
    votesUp: 0,
    votesDown: 0,
    content: 'test',
    title: 'test',
    createdAt: '2020-06-29T10:26:41.000Z',
    verifiedBuyer: true,
    sentiment: 0.951626,
    productId: 1,
    imagesData: [{
      id: 1,
      thumbUrl: 'https://via.placeholder.com/75.png?text=Review+image+thumb',
      originalUrl: 'https://via.placeholder.com/400.png?text=Review+image+original'
    }],
    user: {
      userId: 1,
      socialImage: 'test',
      userType: 'test',
      isSocialConnected: 0,
      displayName: 'test'
    },
    comment: {
      id: 1,
      content: 'test',
      createdAt: '2020-06-29T10:26:41.000Z'
    }
  }],
  questions: [{
    id: 1,
    content: 'test',
    createdAt: '2021-04-06T12:15:35.000Z',
    userType: 'User',
    asker: {
      id: 1,
      displayName: 'test',
      email: 'user@example.com',
      isSocialConnected: false,
      score: 0,
      slug: 'user-12345',
      socialImage: 'test'
    },
    sortedPublicAnswers: [{
      id: 1,
      content: 'test',
      isStoreOwnerComment_: true,
      votesDown: 0,
      votesUp: 0,
      createdAt: '2021-04-07T23:53:17.000Z',
      answerer: {
        id: 1,
        displayName: 'test',
        isSocialConnected: false,
        score: 0,
        slug: 'answerer-12345',
        socialImage: 'test'
      }
    }]
  }],
  productId: 'mock',
  totalAnswers: 5,
  totalQuestions: 5
};
exports.mockYotpoResponse = mockYotpoResponse;