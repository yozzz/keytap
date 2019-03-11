class CreateSources < ActiveRecord::Migration[5.2]
  def change
    create_table :sources do |t|
      t.text :plain_text
      t.timestamps
    end
  end
end
