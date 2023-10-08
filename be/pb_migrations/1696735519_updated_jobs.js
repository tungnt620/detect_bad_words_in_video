/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lnohnl59kq6qdlg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bgiv8ejq",
    "name": "mp3_url",
    "type": "url",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lnohnl59kq6qdlg")

  // remove
  collection.schema.removeField("bgiv8ejq")

  return dao.saveCollection(collection)
})
