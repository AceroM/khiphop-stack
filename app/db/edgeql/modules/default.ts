import { $ } from "edgedb";
import * as _ from "../imports";
import type * as _std from "./std";
export type $NoteλShape = $.typeutil.flatten<_std.$Object_c88c66ee150611ed900d256aa1456aceλShape & {
  "author": $.LinkDesc<$User, $.Cardinality.One, {}, false, false,  false, false>;
  "description": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "name": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
}>;
type $Note = $.ObjectType<"default::Note", $NoteλShape, null>;
const $Note = $.makeType<$Note>(_.spec, "8acd2544-1535-11ed-a9be-67342cab840a", _.syntax.literal);

const Note: $.$expr_PathNode<$.TypeSet<$Note, $.Cardinality.Many>, null, true> = _.syntax.$PathNode($.$toSet($Note, $.Cardinality.Many), null, true);

export type $UserλShape = $.typeutil.flatten<_std.$Object_c88c66ee150611ed900d256aa1456aceλShape & {
  "clerk_id": $.PropertyDesc<_std.$str, $.Cardinality.One, true, false, false, false>;
  "alias": $.PropertyDesc<_std.$str, $.Cardinality.One, true, false, false, false>;
  "is_onboarded": $.PropertyDesc<_std.$bool, $.Cardinality.One, false, false, false, true>;
  "<author[is Note]": $.LinkDesc<$Note, $.Cardinality.Many, {}, false, false,  false, false>;
  "<author": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $User = $.ObjectType<"default::User", $UserλShape, null>;
const $User = $.makeType<$User>(_.spec, "8ac927aa-1535-11ed-ba10-75e096ce76aa", _.syntax.literal);

const User: $.$expr_PathNode<$.TypeSet<$User, $.Cardinality.Many>, null, true> = _.syntax.$PathNode($.$toSet($User, $.Cardinality.Many), null, true);

const $default__globals: {  current_user: _.syntax.$expr_Global<
              "default::current_user",
              _std.$str,
              $.Cardinality.AtMostOne
              >} = {  current_user: _.syntax.makeGlobal(
              "default::current_user",
              $.makeType(_.spec, "00000000-0000-0000-0000-000000000101", _.syntax.literal),
              $.Cardinality.AtMostOne) as any};



export { $Note, Note, $User, User };

type __defaultExports = {
  "Note": typeof Note;
  "User": typeof User;
  "global": typeof $default__globals
};
const __defaultExports: __defaultExports = {
  "Note": Note,
  "User": User,
  "global": $default__globals
};
export default __defaultExports;
