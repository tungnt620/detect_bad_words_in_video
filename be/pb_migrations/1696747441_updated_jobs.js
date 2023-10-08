/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lnohnl59kq6qdlg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qftqmmud",
    "name": "file_name",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lnohnl59kq6qdlg")

  // remove
  collection.schema.removeField("qftqmmud")

  return dao.saveCollection(collection)
})
