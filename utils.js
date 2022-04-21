"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.createNodeFactory = exports.decodeShopifyId = exports.formatMsg = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

const formatMsg = msg => (0, _chalk.default)`\n{blue gatsby-source-yotpo-shopify} ${msg}`;

exports.formatMsg = formatMsg;

const decodeShopifyId = base64Id => {
  const shopifyId = Buffer.from(base64Id, 'base64').toString('binary');
  const id = shopifyId.substr(shopifyId.lastIndexOf('/') + 1);
  return id;
};

exports.decodeShopifyId = decodeShopifyId;

const createNodeFactory = async (createNode, createNodeId, createContentDigest, data) => {
  const type = 'YotpoProduct';
  await createNode({ ...data,
    id: createNodeId(`${type}-${data.productId}`),
    parent: null,
    children: [],
    internal: {
      type: type,
      content: JSON.stringify(data),
      contentDigest: createContentDigest(data)
    }
  });
  return;
};

exports.createNodeFactory = createNodeFactory;