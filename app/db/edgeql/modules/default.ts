import { $ } from "edgedb";
import * as _ from "../imports";
import type * as _std from "./std";
export type $HasCreatedAtλShape = $.typeutil.flatten<_std.$Object_c88c66ee150611ed900d256aa1456aceλShape & {
  "created_at": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, true, true>;
}>;
type $HasCreatedAt = $.ObjectType<"default::HasCreatedAt", $HasCreatedAtλShape, null>;
const $HasCreatedAt = $.makeType<$HasCreatedAt>(_.spec, "c0527a38-2dff-11ed-90f4-c1fb238fb8af", _.syntax.literal);

const HasCreatedAt: $.$expr_PathNode<$.TypeSet<$HasCreatedAt, $.Cardinality.Many>, null, true> = _.syntax.$PathNode($.$toSet($HasCreatedAt, $.Cardinality.Many), null, true);

export type $HasUpdatedAtλShape = $.typeutil.flatten<_std.$Object_c88c66ee150611ed900d256aa1456aceλShape & {
  "updated_at": $.PropertyDesc<_std.$datetime, $.Cardinality.AtMostOne, false, false, false, true>;
}>;
type $HasUpdatedAt = $.ObjectType<"default::HasUpdatedAt", $HasUpdatedAtλShape, null>;
const $HasUpdatedAt = $.makeType<$HasUpdatedAt>(_.spec, "c05441d8-2dff-11ed-971c-dd1d4ce5a89d", _.syntax.literal);

const HasUpdatedAt: $.$expr_PathNode<$.TypeSet<$HasUpdatedAt, $.Cardinality.Many>, null, true> = _.syntax.$PathNode($.$toSet($HasUpdatedAt, $.Cardinality.Many), null, true);

export type $NoteλShape = $.typeutil.flatten<$HasCreatedAtλShape & $HasUpdatedAtλShape & {
  "author": $.LinkDesc<$User, $.Cardinality.One, {}, false, false,  false, false>;
  "description": $.PropertyDesc<_std.$str, $.Cardinality.AtMostOne, false, false, false, false>;
  "name": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
}>;
type $Note = $.ObjectType<"default::Note", $NoteλShape, null>;
const $Note = $.makeType<$Note>(_.spec, "c058de3c-2dff-11ed-8b77-23bc0c4f3274", _.syntax.literal);

const Note: $.$expr_PathNode<$.TypeSet<$Note, $.Cardinality.Many>, null, true> = _.syntax.$PathNode($.$toSet($Note, $.Cardinality.Many), null, true);

export type $UserλShape = $.typeutil.flatten<$HasCreatedAtλShape & {
  "clerk_id": $.PropertyDesc<_std.$str, $.Cardinality.One, true, false, false, false>;
  "alias": $.PropertyDesc<_std.$str, $.Cardinality.One, true, false, false, false>;
  "is_onboarded": $.PropertyDesc<_std.$bool, $.Cardinality.One, false, false, false, true>;
  "<author[is Note]": $.LinkDesc<$Note, $.Cardinality.Many, {}, false, false,  false, false>;
  "<author": $.LinkDesc<$.ObjectType, $.Cardinality.Many, {}, false, false,  false, false>;
}>;
type $User = $.ObjectType<"default::User", $UserλShape, null>;
const $User = $.makeType<$User>(_.spec, "c055cde6-2dff-11ed-b109-33d87f99eb65", _.syntax.literal);

const User: $.$expr_PathNode<$.TypeSet<$User, $.Cardinality.Many>, null, true> = _.syntax.$PathNode($.$toSet($User, $.Cardinality.Many), null, true);

const $default__globals: {  current_user: _.syntax.$expr_Global<
              "default::current_user",
              _std.$str,
              $.Cardinality.AtMostOne
              >} = {  current_user: _.syntax.makeGlobal(
              "default::current_user",
              $.makeType(_.spec, "00000000-0000-0000-0000-000000000101", _.syntax.literal),
              $.Cardinality.AtMostOne) as any};



export { $HasCreatedAt, HasCreatedAt, $HasUpdatedAt, HasUpdatedAt, $Note, Note, $User, User };

type __defaultExports = {
  "HasCreatedAt": typeof HasCreatedAt;
  "HasUpdatedAt": typeof HasUpdatedAt;
  "Note": typeof Note;
  "User": typeof User;
  "global": typeof $default__globals
};
const __defaultExports: __defaultExports = {
  "HasCreatedAt": HasCreatedAt,
  "HasUpdatedAt": HasUpdatedAt,
  "Note": Note,
  "User": User,
  "global": $default__globals
};
export default __defaultExports;
