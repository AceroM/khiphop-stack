CREATE MIGRATION m1wquarv6uuhravadhop3rwzomngaf57ivgyrykjzwppnh6qjhoy2a
    ONTO m1ex6nghqy73ymaoczzpl2rbaqcuw4oozr4sm2hvjcudojhdecl56a
{
  ALTER TYPE default::User {
      CREATE REQUIRED PROPERTY is_onboarded -> std::bool {
          SET default := false;
      };
  };
};
