const tahun = (sequelize, DataTypes) => {
    const Tahun = sequelize.define(
      'tahun',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        tahun: {
          type: DataTypes.INTEGER,
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
  
    Tahun.sync();
    return Tahun;
  };
  
  export default tahun;