require Rails.root.join('lib', 'etherhive', 'migration_helpers')

class AddModeratorToAccounts < ActiveRecord::Migration[5.1]
  include EtherHive::MigrationHelpers

  disable_ddl_transaction!

  def up
    safety_assured { add_column_with_default :users, :moderator, :bool, default: false }
  end

  def down
    remove_column :users, :moderator
  end
end
