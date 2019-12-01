class User < ApplicationRecord
  has_many :stocks, dependent: :destroy
end
