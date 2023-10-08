/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "lnohnl59kq6qdlg",
    "created": "2023-10-08 02:54:17.118Z",
    "updated": "2023-10-08 02:54:17.118Z",
    "name": "jobs",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "7ua00wwo",
        "name": "video",
        "type": "file",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [],
          "thumbs": [],
          "protected": false
        }
      },
      {
        "system": false,
        "id": "3ln5jonu",
        "name": "status",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "pending",
            "doing",
            "failed",
            "successed"
          ]
        }
      },
      {
        "system": false,
        "id": "rmryrfjm",
        "name": "result",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("lnohnl59kq6qdlg");

  return dao.deleteCollection(collection);
})
