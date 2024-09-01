import { DataTypes } from "sequelize";
import { conexion } from "../conexion.js";
import Estado from "./Estados.js";

const Categoria = conexion.define(
  "Categoria",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    categoriaName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
      validate: {
        notEmpty: {
          msg: "El nombre de la categoria no puede estar vacio",
        },
      },
    },
  },
  {
    tableName: "Categorias",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['categoriaName'],
      },
    ],
  }
);

const datosCategoria = [
  { categoriaName: "CONSUMO CONTROLADO",EstadoId: 1},
  { categoriaName: "CONSUMO DEVOLUTIVO",EstadoId: 1 },
  { categoriaName: "CONSUMO FICHA",EstadoId: 1 },
];

const guardarCAtegorias = async () => {
  try {
    await Categoria.sync();
    const categorias = await Categoria.findAll();
    if (categorias.length === 0) {
      await Categoria.bulkCreate(datosCategoria);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
setTimeout(() => {
  guardarCAtegorias();
}, 2500);


Categoria.belongsTo(Estado, { foreignKey: "EstadoId" });

export default Categoria;


// consumo controlado
//consumo devolutivo
//consumo ficha