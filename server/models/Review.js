'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {

    static async getRatingAVG() {
      const reviewsAvgByChallenge = await this.findAll({
        group: ['challengeId'],
        attributes: ['challengeId', [sequelize.fn('AVG', sequelize.col('rating')), 'ratingAVG']]
      })

      return reviewsAvgByChallenge
    }

    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      this.belongsTo(models.Challenge, {
        foreignKey: 'challengeId'
      })
    }
  };
  Review.init({
    userId: DataTypes.INTEGER,
    challengeId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    rating: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Review',
    tableName: "Reviews",
    paranoid: true,
  });
  return Review;
};