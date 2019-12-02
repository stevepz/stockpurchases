class User < ApplicationRecord
  has_many :stocks, dependent: :destroy
  
  
  puts "here"
  has_secure_password
 

  validates :username, presence: true, uniqueness: true, length: { minimum: 5 }
  validates :password, length: { minimum: 6 }
  
end
