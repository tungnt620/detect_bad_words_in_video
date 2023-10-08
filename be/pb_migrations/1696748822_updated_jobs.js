/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lnohnl59kq6qdlg")

  // update
  collection.schema.addField(new SchemaField({
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
        "successes"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lnohnl59kq6qdlg")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
