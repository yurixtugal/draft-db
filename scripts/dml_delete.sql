delete from "Field" f 
where  f."idCollection" in (select c."idCollection"  from "Collection" c
where c."idDraft" = '03f21000-2f7b-4bbc-9c94-308798d93256'
);


delete from "RelationCollection" rc
where rc."idCollectionFrom" in (select c."idCollection"  from "Collection" c
where c."idDraft" = '03f21000-2f7b-4bbc-9c94-308798d93256') or 
rc."idCollectionTo" in (select c."idCollection"  from "Collection" c
where c."idDraft" = '03f21000-2f7b-4bbc-9c94-308798d93256');

delete from "Collection" c 
where c."idDraft" = '03f21000-2f7b-4bbc-9c94-308798d93256';

delete from "Draft" d where d."idDraft" = '03f21000-2f7b-4babc-9c94-308798d93256';