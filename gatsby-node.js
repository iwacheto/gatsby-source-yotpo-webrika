"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.createSchemaCustomization = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _camelcaseKeysRecursive = _interopRequireDefault(require("camelcase-keys-recursive"));

var _fetch = require("./fetch");

var _utils = require("./utils");

var _mock = require("./mock");

const createSchemaCustomization = async ({
  actions: {
    createNode
  },
  createNodeId,
  createContentDigest
}, {
  shopName,
  shopifyAccessToken: token,
  yotpoAppKey,
  yotpoPerPage = 149,
  apiVersion = '2021-07',
  createDefaultObject = false,
  appendDefaultObject = false
}) => {
  if (!shopName || !token || !yotpoAppKey) {
    console.log('\nMissing configurations - shopName, shopifyAccessToken and yotpoAppKey are required');
    process.exit(1);
  }

  if (createDefaultObject) {
    await (0, _utils.createNodeFactory)(createNode, createNodeId, createContentDigest, _mock.mockYotpoResponse);
    console.log('created mock object');
    return;
  }

  try {
    console.time((0, _utils.formatMsg)('finished fetching shopify products'));
    const shopifyProducts = await (0, _fetch.getShopifyProducts)(shopName, token);
    console.timeEnd((0, _utils.formatMsg)('finished fetching shopify products'));
    const productIds = shopifyProducts.map(product => (0, _utils.decodeShopifyId)(product.id));
    console.time((0, _utils.formatMsg)('finished fetching yotpo reviews'));
    const reviews = await (0, _fetch.getReviews)({
      productIds,
      yotpoAppKey,
      yotpoPerPage
    });
    console.timeEnd((0, _utils.formatMsg)('finished fetching yotpo reviews'));

    if (appendDefaultObject) {
      reviews.push({
        productId: _mock.mockYotpoResponse.productId,
        bottomLine: _mock.mockYotpoResponse.bottomline,
        reviews: _mock.mockYotpoResponse.reviews,
        products: _mock.mockYotpoResponse.products
      });
      console.log('appended mock reviews');
    }
    console.time((0, _utils.formatMsg)('finished fetching yotpo questions'));
    const questions = [];
    // const questions = await (0, _fetch.getQuestions)({
    //   productIds,
    //   yotpoAppKey,
    //   yotpoPerPage
    // });
   
    console.timeEnd((0, _utils.formatMsg)('finished fetching yotpo questions'));
    let mergedData = reviews.map(review => {
      const question = questions.find(question => question.productId === review.productId);
      return {
        ...review,
        ...question
      };
    });

    const mergedProductIds = mergedData.map(data => data.productId);
    const leftoverQuestions = questions.filter(question => !mergedProductIds.includes(question.productId));
    mergedData = mergedData.concat(leftoverQuestions);
    await Promise.all(mergedData.map(async data => {
      const camelCaseData = (0, _camelcaseKeysRecursive.default)(data);
      await (0, _utils.createNodeFactory)(createNode, createNodeId, createContentDigest, camelCaseData);
    }));
  } catch (e) {
    console.error((0, _chalk.default)`\n{red error} an error occurred while sourcing data`);
    throw e;
  }

  return;
};

exports.createSchemaCustomization = createSchemaCustomization;