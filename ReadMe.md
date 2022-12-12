### set up

This database uses mysql.

1. Download mysql server from https://dev.mysql.com/downloads/mysql/

2. Download mysql installer from https://dev.mysql.com/downloads/installer/

3. Open mysql install and choose custom. 

4. Click MySQL servers, choose MySQL server 8.0.31 then click green arrow button to add it into Products To Be Installed.

5. Then click Advanced Options to set Install Directory and Data Directory.

6. Click Execute, Next, Next, Next.

7. Then enter a MySQL Root Password.

8. Then click next, next, execute. When all configuration steps get green marks, then finishi.

###How to run: 

1. Create a bookstore database in the local mysql, and then execute bookstore.sql to create a table in this database.

2. Modify the password field in the server/db.js file to the local database password (MySQL Root Password).

3. Execute the command -npm install in the root directory to install all dependencies of the project(Windows: cmd)

4. Execute -npm run start:server in the root directory to start the server(Windows: cmd)

5. Execute -npm run start:client in the root directory to start the client(Windows: cmd)

6. Enter http://localhost:3000 in the browser to open the page

Default user account: test@gmail.com 
Password: 123456

Default Owner account: admin@gmail.com 
Password: 123456
