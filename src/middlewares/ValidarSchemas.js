const validarSchemas = (Schema) => (req, res, next) => {
  try {
    Schema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      errorValidacion: error,
    });
  }
};

export default validarSchemas;
