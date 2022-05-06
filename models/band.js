// DEPENDENCIES
const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = new Sequelize(process.env.PG_URI);

// MODEL
class Band extends Model {}


Band.init(
  {
    //   we are using sequelize to create a SQL table this one is called Band on this side.
    // Here because we are using sequelize its called Band singular in the database it will be called Bands plural. Sequelize just does this for us.
    //Each key of this first object is a column in the table with several options available for us to use. this is useful syntax to have.

    band_id: {
        // type must be included as this is our datatype for the column.
      type: DataTypes.INTEGER,
    //   here we can designate the primary key if none is provided sequelize will assume the column named id is the primary key.
      primaryKey: true,
    //   we can also autoincriment the primary key with this option here pretty cool. 
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    //   allowNull being false doesnt allow null values in this column pretty straightforward.
      allowNull: false,
    },
    genre: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    available_start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
//   at the bottom here we must say sequelize in order to connect this model
// after that we must also name the model but I think this tableName is actually optional from what I understand it will default to a plural Bands
// timestamps false means we arent using timestamps.
  { sequelize, modelName: "Band", tableName: "band", timestamps: false }
);

// EXPORT
module.exports = Band;
