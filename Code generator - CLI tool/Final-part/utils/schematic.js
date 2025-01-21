const {
  generateControllerContent,
  generateServiceContent,
  generateRouteContent,
  generateModelContent,
  generateValidationContent,
} = require('./content');
const getSchematicDir = (schematicName) => {
  switch (schematicName) {
    case 'controller':
      return 'controllers';
    case 'route':
      return 'routes';
    case 'middleware':
      return 'middlewares';
    case 'service':
      return 'services';
    case 'model':
      return 'models';
    case 'validation':
      return 'validations';
    default:
      throw new Error(`${schematicName} is not supported.`);
  }
};

const getSchematicContentGenerator = (schematicName) => {
  switch (schematicName) {
    case 'controller':
      return generateControllerContent;
    case 'service':
      return generateServiceContent;
    case 'route':
      return generateRouteContent;
    case 'model':
      return generateModelContent;
    case 'validation':
      return generateValidationContent;
    default:
      throw new Error(`${schematicName} is not supported.`);
  }
};

module.exports = { getSchematicDir, getSchematicContentGenerator };
