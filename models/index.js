const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

const User = db.define('user', {
  name: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false, validate: { isEmail: true } }
});
const Page = db.define('page',
{
    title: { type: Sequelize.STRING, allowNull: false },
    urlTitle: { type: Sequelize.STRING},

    content: { type: Sequelize.TEXT, allowNull: false },
    status: {
      type: Sequelize.ENUM('open', 'closed'),
      defaultValue: 'closed'
    },
    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    tags: { type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []}
  },
  {
    hooks: {
      beforeValidate: function generateURLTitle (page, options){
        if (page.title) {
        // Removes all non-alphanumeric characters from title
       // And make whitespace underscore
          page.urlTitle =  page.title.replace(/\s+/g, '_').replace(/\W/g, '');
        }
        else {
        // Generates random 5 letter string
          page.urlTitle = Math.random().toString(36).substring(2, 7);
        }
      }
    },
    getterMethods: {
      url: function(){
        //console.log(this.urlTitle);
        return "/wiki/" + this.urlTitle;
      }
    }
});
Page.belongsTo(User, { as: 'author' });

module.exports = {
  db: db,
  Page: Page,
  User: User
};
