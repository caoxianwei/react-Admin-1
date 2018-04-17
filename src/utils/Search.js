export default function (key, search, value, isJoin, joinEntity, matchSource, matchTarget, isAnd) {
    let consJson = {
        "key": key,
        "op": search,
        "val": value,
        "notFlag": false,
    };
    if (isJoin) {
        consJson['isJoin'] = isJoin;
        consJson['joinEntity'] = joinEntity;
        consJson['matchSource'] = matchSource;
        consJson['matchTarget'] = matchTarget;
    }
    if (!isAnd) {
        consJson['isAnd'] = isAnd;
    }
    return consJson;
}
/*
* key 对应的key  "key":"name",
* isJoin 能否createPerson.name -->"isJoin":true,
* joinEntity  哪个表 --> "joinEntity":"gx_user_info",
* matchSource 对应原实体的字段  "matchSource":"createPersonId",
* matchTarget 对应原实体的字段  "matchTarget":"id",
* */