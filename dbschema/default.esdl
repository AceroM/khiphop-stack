module default {
  global current_user -> str;

  abstract type HasCreatedAt {
		property created_at -> datetime {
			default := datetime_current();
			readonly := true;
		};
	}

  abstract type HasUpdatedAt {
		property updated_at -> datetime { default := datetime_current() };
	}

  type User extending HasCreatedAt {
    required property clerk_id -> str { constraint exclusive };
    required property alias -> str { constraint exclusive };
    required property is_onboarded -> bool { default := false };
  }

  type Note extending HasCreatedAt, HasUpdatedAt {
    required link author -> User;
    required property name -> str;
    property description -> str;

    access policy insert_notes allow insert;
    access policy own_notes allow select, delete, update using (
      .author ?= (select User filter .clerk_id = global current_user)
    );
  }
}
