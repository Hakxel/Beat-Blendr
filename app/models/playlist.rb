class Playlist < ApplicationRecord
  belongs_to :user
  validates :user_id, uniqueness: true
  attr_accessor :type
end
