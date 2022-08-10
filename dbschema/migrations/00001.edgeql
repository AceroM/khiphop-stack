CREATE MIGRATION m1ex6nghqy73ymaoczzpl2rbaqcuw4oozr4sm2hvjcudojhdecl56a
    ONTO initial
{
  CREATE GLOBAL default::current_user -> std::str;
  CREATE TYPE default::User {
      CREATE REQUIRED PROPERTY clerk_id -> std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY alias -> std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  CREATE TYPE default::Note {
      CREATE REQUIRED LINK author -> default::User;
      CREATE ACCESS POLICY own_notes
          ALLOW SELECT, UPDATE, DELETE USING ((.author ?= (SELECT
              default::User
          FILTER
              (.clerk_id = GLOBAL default::current_user)
          )));
      CREATE ACCESS POLICY insert_notes
          ALLOW INSERT ;
      CREATE PROPERTY description -> std::str;
      CREATE REQUIRED PROPERTY name -> std::str;
  };
};
