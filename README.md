# Online Store with admin panel using Express.js and mongoDB

You can access the admin panel in route: /admin  
super admin user is:  
email : admin@gunners.com  
pass: 123456  

only logged in admins or super admin can access the admin panel.  
only super admins can access and edit in the users page in admin panel.  

logging in route: /views/login.html  or by clicking the user button in the home nav  
# features
- User can add to or remove from cart
- User can search products by name
- User can view product page by clicking on product card either in store or in search-box
- User can login using Gmail or can register normally
- Cart items are saved in local storage
- User is authenticated before checking out
- Payment is processed through stripe api
- Store products can be filtered by price or category and can be sorted by price or name
- admin can add,remove, or edit products in the admin dashboard
- admin can search products from the admin dashboard
- admin can keep track of sales through chart
