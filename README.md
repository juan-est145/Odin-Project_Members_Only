# Odin Members Only App

A repository containing a website with user authentication and defined roles. In this website, everyone with an account can post messages, but only those with member status can see who posted what and when. Also there is an admin role that allows to delete messages.

## Dependencies

In order to be able to run this project locally, you will need to have installed Nodejs and set up a postgres database.
Also you will need to provide your .env values for the following keys:\
PORT= *The port you want to listen to*\
HOST= *The host of the machine in which the database is hosted*\
USER= *The user of the database*\
DATABASE= *The name of the database*\
PASSWORD= *The password for the database*\
DBPORT= *The port in which the database will listen to connections*\
SECRET= *The secret for the sessions*\
MEMBER_PASS=*The secret password for upgrading an account to member status*\
ADMIN_PASS=*The secret password for upgrading an account to admin status*\

Once all this requirements are satisfied, simply run at the root of the project

```bash
npm install && npm run dev
```