# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(username: 'steve', password: '123456')
Stock.create(stockname: 'International Business Machines', stockticker: 'IBM', 
comment: 'this is a comment', user_id: '1')
Purchase.create(purchasedate: '2019-11-01', qty: 102.0, pricepaid: 123.23, 
comment: 'purchase comment', stock_id: 1)
