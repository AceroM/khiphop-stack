CREATE MIGRATION m1lddevt3ylqkn2nfjeymxlmfywkebkxj6wdhrymrve36dfftjvcha
    ONTO initial
{
  CREATE GLOBAL default::current_user -> std::str;
  CREATE ABSTRACT TYPE default::HasCreatedAt {
      CREATE PROPERTY created_at -> std::datetime {
          SET default := (std::datetime_current());
          SET readonly := true;
      };
  };
  CREATE ABSTRACT TYPE default::HasUpdatedAt {
      CREATE PROPERTY updated_at -> std::datetime {
          SET default := (std::datetime_current());
      };
  };
  CREATE TYPE default::User EXTENDING default::HasCreatedAt {
      CREATE REQUIRED PROPERTY clerk_id -> std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY alias -> std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY is_onboarded -> std::bool {
          SET default := false;
      };
  };
  CREATE TYPE default::Note EXTENDING default::HasCreatedAt, default::HasUpdatedAt {
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
