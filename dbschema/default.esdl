module default {
  global current_user -> str;

  type User {
    required property clerk_id -> str { constraint exclusive };
    required property alias -> str { constraint exclusive };
  }

  type Note {
    required link author -> User;
    required property name -> str;
    property description -> str;

    access policy insert_notes allow insert;
    access policy own_notes allow select, delete, update using (
      .author ?= (select User filter .clerk_id = global current_user)
    );
  }
}
