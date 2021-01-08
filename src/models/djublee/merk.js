const merk = (sequelize, DataTypes) => {
    const Merk = sequelize.define(
      'merk',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
        },
        createdAt: {
          type: DataTypes.DATE,
        },
        updatedAt: {
          type: DataTypes.DATE,
        },
      },
      {
        timestamps: true,
        freezeTableName: true,
      }
    );
  
    Merk.sync();
    return Merk;
  };
  
  export default merk;