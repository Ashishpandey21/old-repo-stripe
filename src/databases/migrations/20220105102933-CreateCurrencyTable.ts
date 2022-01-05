'use strict';

import { QueryInterface, Sequelize } from 'sequelize';
import { DataType } from 'sequelize-typescript';

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('currencies',{
      id: {
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataType.STRING,
        unique: true,
        allowNull: false,
      },
      code: {
        type: DataType.STRING,
        allowNull: false,
        unique: true,
      },
      active: {
        type: DataType.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      deleted_at: {
        type: DataType.DATE,
        defaultValue: null,
      },
      created_at: {
        type: DataType.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP()'),
      },
      updated_at: {
        type: DataType.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP()'),
      },
    })
  },

  down: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
