const { projectConfig } = require('../config/config');
const generateEnvContent = (projectName) => {
  return `DB_CONNECTION=${projectConfig.connectionString}/${projectName}\nPORT=${projectConfig.port}\nNODE_ENV=${projectConfig.nodeEnv} `;
};

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const generateControllerContent = (args) => {
  const { fileName } = args;
  return `
  const catchAsync = require('./../utils/catchAsync');
  const { ${fileName}Service } = require('./../services');
  const httpStatus = require('http-status');

  const create${capitalize(fileName)} = catchAsync(async (req, res) => {
    await ${fileName}Service.create${capitalize(fileName)}(req.body);
    res
      .status(httpStatus.CREATED)
      .send({ success: true, message: '${capitalize(
        fileName
      )} created successfully' });
  });

  const get${capitalize(fileName)}s = catchAsync(async (req, res) => {
    const ${fileName}s = await ${fileName}Service.get${capitalize(fileName)}s();
    res.status(httpStatus.OK).json(${fileName}s);
  });

  const get${capitalize(fileName)}ById = catchAsync(async (req, res) => {
    const ${fileName} = await ${fileName}Service.get${capitalize(
    fileName
  )}ById(req.params.id);
    if (!${fileName}) {
      return res.status(httpStatus.NOT_FOUND).send({ message: '${capitalize(
        fileName
      )} not found' });
    }
    res.status(httpStatus.OK).json(${fileName});
  });

  const update${capitalize(fileName)} = catchAsync(async (req, res) => {
    await ${fileName}Service.update${capitalize(
    fileName
  )}(req.params.id, req.body);
    res
      .status(httpStatus.OK)
      .send({ success: true, message: '${capitalize(
        fileName
      )} updated successfully' });
  });

  const delete${capitalize(fileName)} = catchAsync(async (req, res) => {
    await ${fileName}Service.delete${capitalize(fileName)}(req.params.id);
    res
      .status(httpStatus.OK)
      .send({ success: true, message: '${capitalize(
        fileName
      )} deleted successfully' });
  });

  module.exports = {
    create${capitalize(fileName)},
    get${capitalize(fileName)}s,
    get${capitalize(fileName)}ById,
    update${capitalize(fileName)},
    delete${capitalize(fileName)},
  };
  `;
};

//for services
const generateServiceContent = (args) => {
  const { fileName } = args;
  const modelName = `${fileName}Model`;
  const capitalizedFileName = capitalize(fileName);

  return `const { ${modelName} } = require('../models/'); 

  const create${capitalizedFileName} = async (data) => {
    // Logic to create ${capitalizedFileName} using Mongoose model
    const new${capitalizedFileName} = new ${modelName}(data);
    return new${capitalizedFileName}.save();
  };
  
  const get${capitalizedFileName}s = async () => {
    // Logic to get all ${capitalizedFileName}s using Mongoose model
    return ${modelName}.find();
  };
  
  const get${capitalizedFileName}ById = async (id) => {
    // Logic to get a ${capitalizedFileName} by ID using Mongoose model
    return ${modelName}.findById(id);
  };
  
  const update${capitalizedFileName} = async (id, data) => {
    // Logic to update a ${capitalizedFileName} by ID using Mongoose model
    return ${modelName}.findByIdAndUpdate(id, data, { new: true });
  };
  
  const delete${capitalizedFileName} = async (id) => {
    // Logic to delete a ${capitalizedFileName} by ID using Mongoose model
    return ${modelName}.findByIdAndDelete(id);
  };
  
  module.exports = {
    create${capitalizedFileName},
    get${capitalizedFileName}s,
    get${capitalizedFileName}ById,
    update${capitalizedFileName},
    delete${capitalizedFileName},
  };`;
};

//for routes
const generateRouteContent = (args) => {
  const { fileName } = args;
  const fileNameLower = fileName.toLowerCase();
  const fileNameLowerPlural = `${fileNameLower}s`;
  const fileNamePlural = `${fileName}s`;
  const capitalFilename = capitalize(fileName);
  return `
const express = require('express');
const router = express.Router();
const { ${fileName}Validation } = require('./../validations');
const validate = require('./../middlewares/validate');
const { ${fileName}Controller } = require('./../controllers');

// GET all ${fileNamePlural}
router.get('/${fileNameLowerPlural}', ${fileName}Controller.get${capitalize(
    fileNamePlural
  )});

// GET a specific ${fileName} by ID
router.get('/${fileNameLower}/:id', ${fileName}Controller.get${capitalFilename}ById);

// POST (Create) a new ${fileName}
router.post(
  '/${fileNameLower}',
  validate(${fileName}Validation.create${capitalFilename}Schema),
  ${fileName}Controller.create${capitalFilename}
);

// PUT (Update) an existing ${fileName} by ID
router.put(
  '/${fileNameLower}/:id',
  validate(${fileName}Validation.update${capitalFilename}Schema),
  ${fileName}Controller.update${capitalFilename}
);

// DELETE (Remove) a ${fileName} by ID
router.delete('/${fileNameLower}/:id', ${fileName}Controller.delete${capitalFilename});

module.exports = router;
  `;
};

generateExportStatement = (fileName, schematicName) => {
  return `\nmodule.exports.${fileName}${capitalize(
    schematicName
  )} = require('./${fileName}.${schematicName}');`;
};
const getType = (type) => {
  switch (type.trim().toLowerCase()) {
    case 'string':
      return 'String';
    case 'number':
      return 'Number';
    case 'boolean':
      return 'Boolean';
    case 'date':
      return 'Date';
    case 'objectid':
      return 'mongoose.Schema.Types.ObjectId';
    default:
      throw new Error(`${type} is not supported.`);
  }
};
const generateModelContent = (args) => {
  const { modelName, fields, types } = args;
  if (fields.length !== types.length) {
    throw new Error('Field length should equal to types length');
  }
  const modelNameInCapital = capitalize(modelName);
  const schemaFields = fields
    .map((fieldName, index) => {
      return `${fieldName}: {type: ${getType(types[index])}}`;
    })
    .join(',\n');

  return `const mongoose = require('mongoose');
const ${modelName}Schema = mongoose.Schema({
 ${schemaFields}
});

const ${modelNameInCapital} = mongoose.model('${modelNameInCapital}', ${modelName}Schema);

module.exports = ${modelNameInCapital};`;
};

const getJoiType = (type) => {
  switch (type.trim().toLowerCase()) {
    case 'string':
      return 'joi.string()';
    case 'number':
      return 'joi.number()';
    case 'boolean':
      return 'joi.boolean()';
    case 'date':
      return 'joi.date()';
    case 'objectid':
      return 'joi.string()';
    default:
      throw new Error(`${type} is not supported.`);
  }
};

const generateValidationContent = (args) => {
  const { validationName, fields, types } = args;

  if (fields.length !== types.length) {
    throw new Error('Field length should equal to types length');
  }

  const createSchemaFields = fields
    .map((fieldName, index) => {
      return `${fieldName}: ${getJoiType(types[index])}`;
    })
    .join(',\n');

  const updateSchemaFields = fields
    .map((fieldName, index) => {
      return `${fieldName}: ${getJoiType(types[index])}.optional()`;
    })
    .join(',\n');

  return `const joi = require('joi');

// Create schema
const create${capitalize(validationName)}Schema = {
  body: joi.object().keys({
    ${createSchemaFields}
  }),
};

// Update schema (fields are optional)
const update${capitalize(validationName)}Schema = {
  body: joi.object().keys({
    ${updateSchemaFields}
  }),
};

module.exports = {
  create${capitalize(validationName)}Schema,
  update${capitalize(validationName)}Schema,
};
`;
};

module.exports = {
  generateEnvContent,
  generateControllerContent,
  generateServiceContent,
  generateRouteContent,
  generateExportStatement,
  generateModelContent,
  generateValidationContent,
};
