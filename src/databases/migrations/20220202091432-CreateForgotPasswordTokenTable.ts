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
    await queryInterface.createTable('forgot_password_tokens', {
      id: {
        type: DataType.UUID,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: DataType.BIGINT.UNSIGNED,
        allowNull: false,
      },
      expires_at: {
        type: DataType.DATE,
        allowNull: false,
      },
      created_at: {
        type: DataType.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: DataType.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addConstraint('forgot_password_tokens', {
      type: 'foreign key',
      references: {
        table: 'users',
        field: 'id',
      },
      fields: ['user_id'],
      onDelete: 'CASCADE',
      onUpdate: 'NO ACTION',
    });
  },

  down: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('forgot_password_tokens');
  },
};
